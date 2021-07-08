import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, AsyncStorage } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { size, isEmpty } from "lodash";

import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
import { Picker } from "@react-native-picker/picker";
import ResultadosPuntos from "../MovimientosPuntos/ResultadosPuntos";

export default function NuevaSolicitudForm(props) {
  const { toastRef } = props;
  const [formData, setFormData] = useState(defaulFormValue());
  const [loading, setLoading] = useState(true);
  const [loadingB, setLoadingB] = useState(false);
  const navigation = useNavigation();
  const [renderComponent, setRenderComponent] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [recargar, setRecargar] = useState("");
  const [idUsuario, setIdUsuario] = useState("")
  const [loadingMailText, setLoadingMailText] = useState(false)
  useEffect(() => {
    async function fetchMyAPI() {
      const usTemp = await AsyncStorage.getItem('IdUsuario');
     // console.log(usTemp);
      setIdUsuario(usTemp);
      setRenderComponent(true);

    }

    fetchMyAPI()
  }, [])


  const setMES = (itemValue) => {
    setFormData({ ...formData, MES: itemValue });
    setRecargar(formData);

  };

  function onSubmit() {
    setLoadingB(true);
    fetch(
      `https://ltgprocure.com/APIAppDoctores/APIDoctoresEnviarMailBalancePuntos.php?IdUsuario=${idUsuario}&MES=${formData.MES}`
    )
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.error(error))
      .finally(() => setLoadingB(false) | setLoadingMailText(true));

  }


  return (
    <View style={styles.formContainer}>
      <Picker
        title="Elige un Mes"
        selectedValue={selectedValue}
        style={styles.pickerList}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          setMES(itemValue);
        }}
      >
        <Picker.Item label="[Elige un Mes]" value="" />
        <Picker.Item label="ENERO" value="1" />
        <Picker.Item label="FEBRERO" value="2" />
        <Picker.Item label="MARZO" value="3" />
        <Picker.Item label="ABRIL" value="4" />
        <Picker.Item label="MAYO" value="5" />
        <Picker.Item label="JUNIO" value="6" />
        <Picker.Item label="JULIO" value="7" />
        <Picker.Item label="AGOSTO" value="8" />
        <Picker.Item label="SEPTIEMBRE" value="9" />
        <Picker.Item label="OCTUBRE" value="10" />
        <Picker.Item label="NOVIEMBRE" value="11" />
        <Picker.Item label="DICIEMBRE" value="12" />
      </Picker>

      <View style={styles.listData}>
        {renderComponent ? (
          <ResultadosPuntos busqueda={formData} render={recargar} idUsuario={idUsuario} toastRef={toastRef} />

        ) : (
          <Text>...</Text>
        )}

        <Button
          title="Enviar Estado de Cuenta"
          containerStyle={styles.btnContainerSearch}
          buttonStyle={styles.btnSearch}
          onPress={onSubmit}
          loading={loadingB}
        />
        {loadingMailText ? <Text style={styles.textEnviado}>El estado de cuenta fue enviado por correo, revise su banjeda.</Text> : <Text></Text>}

      </View>
    </View>
  );
}

function defaulFormValue() {
  return {
    nombre: "",
    MES: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerSearch: {
    marginTop: 20,
    width: "100%",
    //alignItems:"right"
  },
  btnSearch: {
    backgroundColor: "#663366",
  },
  iconRight: {
    color: "#C1C1C1",
  },
  listData: {
    width: "100%",
    // marginTop:20,
  },
  pickerList: {
    marginTop: 20,
    width: "100%",
    //alignItems: "center",
  }, textEnviado: {
    color: "#663366",
    fontWeight: "bold",
    textAlign: "justify",
    marginTop: 20
  }
});
