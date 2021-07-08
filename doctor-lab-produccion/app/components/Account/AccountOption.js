import React,{useState,useEffect} from 'react';
import {StyleSheet,View ,AsyncStorage,Text } from "react-native";
import { ListItem } from 'react-native-elements';
import {map} from "lodash";
import Modal from '../Modal';

export default function AccountOption(props) {
    const {userInfo,toastRef,setReloadUserInfo} = props;
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null)
    const [emailUsuario, setEmailUsuario] = useState("Cargando...");
    const [nombreUser, setNombreUser] = useState("")
        useEffect(() => {
        async function fetchMyAPI() {
            const usTemp = await AsyncStorage.getItem('NombreUsuario'); 
            setNombreUser(usTemp);
            const usTemp2 = await AsyncStorage.getItem('mailUser'); 
            setEmailUsuario(usTemp2);
           // console.log(usTemp);
        }
    
        fetchMyAPI()
      }, [])
    
   
    
    return(
        <View >
           
            <Text style={styles.textEnviado}>Cuenta Activa</Text>
            <Text style={styles.textEnviado}>Usuario: {nombreUser}</Text>
            <Text style={styles.textEnviado}>Email: {emailUsuario}</Text>
        </View>
    );
    
}

const styles= StyleSheet.create({
  textEnviado:{
        color: "#663366",
        fontWeight: "bold",
        textAlign:"center"
    }
}) ;