import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button, Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
import { validateEmail } from "../../utils/validations";

export default function DatosSolicitudForm(props) {
  const { toastRef, paciente } = props;
  const [formData, setFormData] = useState(defaulFormValue(paciente));
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const navigation = useNavigation();
  const [NombrePaciente, setNombrePaciente] = useState();
  const [IdFolio, setIdFolio] = useState();
  const [FechaFolio, setFechaFolio] = useState();
  const [FechaCita, setFechaCita] = useState();
  const [ConsentimientoResultados, setConsentimientoResultados] = useState();
  const [RutaArchivo, setRutaArchivo] = useState();
  const [CentroTrabajo, setCentroTrabajo] = useState();
  const [dataCompleta, setDataCompleta] = useState([]);
  const [ruta, setRuta] = useState("");
  const [Estatus, setEstatus] = useState();
  const [textLoading, setTextLoading] = useState("");
  //console.log(paciente);
  useEffect(() => {
    setNombrePaciente(paciente.NombrePaciente);
    setCentroTrabajo(paciente.CentroTrabajo);
    setIdFolio(paciente.IdFolio);
    setFechaFolio(paciente.FechaFolio);
    setFechaCita(paciente.FechaPropuesta);
    setConsentimientoResultados(paciente.ConsentimientoResultados);
    setRutaArchivo(paciente.RutaArchivo);
    setEstatus(paciente.Estatus);
  }, [paciente]);

  //-----------------------------------------------------------------------------------------------------------------
  //BTN ENVIA RESULTADOS
  const enviarResultados = async () => {
    if (size(formData.telefono != 10)) {
      toastRef.current.show("El Whats App debe estar a 10 números");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("El email no tiene formato correcto");
    } else {
      setTextLoading("Enviando resultados...");
      setLoading(true);

      await fetch(
        `http://procureltg.com/Pruebas/LabTellezGiron/APIDoctoresImpresionResultados.php?IdFolio=${formData.IdFolio}&EmailNuevoUsuario=${formData.email}&Telefono=${formData.telefono}`
      )
        .then((response) => response.json())
        .then((json) => setDataCompleta(json.Registros))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      //console.log(dataCompleta);
      setLoading2(true);
    }
  };

  //-----------------------------------------------------------------------------------------------------------------
  //BTN PDF CITA
  const consultaPDFCita = () => {
    //console.log(paciente);
    navigation.navigate("detallePDF", {
      paciente: paciente.NombrePaciente,
      IdFolio: paciente.IdFolio,
      RutaArchivo: paciente.RutaArchivo,
    });
  };

  //-----------------------------------------------------------------------------------------------------------------
  //BTN PDF RESULTADOS
  const consultaPDFResultados = async () => {
    setTextLoading("Consultando pdf...");
    setLoading(true);

    const response = await fetch(
      `http://procureltg.com/Pruebas/LabTellezGiron/APIDoctoresConsultaDeResultados.php?IdFolio=${formData.IdFolio}`
    );

    const json = await response.json();
    await setRuta(json.Registros[0].Ruta);
    console.log(json);
    setLoading(false);
    navigation.navigate("detallePDF", {
      paciente: paciente.NombrePaciente,
      IdFolio: paciente.IdFolio,
      RutaArchivo: json.Registros[0].Ruta,
    });
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  function convertMX(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }

  return (
    <View style={styles.formContainer}>
      <Text>LABORATORIO {CentroTrabajo}</Text>
      <Text>
        {FechaFolio == null
          ? "FECHA CITA: " + convertMX(FechaCita)
          : "FECHA LABORATORIO: " + convertMX(FechaFolio)}
      </Text>
      <Text>{NombrePaciente}</Text>
      <Input
        placeholder="WhatsApp"
        containerStyle={styles.inputForm}
        keyboardType="numeric"
        onChange={(e) => onChange(e, "telefono")}
        defaultValue={paciente.Telefono || ""}
        rightIcon={
          <Icon
            type="material-community"
            name="whatsapp"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="E-mail"
        containerStyle={styles.inputForm}
        keyboardType="email-address"
        onChange={(e) => onChange(e, "email")}
        defaultValue={paciente.Email || ""}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />

      {IdFolio == null || IdFolio == 0 ? (
        <View>
          <Text style={styles.textTitle}>
            <Image
              style={styles.tinySemaforo}
              source={require("../../../assets/img/circulo_gris.png")}
            />{" "}
            EL PACIENTE AUN NO ACUDE A LA CITA
          </Text>
          <Image
            style={styles.imgStatus}
            source={require("../../../assets/img/waiting.png")}
          />
        </View>
      ) : Estatus == 1 ? (
        <View>
          <Text style={styles.textTitle}>
            <Image
              style={styles.tinySemaforo}
              source={require("../../../assets/img/circulo_verde.png")}
            />{" "}
            RESULTADOS LISTOS
          </Text>
          <Image
            style={styles.imgStatus}
            source={require("../../../assets/img/ready.png")}
          />
        </View>
      ) : (IdFolio != null || IdFolio != 0) && Estatus < 1 ? (
        <View>
          <Text style={styles.textTitle}>
            <Image
              style={styles.tinySemaforo}
              source={require("../../../assets/img/circulo_amarillo.png")}
            />{" "}
            ANALISIS EN PROCESO
          </Text>
          <Image
            style={styles.imgStatus}
            source={require("../../../assets/img/laboratory.png")}
          />
        </View>
      ) : (
        <Text>---</Text>
      )}

      {Estatus == 1 ? (
        <Button
          title="ENVIAR RESULTADOS"
          containerStyle={styles.btnContainerFechaNacimiento}
          buttonStyle={styles.btnFechaNacimiento}
          onPress={enviarResultados}
        >

        </Button>
      ) : (
        <Button
          title="RESULTADOS PENDIENTES"
          containerStyle={styles.btnContainerFechaNacimiento}
          buttonStyle={styles.btnFechaNacimiento}
        ></Button>
      )}

      {ConsentimientoResultados == 0 ||
        IdFolio == 0 ||
        IdFolio == null || Estatus == 0 ? (
        <Button
          title="VER PDF CITA"
          containerStyle={styles.btnContainerconsultaPDF}
          buttonStyle={styles.btnconsultaPDF}
          onPress={consultaPDFCita}
          icon={
            <Icon
              type="material-community"
              name="content-save-move-outline"
              iconStyle={styles.iconRight}
            />
          }
        ></Button>
      ) : (
        <Button
          title="VER PDF RESULTADOS"
          containerStyle={styles.btnContainerconsultaPDF}
          buttonStyle={styles.btnconsultaPDF}
          onPress={consultaPDFResultados}
          icon={
            <Icon
              type="material-community"
              name="content-save-move-outline"
              iconStyle={styles.iconRight}
            />
          }
        ></Button>
      )}
      <Loading isVisible={loading} text={textLoading} />
      {loading2 ? <Text style={styles.textEnviado}>Los Resultados fueron enviados con exito</Text> : <Text></Text>}

    </View>
  );
}

function defaulFormValue(paciente) {
  return {
    telefono: paciente.Telefono,
    email: paciente.Email,
    IdFolio: paciente.IdFolio,
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
  btnContainerconsultaPDF: {
    marginTop: 20,
    marginBottom: 30,
    width: "100%",
  },
  btnconsultaPDF: {
    backgroundColor: "#663366",
  },
  iconRight: {
    color: "#C1C1C1",
  },
  btnContainerFechaNacimiento: {
    marginTop: 20,
    width: "100%",
  },
  btnFechaNacimiento: {
    backgroundColor: "#303979",
  }, tinySemaforo: {
    width: 14,
    height: 14,
  },
  textTitle: {
    fontWeight: "bold",
    textAlign: "center",
  }, textEnviado: {
    color: "#663366",
    fontWeight: "bold",
    textAlign: "justify"
  }, imgStatus: {
    width: 128,
    height: 113,
  }
});
