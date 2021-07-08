import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage } from "react-native";
import { Input, Icon, Button } from 'react-native-elements';
import { size, isEmpty } from 'lodash';
import { useNavigation } from "@react-navigation/native";

import ResultadosLista from '../NuevaSolicitud/ResultadosLista'

export default function NuevaSolicitudForm(props) {
    const { toastRef } = props;

    const [formData, setFormData] = useState(defaulFormValue());
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const [renderComponent, setRenderComponent] = useState(false);
    const [recargar, setRecargar] = useState("");
    const crearPaciente = () => {
        navigation.navigate("nuevoPaciente");
    }




    const onSubmit = () => {
        setRecargar(formData);
        setRenderComponent(false);

        if (isEmpty(formData.paterno) && isEmpty(formData.materno) && isEmpty(formData.nombre)) {
            toastRef.current.show("Indique al menos un parametro de busqueda");

        } else {
            setRenderComponent(true);


            //setLoading(false);



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

            <Button
                title="Buscar"
                containerStyle={styles.btnContainerSearch}
                buttonStyle={styles.btnSearch}
                onPress={onSubmit}
                loading={loading}
            />

            <View style={styles.listData}>
                {renderComponent ? <ResultadosLista busqueda={formData} render={recargar} toastRef={toastRef} /> : <Text>...</Text>}


            </View>

        </View>
    );
}


function defaulFormValue() {
    return {
        paterno: "",
        materno: "",
        nombre: "",
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
    }, btnContainerSearch: {
        marginTop: 20,
        width: "100%",
        marginBottom: 20
        //alignItems:"right"
    }, btnSearch: {
        backgroundColor: "#663366",

    }, iconRight: {
        color: "#C1C1C1",
    }, listData: {
        width: "100%",
        // marginTop:20,
    }
});