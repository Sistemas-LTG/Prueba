import React,{useRef,useState,useEffect} from 'react';
import {StyleSheet,View,Text,AsyncStorage} from "react-native";
import {useNavigation,useIsFocused} from "@react-navigation/native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Toast from 'react-native-easy-toast';
import NuevoPacienteForm from "../../components/NuevaSolicitud/NuevoPacienteForm";



 export default function NuevoPaciente() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const[login,setLogin] = useState(false);
    useEffect(() => {
        async function fetchMyAPI() {
          const usTemp = await AsyncStorage.getItem('IdUsuario'); 
          console.log(usTemp);
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
    const toastRef = useRef();
    return(
        <KeyboardAwareScrollView>
        <Text style={styles.textTitle}>Alta Paciente</Text>
        <View 
            style={styles.viewForm}>
            <NuevoPacienteForm toastRef={toastRef} />
        </View>
        <Toast ref={toastRef} position="center" opacity={0.9}
        />
        </KeyboardAwareScrollView>

    );
}

const styles =StyleSheet.create({
    logo:{
        width:"100%",
        height: 150,
        marginTop:20,
    },viewForm:{
        marginRight:40,
        marginLeft: 40,
    },textTitle:{
        fontWeight:"bold",
        textAlign:"center"
    }
});