import React,{useRef,useState,useEffect} from 'react';
import {StyleSheet,View,Text,AsyncStorage} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Toast from 'react-native-easy-toast';
import {useNavigation,useIsFocused} from "@react-navigation/native";
import {Input,Icon,Button} from 'react-native-elements';
import BusquedaForm from "../../components/Busqueda/BusquedaForm";

export default function Busqueda() {
  //console.log(props)
  const toastRef = useRef();
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


  return (
    <KeyboardAwareScrollView>
      <View style={styles.viewForm}>
       {login?<BusquedaForm toastRef={toastRef} />:<Text>Off-line</Text>}
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <View style={styles.formContainer}></View>
    </KeyboardAwareScrollView>
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
  iconRight: {
    color: "#C1C1C1",
  },
  btnContainerCrear: {
    marginTop: 20,
    width: "40%",
    //alignItems:"right"
  },
  btnCrear: {
    backgroundColor: "#663366",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});
