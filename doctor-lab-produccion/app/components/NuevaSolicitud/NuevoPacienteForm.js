import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from "react-native";
import { Input, Icon, Button, CheckBox } from 'react-native-elements';
import { size, isEmpty, split } from 'lodash';
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import Loading from "../Loading";
import { validateEmail } from '../../utils/validations'
import { map } from "lodash";


export default function NuevoPacienteForm(props) {
    const { toastRef } = props;
    const [formData, setFormData] = useState(defaulFormValue());
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isFechaSeleccionada, setIsFechaSeleccionada] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
    const [isFechaCita, setIsFechaCita] = useState(false);
    const [isFemenino, setIsFemenino] = useState(false);
    const [isMasculino, setIsMasculino] = useState(false);
    const [selectedValue, setSelectedValue] = useState("")
    const [paciente, setPaciente] = useState([])
    
    useEffect(() => {
        //console.log(formData);
        
        if(formData.idPaciente!==""){
            navigation.navigate("cargaEstudios", { paciente: formData, toastRef: toastRef });
            console.log("send");
        }
        
    }, [formData.idPaciente])


    const setSexo = (sexo) => {
        setFormData({ ...formData, "sexo": sexo })
       // console.log(formData);
    };

    const setUTM = (itemValue) => {
        setFormData({ ...formData, "UTM": itemValue })
        //console.log(formData);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);

    };

    const hideDatePicker = () => {
        setIsFechaSeleccionada(false);
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setFormData({ ...formData, "fechaNacimiento": date })
        hideDatePicker();
        setIsFechaSeleccionada(true);

    };

    const showDatePicker2 = () => {
        setDatePickerVisibility2(true);

    };

    const hideDatePicker2 = () => {
        setIsFechaCita(false);
        setDatePickerVisibility2(false);
    };

    const handleConfirm2 = (date) => {
        setFormData({ ...formData, "fechaCita": date })
        hideDatePicker2();
        setIsFechaCita(true);

    };
    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    function convertMX(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth,date.getFullYear()].join("-");
    }
    const onSubmit = async () => {
        // console.log(formData);
        if (isEmpty(formData.paterno) || isEmpty(formData.materno) || isEmpty(formData.nombre)
            || isEmpty(formData.sexo) || isEmpty(formData.fechaNacimiento)) {
            toastRef.current.show("Todos los datos son obligatorios");

        } else if (size(formData.telefono != 10)) {
            toastRef.current.show("El Whats App debe estar a 10 números");
        } else if (!validateEmail(formData.email)) {
            toastRef.current.show("El email no tiene formato correcto");

        } else {
            setLoading(true);

            setFormData({ ...formData, "fechaNacimiento": convert(formData.fechaNacimiento) })

            setLoading(true);

            const response = await fetch(
                `https://ltgprocure.com/APIAppDoctores//APIDoctoresAltaPaciente.php?ApPaterno=${formData.paterno}&ApMaterno=${formData.materno}&Nombre=${formData.nombre}&Sexo=${formData.sexo}&FechaNac=${convert(formData.fechaNacimiento)}&Mail=${formData.email}&Tel=${formData.telefono}`
            );
        
            const json = await response.json();
            const pacientito = await json.IdPaciente;
            //console.log(json);
            setFormData({ ...formData, "idPaciente": pacientito })
           
            setLoading(false);



        }
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }
    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Apellido Paterno"
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "paterno")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="account-search"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input
                placeholder="Apellido Materno"
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "materno")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="account-search"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input
                placeholder="Nombre(s)"
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "nombre")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="account-search"
                        iconStyle={styles.iconRight}
                    />
                }
            />

            <CheckBox
                left
                title='Hombre'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                containerStyle={styles.checkRadio}
                checked={isMasculino}
                onPress={() => { setIsFemenino(false); setIsMasculino(true); setSexo(1) }}
            />
            <CheckBox
                right
                title='Mujer'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                containerStyle={styles.checkRadio}
                checked={isFemenino}
                onPress={() => { setIsMasculino(false); setIsFemenino(true); setSexo(2) }}
            />

            <Button
                title={isFechaSeleccionada ? "Fecha Nac: "+convertMX(formData.fechaNacimiento) : "Seleccione Fecha de Nacimiento"}
                onPress={showDatePicker}
                containerStyle={styles.btnContainerFechaNacimiento}
                buttonStyle={styles.btnFechaNacimiento} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                locale="es_MX"

            />
            <Input
                placeholder="WhatsApp"
                containerStyle={styles.inputForm}
                keyboardType="numeric"
                onChange={e => onChange(e, "telefono")}
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
                onChange={e => onChange(e, "email")}
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
                onValueChange={(itemValue, itemIndex) => { setSelectedValue(itemValue); setUTM(itemValue) }}
            >
                <Picker.Item label="[Sucursal]" value="" />
                <Picker.Item label="URESTI" value="26" />
                <Picker.Item label="HIMNO NACIONAL" value="28" />
                <Picker.Item label="HIMALAYA" value="30" />
            </Picker>

            <Button
                title={isFechaCita ? "Fecha Cita: "+convertMX(formData.fechaCita) : "Fecha seleccionada"}
                onPress={showDatePicker2}
                containerStyle={styles.btnContainerFechaNacimiento}
                buttonStyle={styles.btnFechaNacimiento} />
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


function defaulFormValue() {
    return {
        paterno: "",
        materno: "",
        nombre: "",
        fechaNacimiento: "",
        sexo: "",
        telefono: "",
        email: "",
        fechaCita: "",
        UTM: "",
        idPaciente: "",
    };
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    }, inputForm: {
        width: "100%",
        marginTop: 20,
    }, btnContainerGuardar: {
        marginTop: 20,
        marginBottom: 30,
        width: "100%",
        //alignItems:"right"
    }, btnGuardar: {
        backgroundColor: "#663366",
    }, iconRight: {
        color: "#C1C1C1",
    }, datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
    checkRadio: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        flexDirection: 'column',
        //  alignItems:"center",
        // justifyContent:"right",
        marginTop: 20,
    }, btnContainerFechaNacimiento: {
        marginTop: 20,
        width: "100%",
        //alignItems:"right"
    }, btnFechaNacimiento: {
        backgroundColor: "#303979",
    }, pickerList: {
        marginTop: 20,
        width: "100%",
        //alignItems:"right"
    }
});