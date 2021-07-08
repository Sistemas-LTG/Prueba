import React,{useState} from 'react'
import {StyleSheet,View,Text} from "react-native";
import { Input,Icon,Button } from "react-native-elements";
import {validateEmail} from '../../utils/validations' ;
import Loading from "../Loading";
import {size,isEmpty} from 'lodash'
//import "firebase/auth";
//import * as firebase from 'firebase';
import {useNavigation} from "@react-navigation/native";

export default function ForgotPasswordForm(props) {
    const {toastRef} = props; 
    const [showPassword,setShowPassword]=useState(false);
    const [formData, setFormData] = useState(defaulFormValue());
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [loading2, setLoading2] = useState(false);
    const [response, setResponse] = useState("");

    const onSubmit = async () =>{
        // console.log(formData);
             if(isEmpty(formData.email)){
                 toastRef.current.show("Campo obligatorio");
 
             }else if(!validateEmail(formData.email)){
                toastRef.current.show("El email no tiene formato correcto");
 
             } else{
           
                setLoading(true);
                await fetch(`https://ltgprocure.com/APIAppDoctores/APIDoctoresOlvidoPasswd.php?Correo=${formData.email}`)
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
                
                <Button
            title="Olvide Contraseña"
            containerStyle={styles.btnContainerLogin}
            buttonStyle={styles.btnLogin}
            onPress={onSubmit}
            />
              {loading2?<Text style={styles.textEnviado}>Su solicitud de contraseña fue enviada con exito, revise su correo electronico.</Text>:<Text></Text>}
        
         <Loading isVisible={loading} text="Solicitando reseteo de contraseña" 
            />
        </View>
    );


}


function defaulFormValue() {
    return{
        email:""
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
        marginBottom:25,
        width:"95%"
    },btnLogin:{
        backgroundColor:"#663366"
    } ,iconRight:{
        color:"#C1C1C1"
    },textEnviado:{
        color: "#663366",
        fontWeight: "bold",
        textAlign:"justify"
    }
})