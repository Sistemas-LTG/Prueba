import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";

export default function DatosPuntosForm(props) {
  const { toastRef, puntosProps } = props;
  const [nombrePaciente, setNombrePaciente] = useState();
  const [concepto, setconcepto] = useState();
  const [fechafolio, setfechafolio] = useState();
  const [folio, setFolio] = useState();
  const [puntos, setPuntos] = useState();

  const [loading, setLoading] = useState(false);
  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    console.log(puntosProps);
    setNombrePaciente(puntosProps.Paciente);
    setconcepto(puntosProps.Concepto);
    setfechafolio(puntosProps.FechaFolio);
    setFolio(puntosProps.IdFolio);
    setPuntos(puntosProps.Puntos);
  }, [puntosProps]);

  function convertMX(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.separator}></Text>
      <ListItem.Content>
        <Text>
          Paciente:
          {nombrePaciente}
        </Text>
        <Text>Concepto: {concepto}</Text>
        <Text>Fecha: {convertMX(fechafolio)}</Text>
        <Text>Folio: {folio}</Text>
        <Text>Puntos: {puntos}</Text>
      </ListItem.Content>
      <Text></Text>
      <Text style={styles.separator}></Text>
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
  separator: {
    marginVertical: 5,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
