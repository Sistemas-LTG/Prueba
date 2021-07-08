import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "react-native-elements";
import { map } from "lodash";
import Loading from "../Loading";

export default function ResultadosLista(props) {
  const { busqueda, toastRef,render ,idUsuario} = props;
  const navigation = useNavigation();

  const [usuarioLogeado, setUsuarioLogeado] = useState(idUsuario)
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  function onPress(detalleSolicitud) {
    console.log(detalleSolicitud);
    navigation.navigate("detalleSolicitud", {
      paciente: detalleSolicitud,
      toastRef: toastRef,
    });
  }

  useEffect(() => {
    
    setLoading(true);
    //console.log(`hhttps://ltgprocure.com/APIAppDoctores/APIDoctoresDetalleSolicitud.php?Idsesion=${usuarioLogeado}&Nombre=${busqueda.nombre}&ApPaterno=${busqueda.paterno}&ApMaterno=${busqueda.materno}&IdSolicitudMedica=${busqueda.IdSolicitudMedica}`);
    fetch(
      `https://ltgprocure.com/APIAppDoctores/APIDoctoresDetalleSolicitud.php?Idsesion=${usuarioLogeado}&Nombre=${busqueda.nombre}&ApPaterno=${busqueda.paterno}&ApMaterno=${busqueda.materno}&IdSolicitudMedica=${busqueda.IdSolicitudMedica}`
    )
      .then((response) => response.json())
      .then((json) => setData(json.ListaPacientes))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      //console.log(data);
  }, [render]);

  return (
    <View>
      {map(data, (datas, index) => (
        <ListItem key={index} bottomDivider onPress={() => onPress(datas)}>
          <ListItem.Content>
            <ListItem.Title>
              No.Solicitud {datas.IdSolicitudMedica} - {datas.NombrePaciente}
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
      <Loading isVisible={loading} text="Buscando" />

    </View>
  );
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
});
