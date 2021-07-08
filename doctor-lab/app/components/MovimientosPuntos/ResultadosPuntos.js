import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "react-native-elements";
import { map } from "lodash";
import Puntos from "../../screens/Puntos/Puntos";
import Loading from "../Loading";

export default function ResultadosPuntos(props) {
  const { busqueda, toastRef, idUsuario } = props;
  const navigation = useNavigation();
  //console.log(props);

  const [loading, setLoading] = useState(false);
  const [dataCompleta, setDataCompleta] = useState({});
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState("");

  function onPress(detallePuntosData) {
    //console.log(detallePuntos);
    navigation.navigate("detallePuntos", {
      puntosProps: detallePuntosData,
      toastRef: toastRef
    });
  }

  useEffect(() => {
    setLoading(true);
    console.log(
      `http://procureltg.com/Pruebas/APIAppDoctores/APIDoctoresBalancePuntos.php?IdUsuario=${idUsuario}&MES=${busqueda.MES}`
    )
    fetch(
      `http://procureltg.com/Pruebas/APIAppDoctores/APIDoctoresBalancePuntos.php?IdUsuario=${idUsuario}&MES=${busqueda.MES}`
    )
      .then((response) => response.json())
      .then((json) => setData(json.Movimientos) || setBalance(json.BalanceFinal))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));


  }, [busqueda]);


  return (
    <View>
      {map(data, (lista, index) => (
        <ListItem key={index} bottomDivider onPress={() => onPress(lista)}>
          <ListItem.Content>
            <ListItem.Title>
              {lista.FechaFolio} - Puntos: {lista.Puntos}{" "}
            </ListItem.Title>
          </ListItem.Content>

          <ListItem.Chevron />
        </ListItem>
      ))}
      <Text style={styles.separator}></Text>
      <Text></Text>
      <Text style={styles.textTitle}>BALANCE FINAL DEL MES</Text>
      <Text style={styles.textTitle}>{balance}</Text>

      <Text style={styles.separator}></Text>
      <Loading isVisible={loading} text="Obteniendo Datos..." />
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
  textTitle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    marginVertical: 5,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
