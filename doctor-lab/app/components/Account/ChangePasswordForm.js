import React, {useState} from 'react'
import { StyleSheet,View,Text } from 'react-native'
import {Input,Button} from 'react-native-elements'
//import * as firebase from "firebase";
import { isSet, size } from "lodash";
//import { reauthenticate } from "../../utils/api";

export default function ChangePasswordForm(props){
    const {setShowModal,toastRef} = props;
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordN, setShowPasswordN] = useState(false);
    const [showPasswordNC, setShowPasswordNC] = useState(false);
    const [formData, setFormData] = useState(defaultValues());
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState({});

    const onChange=(e,type)=>{
        setFormData({...formData,[type]: e.nativeEvent.text});

    }
    const onSumbit = async () =>{
        let errorTem={};
        let isSetError=true;
        setError({});
        console.log(formData);
        if(!formData.password || !formData.passwordN || !formData.passwordNC){
            errorTem={    
                password:!formData.password?"La contraseña actual no puede estar vacia":"",
                passwordN:!formData.passwordN?"La contraseña nueva no puede estar vacia":"",
                passwordNC:!formData.passwordNC?"La confirmacion de la contraseña actual no puede estar vacia":"",
            };
        }else if(formData.passwordN!==formData.passwordNC){
            errorTem={    
                passwordN:"Las contraseñas no coinciden",
                passwordNC:"Las contraseñas no coinciden",
            };
        }else if(size(formData.passwordN)<6){
            errorTem={    
                passwordN:"La contraseña tiene que ser mayor a 6 caracteres",
                passwordNC:"La confirmacion de contraseña tiene que ser mayor a 6 caracteres",
            };
        }else{
           /* setIsLoading(true);

           await reauthenticate(formData.password).then(async() => {
              await  firebase
                .auth()
                .currentUser
                .updatePassword(formData.passwordN)
                .then(()=>{
                    isSetError=false;
                    setIsLoading(false);
                    setShowModal(false);
                    // setReloadUserInfo(true);
                    //toastRef.current.show("Email actualizado correctamente");
                    firebase.auth().signOut();
                   
                }).catch(()=>{
                    setError({
                        other:"Error al actualizar la contraseña",
                    });
                    
                    setIsLoading(false);
                });
                
            }).catch(()=>{
                errorTem={    
                    password:"Las contraseñas actual es incorrecta",
                  
                }
                setIsLoading(false);
            });
            */
           

           
        }
        isSetError &&  setError(errorTem);


    }

    return(
    <View style={styles.view}>
         <Input 
                placeholder="Contraseña Actual"
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
             <Input 
                placeholder="Contraseña Nueva"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPasswordN? false:true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword? "eye-off-outline":"eye-outline",
                    color:"#c2c2c2",
                    onPress: ()=>setShowPasswordN(!showPasswordN)
                }}
                onChange={e=>onChange(e,"passwordN")}
                errorMessage={error.passwordN}

            />
             <Input 
                placeholder="Confirmar Contraseña Nueva"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPasswordNC? false:true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword? "eye-off-outline":"eye-outline",
                    color:"#c2c2c2",
                    onPress: ()=>setShowPasswordNC(!showPasswordNC)
                }}
                onChange={e=>onChange(e,"passwordNC")}
                errorMessage={error.passwordNC}

            />

        <Button 
            title="Cambiar Contraseña"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={onSumbit}
            loading={isLoading}
            
            />
            <Text>{error.other} </Text>
    </View>
    )   
}

function defaultValues() {
    return{
        password:"",
        passwordN:"",
        passwordNC:""
    }
    
}
const styles=StyleSheet.create({
    view:{
        alignItems: "center",
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