import React  from 'react';
import {StyleSheet,View,Text} from "react-native";
import {Button,Image } from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";

      

export default function FinSolicitud() {
  const navigation = useNavigation();
  const onSubmit = () => {
   //  console.log("Hola");
    navigation.navigate("nuevaSolicitud")
}
  

  return (
    
      <View style={styles.viewForm}>
       
        <Text style={styles.textTitle} > 
        {"\n"}
        {"\n"}
        {"\n"}Solicitud enviada con exito, la información le llego al paciente en su correo y WhatsApp</Text>
        
        <Image
            style={styles.imgStatus}
            source={require("../../../assets/img/ready.png")}
          />
        <Button
                title="Nueva Solicitud"
                containerStyle={styles.btnContainerSearch}
                buttonStyle={styles.btnSearch}
                onPress={onSubmit}
            />
      </View>
      
   
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
    alignItems:"center"
  },
  textTitle: {
    fontWeight: "bold",
    textAlign: "center",
  }, btnContainerSearch: {
    marginTop: 20,
    width: "100%",
    marginBottom: 20
    //alignItems:"right"
}, btnSearch: {
    backgroundColor: "#663366",

} , imgStatus: {
  width: 128,
  height: 113,
}
});
