import React, {useState,useEffect} from 'react';
import { StyleSheet,View,Text,Image } from "react-native";
import {Input,Icon,Button,CheckBox} from 'react-native-elements';
import {size,isEmpty,split} from 'lodash';
import {useNavigation} from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from '@react-native-picker/picker';
import Loading from "../Loading";
import {validateEmail} from '../../utils/validations' 


export default function DatosPacienteForm(props) {
    const {toastRef,paciente} = props; 
    const [formData, setFormData] = useState(defaulFormValue(paciente));
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
    const [isFechaCita, setIsFechaCita] = useState(false); 
    const [selectedValue, setSelectedValue] = useState("")
    const [apellidoPaterno, setApellidoPaterno] = useState();
    const [apellidoMaterno, setApellidoMaterno] = useState();
    const [nombre, setNombre] = useState();
    const [genero, setGenero] = useState();
    const [fechaNac, setFechaNac] = useState();
    //const [data, setData] = useState([]);
   
    useEffect(() => {
        console.log(paciente);
        setApellidoPaterno(paciente.ApellidoPaterno);
        setApellidoMaterno(paciente.ApellidoMaterno);
        setNombre(paciente.Nombre);
        setFechaNac(paciente.FechaNac);
        setGenero(paciente.IdSexo);
    }, [paciente])

      const setUTM = (itemValue) => {
        setFormData({...formData,"UTM":itemValue})
        
      
      };
      
      
        const showDatePicker2 = () => {
            setDatePickerVisibility2(true);
            
          };
        
          const hideDatePicker2 = () => {
            setIsFechaCita(false);
            setDatePickerVisibility2(false);
          };
        
          const handleConfirm2 = (date) => {
            setFormData({...formData,"fechaCita":date})
            hideDatePicker2();
            setIsFechaCita(true);
          
          };

    const onSubmit = () =>{
         
        
        console.log(formData);
            if(size(formData.telefono!=10) && size(formData.telefono!=0)){
                toastRef.current.show("El Whats App debe estar a 10 números");
            }else if(!validateEmail(formData.email) && size(formData.email!=0)){
                toastRef.current.show("El email no tiene formato correcto");
             }else{
                setLoading(true);
              
                setLoading(false);
                  navigation.navigate("cargaEstudios",{paciente:formData,toastRef:toastRef});
             }
         }
    function convertMX(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [ day,mnth ,date.getFullYear()].join("-");
    }
     const onChange=(e,type)=>{
        setFormData({...formData,[type]: e.nativeEvent.text});
     }
     return(
        <View style={styles.formContainer}>
            <Text>{apellidoPaterno} {apellidoMaterno} {nombre} </Text>
            <Text>{fechaNac} {genero}  </Text>
          
               
            
            <Input 
            placeholder="WhatsApp"
            containerStyle={styles.inputForm}
            keyboardType="numeric"
            onChange={e=>onChange(e,"telefono")}
            defaultValue={paciente.Lada+paciente.Telefono || ""}
            rightIcon={
                <Icon
                    type="material-community"
                    name="whatsapp"
                    iconStyle={styles.iconRight}
                    
                />
            }
            />
            <Input 
            placeholder="E-mail"
            containerStyle={styles.inputForm}
            keyboardType="email-address"
            onChange={e=>onChange(e,"email")}
            defaultValue={paciente.Email || ""}
            rightIcon={
                <Icon
                    type="material-community"
                    name="at"
                    iconStyle={styles.iconRight}
                    
                />
            }
            />

            <Picker
            title="Sucursal"
                selectedValue={selectedValue}
                style={styles.pickerList}
                onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue);setUTM(itemValue)} }
            >   
                <Picker.Item label="[Sucursal]" value="" />
                <Picker.Item label="URESTI" value="26" />
                <Picker.Item label="HIMNO NACIONAL" value="28" />
                <Picker.Item label="HIMALAYA" value="30" />
            </Picker>

            <Button 
                title={isFechaCita? "Fecha Cita: "+convertMX(formData.fechaCita) :"Fecha Cita Propuesta"} 
                onPress={showDatePicker2} 
                containerStyle={styles.btnContainerFechaNacimiento}
                buttonStyle={styles.btnFechaNacimiento}/>
            <DateTimePickerModal
                isVisible={isDatePickerVisible2}
                mode="date"
                onConfirm={handleConfirm2}
                onCancel={hideDatePicker2}
                locale="es_MX"
                
            />
           
            <Button
            title="Siguiente"
            containerStyle={styles.btnContainerGuardar}
            buttonStyle={styles.btnGuardar}
            onPress={onSubmit}
            icon={
                <Icon
                    type="material-community"
                    name="content-save-move-outline"
                    iconStyle={styles.iconRight}
                />
            }
            />
            <Loading isVisible={loading} text="Guardando" 
            />
        </View>
    );
}


function defaulFormValue(paciente) {
    return{
        idPaciente:paciente.IdPaciente,
        telefono:paciente.Lada+paciente.Telefono,
        email:paciente.Email,
        fechaCita:"",
        UTM:""
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
    },btnContainerGuardar:{
        marginTop:20,
        marginBottom:30 ,
        width:"100%",
        //alignItems:"right"
    },btnGuardar:{
        backgroundColor:"#663366",
    },iconRight:{
        color:"#C1C1C1",
    }, datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
      checkRadio:{
        display:"flex",
        flex:1,
        justifyContent:"center",
        alignItems: "flex-start",
        width:"100%",
        flexDirection: 'column',
      //  alignItems:"center",
       // justifyContent:"right",
        marginTop:20,
    },btnContainerFechaNacimiento:{
        marginTop:20,
        width:"100%",
        //alignItems:"right"
    },btnFechaNacimiento:{
        backgroundColor:"#303979",
    },pickerList:{
        marginTop:20,
        width:"100%",
        //alignItems:"right"
    }
}) ;