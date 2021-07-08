import React,{useRef,useState,useEffect} from 'react';
import {StyleSheet,View,Text,AsyncStorage,ScrollView} from "react-native";
import {useNavigation,useIsFocused} from "@react-navigation/native";
import Toast from 'react-native-easy-toast';
import DatosPacienteForm from "../../components/NuevaSolicitud/DatosPacienteForm";





    
 export default function DatosPaciente(props) {
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
    const {route} = props; 
      

    return(
        <ScrollView>
        <Text style={styles.textTitle}>Alta Paciente</Text>
        <View 
            style={styles.viewForm}>
            <DatosPacienteForm toastRef={route.params.toastRef} paciente={route.params.paciente} />
        </View>
        <Toast ref={route.params.toastRef} position="center" opacity={0.9}
        />
        </ScrollView>

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