import React, {useState,useEffect} from 'react';
import { StyleSheet,View,Text,Image } from "react-native";
import {Input,Icon,Button} from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import { ListItem } from 'react-native-elements';
import Loading from "../Loading";   
import {map} from "lodash";


export default function ResultadosLista(props) {
    const {busqueda,toastRef,render} = props;   
    const navigation = useNavigation();
    console.log(props);
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);
    const [render2, setRender2] = useState(render)
    const selectedComponent = (key) => {
       // console.log(key);
      //  navigation.navigate("datosPaciente",{idPaciente:key,toastRef:toastRef});
    }
    function onPress(datosPaciente) {
        console.log(datosPaciente);
        navigation.navigate("datosPaciente",{paciente:datosPaciente,toastRef:toastRef});
    }

    useEffect(() => {
        setLoading(true);
        fetch(`http://procureltg.com/Pruebas/APIAppDoctores/APIDoctoresBusquedaPaciente.php?ApellidoPaterno=${busqueda.paterno}&ApellidoMaterno=${busqueda.materno}&Nombre=${busqueda.nombre}`)
          .then((response) => response.json())
          .then((json) => setData(json.Registros))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      },[render]);
   

    const crearPaciente = () =>{
        navigation.navigate("nuevoPaciente");
    }
     
    return(
        <View >
            
             <Loading isVisible={loading} text="Cargando..." /> 
            
            {map(data,(datas,index)=> (
                    <ListItem key={index} bottomDivider onPress={(()=>onPress(datas) )}>
                    <ListItem.Content >
                      <ListItem.Title>{datas.ApellidoPaterno} {datas.ApellidoMaterno} {datas.Nombre}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
            )
            )}

            
            
        <Button
            title="Crear Paciente"
            containerStyle={styles.btnContainerSearch}
            buttonStyle={styles.btnSearch}
            onPress={crearPaciente}
            
            />
        </View>


    );
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
    },btnContainerSearch:{
        marginTop:20,
        width:"100%",
        //alignItems:"right"
    },btnSearch:{
        backgroundColor:"#663366",
        
    },iconRight:{
        color:"#C1C1C1",
    },listData:{
        width:"100%",
       // marginTop:20,
    }
}) ;