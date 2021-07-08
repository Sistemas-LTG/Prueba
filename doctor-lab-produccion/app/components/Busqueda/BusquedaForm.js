import React, { useState,useEffect } from "react";
import { StyleSheet, View, Text,AsyncStorage } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import ResultadoSolicitudes from "../Busqueda/ResultadoSolicitudes";

export default function BusquedaForm(props) {
  const { toastRef } = props;
  const [formData, setFormData] = useState(defaulFormValue());
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [renderComponent, setRenderComponent] = useState(null);
  const [recargar, setRecargar] = useState("");
  const [idUsuario, setIdUsuario] = useState("");

  const onSubmit = async () => {

      
      const usTemp = await AsyncStorage.getItem('IdUsuario'); 
      setIdUsuario(usTemp);
      
     
      //console.log(usTemp);
    /*if(usTemp===null){  
        toastRef.current.show("Necesita iniciar sesión para usar estas funciones");
        
      }else*/ 
      if (
      isEmpty(formData.paterno) &&
      isEmpty(formData.materno) &&
      isEmpty(formData.nombre) &&
      isEmpty(formData.IdSolicitudMedica)
    ) {
      toastRef.current.show("Indique al menos un parametro de busqueda");
    } else {
      setRecargar(formData);
      setLoading(true);
      setRenderComponent(true);
      setLoading(false);
    }
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Apellido Paterno"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "paterno")}
        rightIcon={
          <Icon
            type="material-community"
            name="account-search"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Apellido Materno"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "materno")}
        rightIcon={
          <Icon
            type="material-community"
            name="account-search"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Nombre(s)"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "nombre")}
        rightIcon={
          <Icon
            type="material-community"
            name="account-search"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Solicitud"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "IdSolicitudMedica")}
        rightIcon={
          <Icon
            type="material-community"
            name="folder-pound-outline"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Button
        title="Buscar"
        containerStyle={styles.btnContainerSearch}
        buttonStyle={styles.btnSearch}
        onPress={onSubmit}
      />
      <Text style={styles.separator}></Text>

      <View style={styles.listData}>
        {renderComponent ? (
          <ResultadoSolicitudes
            busqueda={formData}
            render={recargar}
            toastRef={toastRef}
            idUsuario={idUsuario}
          />
        ) : (
          <Text style={styles.separator}></Text>
        )}
      </View>
    </View>
  );
}

function defaulFormValue() {
  return {
    paterno: "",
    materno: "",
    nombre: "",
    IdSolicitudMedica: "",
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
  },
  btnSearch: {
    backgroundColor: "#663366",
  },
  iconRight: {
    color: "#C1C1C1",
  },
  listData: {
    width: "100%",
  },
  separator: {
    marginVertical: 5,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
