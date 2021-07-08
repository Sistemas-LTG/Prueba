import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, AsyncStorage, ScrollView } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ListItem, Button, Icon, Input } from 'react-native-elements';
import { map, indexOf, size } from "lodash";
import Loading from "../../components/Loading";
import Toast from 'react-native-easy-toast';

export default function CargaEstudios(props) {
  const { route } = props;
  const { params } = route;
  const { toastRef, paciente } = params;
  // toastRef=
  //  console.log(props); 
  const [estudiosBasicos, setEstudiosBasicos] = useState({});
  const [estudiosSelected, setEstudiosSelected] = useState([]);
  const [estudiosSelectedList, setEstudiosSelectedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [estudiosBusqueda, setEstudiosBusqueda] = useState(null)
  const [formData, setFormData] = useState({ estudioB: "" });
  const [formDataCompleta, setFormDataCompleta] = useState({})
  const [idDoctorUsuario, setIdDoctorUsuario] = useState("");
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  const [login, setLogin] = useState(false);
  
  useEffect(() => {
    async function fetchMyAPI() {
      const usTemp = await AsyncStorage.getItem('IdUsuario');
      //console.log(usTemp);
      if (usTemp === null) {
        setLogin(false);
        navigation.navigate("login");
      } else {
        //setIdUsuario(usTemp);
        setLogin(true);
      }


    }

    fetchMyAPI();
  }, [isFocused])

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  }



  const onSubmit = async () => {
    const usTemp = await AsyncStorage.getItem('IdUsuario');
    setIdDoctorUsuario(usTemp);
    setFormDataCompleta({
      idPaciente: paciente.idPaciente,
      UTM: paciente.UTM,
      email: paciente.email,
      telefono: paciente.telefono,
      idDoctorUsuario: idDoctorUsuario,
      estudios: estudiosSelected
    });

    console.log(`https://ltgprocure.com/LabTellezGiron/APIDoctoresAltaSolicitud.php?json=[{"idPaciente":"${paciente.idPaciente}","UTM":"${paciente.UTM}","email":"${paciente.email}","telefono":"${paciente.telefono}","idUsuario":"${usTemp}","fechaProp":" ","indicaciones":" ","estudios":[${estudiosSelected}]}]`);
    if(estudiosSelected.length===0){
      toastRef.current.show("Tiene que tener estudios agregados para finalizar la solicitud");
    }else{
    setLoading(true)
    await fetch(`https://ltgprocure.com/LabTellezGiron/APIDoctoresAltaSolicitud.php?json=[{"idPaciente":"${paciente.idPaciente}","UTM":"${paciente.UTM}","email":"${paciente.email}","telefono":"${paciente.telefono}","idUsuario":"${usTemp}","fechaProp":" ","indicaciones":" ","estudios":[${estudiosSelected}]}]`)
      .then((response) => response.json())
      .then((json) => console.log(json.Registros))
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
        navigation.navigate("finSolicitud");
      });
    }


  }


  const onSubmitBusqueda = async () => {
    setLoading(true);
    //console.log(formData.estudioB);
    if (size(formData.estudioB) == 0) {

    } else {
      setLoading(true);
      await fetch(`https://ltgprocure.com/APIAppDoctores/APIDoctoresBusquedaEstudios.php?Estudio=${formData.estudioB}`)
        .then((response) => response.json())
        .then((json) => setEstudiosBusqueda(json.Registros))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
    // console.log(estudiosBusqueda)
  }

  useEffect(() => {
    setIdDoctorUsuario(AsyncStorage.getItem('IdUsuario'));
    setLoading(true);
    fetch(`https://ltgprocure.com/APIAppDoctores/APIDoctoresEstudiosBasicos.php`)
      .then((response) => response.json())
      .then((json) => setEstudiosBasicos(json.Registros))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  function onPress(estudios) {
    if (estudiosSelected.indexOf(estudios.IdEstudio) < 0) {
      toastRef.current.show("Estudio Agreado");
      setEstudiosSelected([...estudiosSelected, estudios.IdEstudio]);
      setEstudiosSelectedList([...estudiosSelectedList, estudios]);
     // console.log("Estudio Agregado");
    }
  }
  function onPressDelete(estudioToDelete) {
    var i = estudiosSelectedList.indexOf(estudioToDelete);

    if (i !== -1) {
      estudiosSelectedList.splice(i, 1);
      estudiosSelected.splice(i, 1);
      setEstudiosSelected([...estudiosSelected]);
      setEstudiosSelectedList([...estudiosSelectedList]);
    }

    // console.log(estudiosSelectedList);
  }




  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.textTitle} h1>Seleccione los estudios de la lista o utilice la busqueda</Text>
        <Text style={styles.textSubtitle}>Estudios Cargados</Text>

        {map(estudiosSelectedList, (estudiosS, index) => (
          <ListItem containerStyle={styles.ListItem}
            key={index}
            bottomDivider onPress={(() => onPressDelete(estudiosS))}
          >
            <ListItem.Content >
              <ListItem.Title containerStyle={styles.ListTitle}
              >{estudiosS.NombreEstudio}</ListItem.Title>
            </ListItem.Content>
            <Icon
              type="material-community"
              name="close-circle"

            />
          </ListItem>
        )
        )}
        <View style={styles.formContainer2}>
          <Button
            title="Finalizar"
            containerStyle={styles.btnContainerGuardar}
            buttonStyle={styles.btnGuardar}
            onPress={onSubmit}
          />

          <Input
            placeholder="Buscar Estudios"
            containerStyle={styles.inputForm}
            onChange={e => onChange(e, "estudioB")}
          />

          <Button
            title="Buscar"
            containerStyle={styles.btnContainerGuardar}
            buttonStyle={styles.btnBuscar}
            onPress={onSubmitBusqueda}
          />
        </View>
        {estudiosBusqueda && <Text style={styles.textSubtitle}>Resultados Busqueda</Text>}
        {map(estudiosBusqueda, (estudiosB, index) => (
          <ListItem key={index} bottomDivider onPress={(() => onPress(estudiosB))}>
            <ListItem.Content >
              <ListItem.Title>{estudiosB.NombreEstudio}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )
        )}

        <Text style={styles.textSubtitle} h3>Estudios Básicos</Text>
        {map(estudiosBasicos, (estudios, index) => (
          <ListItem key={index} bottomDivider onPress={(() => onPress(estudios))}>
            <ListItem.Content >
              <ListItem.Title>{estudios.NombreEstudio}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )
        )}


        <Loading isVisible={loading} text="Cargando..." />
        <Loading isVisible={loading2} text="Guardando y enviando la información..." />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9}/>
    </ScrollView>

  );
}


const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
  }, formContainer2: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  }, inputForm: {
    width: "80%",
    marginTop: 40,
  }, btnContainerGuardar: {
    marginTop: 20,
    marginBottom: 30,
    width: "80%",
    //alignItems:"right"
  }, btnGuardar: {
    backgroundColor: "#663366",
  }, iconRight: {
    color: "#C1C1C1",
  }, datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  checkRadio: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    flexDirection: 'column',
    //  alignItems:"center",
    // justifyContent:"right",
    marginTop: 2
  }, textTitle: {
    fontWeight: "bold",
    textAlign: "center",
    //marginBottom: 10,
  }, textSubtitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
    fontSize: 25,
  }, ListItem: {
    backgroundColor: "#A9E159",
  }, ListTitle: {
    color: "#984563",
    fontSize: 20,
    fontWeight: "bold"
  }, btnBuscar: {
    backgroundColor: "#303979",
  }
});