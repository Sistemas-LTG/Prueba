import React,{useEffect, useState} from 'react';
import {View,Text, AsyncStorage} from "react-native";
//import * as firebase from "firebase";
//import firebase from "firebase/app";
//import "firebase/auth";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import Loading from "../../components/Loading";


export default function Account(props) {
    const {route} = props; 
    const [render, setRender] = useState(route.params.email);
    const[login,setLogin] = useState(null);
    const[passwdGuardado,setPassGuardado] = useState(null);
    const [reloadUserInfo, setReloadUserInfo] = useState(false)
    //
    useEffect(() => {

     // console.log("useEffect");
        
        async function fetchMyAPI() {
            await AsyncStorage.getItem('mailUser')
            .then ((valor ) => {
           // console.log(valor);
            
              if (valor === null){
                setLogin(false);
              }else{
                setLogin(true);
              }
              
            })
            .catch((error ) => {
            console.log(error);
            });
            
            
           
          }
      
          fetchMyAPI();


         //return setLogin(null);
        

        
    });
  
    
    if(login===null) return <Loading isVisible={true} text="Cargando..." />;

    return login?<UserLogged />:<UserGuest />;     
}


