import React,{useRef,useState,useEffect} from 'react';
import {StyleSheet,View,Text,AsyncStorage,Linking} from "react-native";
import {useNavigation,useIsFocused} from "@react-navigation/native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Toast from 'react-native-easy-toast';

export default function DetallePDF(props) {
  const { toastRef, route } = props;
  const [NombrePaciente, setNombrePaciente] = useState();
  const [IdFolio, setIdFolio] = useState();
  const [RutaArchivo, setRutaArchivo] = useState();
  //console.log(route);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const[login,setLogin] = useState(false);
    useEffect(() => {
        async function fetchMyAPI() {
          const usTemp = await AsyncStorage.getItem('IdUsuario'); 
         // console.log(usTemp);
          if(usTemp===null){
           setLogin(false);
           navigation.navigate("login");
          }else{
            //setIdUsuario(usTemp);
            setLogin(true);
          }
          
  
      }
  
      fetchMyAPI();
    },[isFocused])

  useEffect(() => {
    setNombrePaciente(route.params.paciente);
    setIdFolio(route.params.IdFolio);
    setRutaArchivo(route.params.RutaArchivo);
    
  }, [route]);
  //console.log(route);

  return (
    <View style={styles.formContainer}>
      <Text></Text>
      <Text style={styles.textTitle}>VISTA PREVIA PDF</Text>
      <Text style={styles.title}>PACIENTE: {NombrePaciente}</Text>
      <Text style={styles.title}>
        {IdFolio == 0 || IdFolio == null
          ? "PACIENTE NO SE A PRESENTADO A CITA"
          : "FOLIO: " + IdFolio}
      </Text>
      <Text></Text>
      <Text style={styles.url} onPress={() => Linking.openURL(RutaArchivo)}>
        VER PDF
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
  textTitle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    textAlign: "center",
  },
  url: {
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontStyle: "italic",
  },
});
