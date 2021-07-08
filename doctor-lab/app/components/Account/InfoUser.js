import React from 'react';
import { StyleSheet,View,Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import DefaultAvatar from "../../../assets/img/avatar-default.jpg";
//import * as firebase from 'firebase';
//import * as Permissions  from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
//import { Camera } from 'expo-camera';

export default function InfoUser(props) {
    const {userInfo :{uid,photoURL,displayName,email},toastRef,setLoading,setLoadingText}=props;
    const changeAvatar = async ()=>{
       //const resultPermission = await Camera.requestPermissionsAsync();
       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      // const resultPermissionCamera = resultPermission.permissions.status;
       //console.log(resultPermission);
       if(status!=="granted"){
        toastRef.current.show("Es necesario aceptar los permisos de la galeria");

       }else{
           const result = await ImagePicker.launchImageLibraryAsync({
               allowsEditing: true,
               aspect: [4,3]
           })

           console.log(result);
           if(result.cancelled){
            toastRef.current.show("No seleccionaste ninguna imagén");
           }else{
                uploadImage(result.uri).then(()=> {  
                    updatePhotoUrl();
                }).catch(()=>{
                    toastRef.current.show("Error al cargar la imagén");
                })

           }
       }

    }


    const uploadImage = async(uri) =>{
        //console.log(uri);
        setLoadingText("Actualizando avatar");
        setLoading(true);
        const response = await fetch(uri);
        const blob = await response.blob();
        //const ref = firebase.storage().ref().child(`avatar/${uid}`);
        return ref.put(blob);

    }
    const updatePhotoUrl = () =>{

        firebase
        .storage()
        .ref(`avatar/${uid}`)
        .getDownloadURL()
        .then(async (response) =>{
            //console.log(response);
            const update = {
                photoURL:response
            };
            await firebase.auth().currentUser.updateProfile(update);
            //toastRef.current.show("Imagén actualizada");

            setLoading(false);

        }).catch(()=>{
            toastRef.current.show("Error al actualizar el avatar");
        })
    }

    return(

        <View style={styles.viewUserInfo}>
            <Avatar  
            rounded
            size="large"
            showEditButton
            onLongPress={changeAvatar}
            containerStyle={styles.userInfoAvatar}
            
            source={
                photoURL?{uri:photoURL}: require("../../../assets/img/avatar-default.jpg")
            }
            />
            <View>
                <Text style={styles.displayName}> {displayName?displayName:"Anónimo"}</Text>
                <Text> {email?email:"Social Login"}</Text>
            </View>
        </View>


    );
}

const styles = StyleSheet.create({
    userInfouserInfoAvatarAvatar:{
        marginRight:20
    },viewUserInfo:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection: "row",
        backgroundColor:"#F2f2f2",
        paddingTop:30,
        paddingBottom:30
    },displayName:{
        fontWeight:"bold",
        paddingBottom:10
    }
});