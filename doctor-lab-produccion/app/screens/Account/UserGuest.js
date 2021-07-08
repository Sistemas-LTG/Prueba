import React from 'react';
import {StyleSheet,View,Text,ScrollView,Image} from "react-native";
import { Button } from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

export default function UserGuest() {
    const navigation = useNavigation();
    //.log(navigation);
    return(
        <ScrollView centerContent={true} style={styles.viewBody}>
            
            <Image 
                source={require("../../../assets/img/LTG.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.title}>
                Consulta tu perfil del Laboratorio Tellez Giron

            </Text>

            <Text style={styles.description}>
                

            </Text>
            <View style={styles.viewBtn}>
                <Button 
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    title="Ver tu perfil"
                    onPress={()=>navigation.navigate("login")}
                />
            </View>

        </ScrollView>


    );    
}

const styles=StyleSheet.create({
    viewBody:{
        marginLeft:30,
        marginRight:30,
    },
    image:{
        height:300,
        width:"100%",
        marginBottom:40,
    },title:{
        fontWeight:"bold",
        fontSize:19,
        marginBottom:10,
        textAlign:"center"
     },description:{
        marginBottom:20,
        textAlign:"center"
    },btnStyle:{
        backgroundColor:"#663366"
    },viewBtn:{
        flex:1,
        alignItems:"center"
    },btnContainer:{
        width:"70%",
    }

});