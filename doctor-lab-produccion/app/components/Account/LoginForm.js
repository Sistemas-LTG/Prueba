import React,{useState, useEffect} from 'react'
import {StyleSheet,View, AsyncStorage} from "react-native";
import { Input,Icon,Button, Text } from "react-native-elements";
import {validateEmail} from '../../utils/validations' ;
import Loading from "../Loading";
import {size,isEmpty} from 'lodash'
//import UserLogged from "../../screens/Account/UserLogged";
//import "firebase/auth";
//import * as firebase from 'firebase';
import {useNavigation} from "@react-navigation/native";

export default function LoginForm(props) {
    const {toastRef} = props; 
    const [showPassword,setShowPassword]=useState(false);
    const [formData, setFormData] = useState(defaulFormValue());
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [data, setData] = useState("");
    const [message, setMessage] = useState(false);
    const [mailUser, setUserLogIn] = useState();
    const [responseApi, setResponseApi] = useState("");
    const [passwdUser, setPasswdLogIn] = useState();
    const [textoLoading, setTextoLoading] = useState(false)
 

    const mostrarUsuarioLogeado = async() =>{
        try{
          let mailUser = await AsyncStorage.getItem("mailUser");
          let passwdUser = await AsyncStorage.getItem("passwdUser");
          //cconsole.log("mailUser: "+mailUser+", passwdUser:"+passwdUser);
          if(mailUser !== null){
            setUserLogIn(mailUser);
          }
          if(passwdUser !== null){
            setPasswdLogIn(passwdUser);
          }
        }catch(err)
        {
          alert(err);
        }
      }

    useEffect(() => {
        mostrarUsuarioLogeado()
      }, []);

    const onSubmit = async () =>{
        // console.log(formData);
             if(isEmpty(formData.email) || isEmpty(formData.password)  ){
                 toastRef.current.show("Ambos campos son obligatorios");
 
             }else if(!validateEmail(formData.email)){
                toastRef.current.show("El email no tiene formato correcto");
 
             } else if (size(formData.password)<6){
                 toastRef.current.show("El password debe de tener al menos 6 caracteres");
             }else{
                 setLoading(true);

                 const response = await fetch(`https://ltgprocure.com/APIAppDoctores/APIDoctoresLogin.php?Login=${formData.email}&Password=${formData.password}&Nombre=${formData.nombre}&Fecha=&Sexo=&CedProf=${formData.cedula}&Curp=&Passwd=${formData.password}`);
                 const json = await response.json();
               // console.log(json);
                if(json.Mensaje === "PASSWD_CORRECTO"){
                    //console.log("pasele");
                    setUserLogIn(formData.email);
                    setPasswdLogIn(formData.password);
                    // guardarUsuarioLogueado();
                     AsyncStorage.setItem("mailUser", formData.email);
                     AsyncStorage.setItem("passwdUser",formData.password);
                     AsyncStorage.setItem("IdUsuario",json.IdUsuario);
                     AsyncStorage.setItem("NombreUsuario",json.Nombre);

                    setLoading(false);
                    setTextoLoading(false);
                    navigation.navigate("account",{email:formData.email});
                    //<UserLogged />

                    
                }
                else{
                    setLoading(false);
                    setTextoLoading(true);
                }
                
            }
    }

    /* */
    const callAPILogin = async() =>{
        //console.log('https://procureltg.com/Pruebas/APIAppDoctores/APIDoctoresLogin.php?Login='+formData.email+'&Password='+formData.password);
        await fetch('https://ltgprocure.com/APIAppDoctores/APIDoctoresLogin.php?Login='+formData.email+'&Password='+formData.password,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            //.log('callAPILogin Codigo: '+json.Codigo);
            setData(json.Codigo);
        })
        .catch(err => console.error(err));
    }
    /* */
     
     const onChange=(e,type)=>{
         
 
         setFormData({...formData,[type]: e.nativeEvent.text});
     }
    return (
        <View
            style={styles.formContainer}>
               
                <Input 
                    placeholder="Correo Electronico"
                    containerStyle={styles.inputForm}
                    onChange={e=>onChange(e,"email")}
                    rightIcon={
                        <Icon
                            type="material-community"
                            name="at"
                            iconStyle={styles.iconRight}
                            
                        />
                    }
                />
                 <Input 
                    placeholder="Password"
                    containerStyle={styles.inputForm}
                    password={true}
                    secureTextEntry={showPassword?false:true}
                    onChange={e=>onChange(e,"password")}
                    rightIcon={
                        <Icon
                            type="material-community"
                            name={showPassword?"eye-off-outline":"eye-outline"}
                            iconStyle={styles.iconRight}
                            onPress={()=> setShowPassword(!showPassword) }
                        />
                    }
                />
                <Button
            title="Iniciar Sesión"
            containerStyle={styles.btnContainerLogin}
            buttonStyle={styles.btnLogin}
            onPress={() => onSubmit()}
            />
         <Loading isVisible={loading} text={textoLoading} 
            />
             {textoLoading?<Text style={styles.textEnviado}>Error: Correo o Contraseña no coinciden con los registros, favor de verificar</Text>:<Text></Text>}
        
        </View>
    );


}


function defaulFormValue() {
    return{
        email:"",
        password:"",
    };    
}


const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30
    },inputForm:{
        width:"100%",
        marginTop:20
    },btnContainerLogin:{
        marginTop:25,
        width:"95%"
    },btnLogin:{
        backgroundColor:"#663366"
    } ,iconRight:{
        color:"#C1C1C1"
    },textEnviado:{
        color: "#FF0000",
        fontWeight: "bold",
        textAlign:"justify"
    }
})