import React, {useState} from 'react';
import { StyleSheet,View,Text,Image } from "react-native";
import {Input,Icon,Button} from 'react-native-elements';
import {validateEmail} from '../../utils/validations' ;
import {size,isEmpty} from 'lodash';
//import firebase from "firebase/app";
//import "firebase/auth";
//import * as firebase from 'firebase';
import {useNavigation} from "@react-navigation/native";
import Loading from "../Loading";


export default function RegisterForm(props) {
    const {toastRef} = props; 
    const [showPassword,setShowPassword]=useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaulFormValue());
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [response, setResponse] = useState("");
    const [loading2, setLoading2] = useState(false);

    
    const onSubmit = async () =>{
            // console.log(formData);
            if(isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.repeatPassword) ||
            isEmpty(formData.nombre) || isEmpty(formData.apMaterno) || isEmpty(formData.apPaterno) || 
            isEmpty(formData.especialidad) || isEmpty(formData.cedula) || isEmpty(formData.direccion) || 
            isEmpty(formData.telefono)){
                toastRef.current.show("Todos los campos son obligatorios");

            }else if(!validateEmail(formData.email)){
               toastRef.current.show("El email no tiene formato correcto");

            } else if(formData.password!==formData.repeatPassword){
                toastRef.current.show("Las contraseñas no coinciden");

            } else if (size(formData.password)<6){
                toastRef.current.show("La contraseña debe de tener al menos 6 caracteres");
            }else{
                setLoading(true);
                await fetch(`https://ltgprocure.com/APIAppDoctores/APIDoctoresRegistro.php?ApPaterno=${formData.apPaterno}&ApMaterno=${formData.apMaterno}&Nombre=${formData.nombre}&Fecha=&Sexo=&CedProf=${formData.cedula}&Curp=&Passwd=${formData.password}&Mail=${formData.email}&Tel=${formData.telefono}&Dir=${formData.direccion}`)
                .then((response) => response.json())
                .then((json) => setResponse(json.Registros))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
                setLoading2(true);
            }
        }
    
    const onChange=(e,type)=>{
        

        setFormData({...formData,[type]: e.nativeEvent.text});
    }

    return(
        <View style={styles.formContainer}>
            <Input 
            placeholder="Nombre"
            containerStyle={styles.inputForm}
            onChange={e=>onChange(e,"nombre")}
            rightIcon={
                <Icon
                    type="material-community"
                    name="form-textbox"
                    iconStyle={styles.iconRight}
                    
                />
            }
            />
            <Input 
            placeholder="Aoellido Paterno"
            containerStyle={styles.inputForm}
            onChange={e=>onChange(e,"apPaterno")}
            rightIcon={
                <Icon
                    type="material-community"
                    name="form-textbox"
                    iconStyle={styles.iconRight}
                    
                />
            }
            />
            <Input 
            placeholder="Apellido Materno"
            containerStyle={styles.inputForm}
            onChange={e=>onChange(e,"apMaterno")}
            rightIcon={
                <Icon
                    type="material-community"
                    name="form-textbox"
                    iconStyle={styles.iconRight}
                    
                />
            }
            />
            <Input 
            placeholder="Especialidad"
            containerStyle={styles.inputForm}
            onChange={e=>onChange(e,"especialidad")}
            rightIcon={
                <Icon
                    type="material-community"
                    name="form-textbox"
                    iconStyle={styles.iconRight}
                    
                />
            }
            />
            <Input 
            placeholder="Cedúla Profesional"
            containerStyle={styles.inputForm}
            onChange={e=>onChange(e,"cedula")}
            rightIcon={
                <Icon
                    type="material-community"
                    name="numeric"
                    iconStyle={styles.iconRight}
                    
                />
            }
            />
            <Input 
            placeholder="Direccion Completa"
            containerStyle={styles.inputForm}
            onChange={e=>onChange(e,"direccion")}
            rightIcon={
                <Icon
                    type="material-community"
                    name="map-marker-outline"
                    iconStyle={styles.iconRight}
                    
                />
            }
            />
            <Input 
            placeholder="Telefono"
            containerStyle={styles.inputForm}
            onChange={e=>onChange(e,"telefono")}
            rightIcon={
                <Icon
                    type="material-community"
                    name="cellphone"
                    iconStyle={styles.iconRight}
                    
                />
            }
            />
            <Input 
            placeholder="Correo electronico"
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
            placeholder="Contraseña"
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
             <Input 
            placeholder="Repetir Contraseña"
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={showRepeatPassword?false:true}
            onChange={e=>onChange(e,"repeatPassword")}
            rightIcon={
                <Icon
                    type="material-community"
                    name={showRepeatPassword?"eye-off-outline":"eye-outline"}
                    iconStyle={styles.iconRight}
                    onPress={()=> setShowRepeatPassword(!showRepeatPassword) }
                />
            }
            />  
             {loading2?<Text style={styles.textEnviado}>Su solicitud fue enviada con exito, en las proximas horas recibira su confirmación de registro al correo registrado, no es necesario registrarse nuevamente</Text>:<Text></Text>}
        
            <Button
            title="Solicitar Registro"
            containerStyle={styles.btnContainerRegister}
            buttonStyle={styles.btnRegister}
            onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Enviando Solicitud" 
            />
           </View>
    );
}

function defaulFormValue() {
    return{
        email:"",
        password:"",
        repeatPassword:"",
        nombre:"",
        apPaterno:"",
        apMaterno:"",
        especialidad:"",
        cedula:"",
        direccion:"",
        telefono:""
    };    
}

const styles= StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
    },inputForm:{
        width:"100%",
        marginTop:20,
    },btnContainerRegister:{
        marginTop:20,
        marginBottom:20,
        width:"100%",
    },btnRegister:{
        backgroundColor:"#663366",
        
    },iconRight:{
        color:"#C1C1C1"
    },textEnviado:{
        color: "#663366",
        fontWeight: "bold",
        textAlign:"justify"
    }
}) ;