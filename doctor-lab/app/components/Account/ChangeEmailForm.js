import React,{useState} from 'react';
import { StyleSheet,View } from 'react-native';
import {Input,Button} from 'react-native-elements';
//import * as firebase from "firebase";
import { validateEmail } from "../../utils/validations";
//import { reauthenticate } from "../../utils/api";

export default function ChangeEmailForm(props) {
    const {email,setShowModal,toastRef,setReloadUserInfo} = props;
   
    const [error, setError] = useState({});
    const [formData, setFormData] = useState(defaultValues());
    const [isLoading, setIsLoading] = useState(false); 
    const [showPassword, setShowPassword] = useState(false);
    const onChange=(e,type)=>{
        setFormData({...formData,[type]: e.nativeEvent.text});

    }

    const onSumbit = () =>{
        setError({});
      //  console.log(newEmail);
        if(!formData.email || email===formData.email){
            setError({
                email:"El email no ha cambiado",
            });
        }else if(!validateEmail(formData.email)){
            setError({
                email:"El email no es valido",
            });
        }else if(!formData.password){
            setError({
                password:"El password es requerido",
            });
        }else{
            setIsLoading(true);

          /*  reauthenticate(formData.password).then(response => {
                firebase
                .auth()
                .currentUser
                .updateEmail(formData.email)
                .then(()=>{
                    setIsLoading(false);
                    setReloadUserInfo(true);
                    toastRef.current.show("Email actualizado correctamente");
                    setShowModal(false);
                }).catch(()=>{
                    setError({
                        email:"Error al actualizar el email",
                    });
                    
                    setIsLoading(false);
                });
                
            }).catch(()=>{
                setError({
                    password:"El password es incorrecto",
                });
                setIsLoading(false);
            });
            
            */

           
        }


    }
    return(
        <View style={styles.view}>
            <Input 
               placeholder="Correo electronico"
               containerStyle={styles.input} 
               rightIcon={{
                   type: "material-community",
                   name: "at",
                   color:"#c2c2c2"
               }}
               defaultValue={email || ""}
               onChange={e=>onChange(e,"email")}
               errorMessage={error.email}
            />
            <Input 
                placeholder="Contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword? false:true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword? "eye-off-outline":"eye-outline",
                    color:"#c2c2c2",
                    onPress: ()=>setShowPassword(!showPassword)
                }}
                onChange={e=>onChange(e,"password")}
                errorMessage={error.password}

            />
            <Button 
            title="Cambiar Correo"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={onSumbit}
            loading={isLoading}
            
            />
        </View>

    );
}


function defaultValues() {
    return{
        email:"",
        password:""
    }
    
}
const styles=StyleSheet.create({
    view:{
        alignItems:"center",
        paddingTop:10,
        paddingBottom:10
    },input:{
        marginBottom:10,

    },btnContainer:{
        marginTop:20,
        width:"95%"
    },btn:{
        backgroundColor:"#00A680"
    }
});