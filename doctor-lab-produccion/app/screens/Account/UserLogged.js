import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from "react-native";
//import * as firebase from "firebase";
import { Button, Divider, Icon } from 'react-native-elements';
import Toast from "react-native-easy-toast";
import Loading from '../../components/Loading';
import AccountOption from '../../components/Account/AccountOption';
import { useNavigation, useIsFocused } from "@react-navigation/native";


export default function UserLogged() {
    const toastRef = useRef();
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [reloadUserInfo, setReloadUserInfo] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [login, setLogin] = useState(true);
    useEffect(() => {
        async function fetchMyAPI() {
            const usTemp = await AsyncStorage.getItem('IdUsuario');
            //console.log(usTemp);
            if (usTemp === null) {
                navigation.navigate("login");
                setLogin(false);
            } else {
                //setIdUsuario(usTemp);
                setLogin(true);
            }


        }

        fetchMyAPI();
    }, [isFocused])



    const CerrarFuncion = async () => {
        //alert('adios');
        setLoading(true);
        await AsyncStorage.removeItem("mailUser");
        await AsyncStorage.removeItem("passwdUser");
        await AsyncStorage.removeItem("IdUsuario");
        await AsyncStorage.removeItem("NombreUsuario");
        //console.log('se eliminan credenciales');
        setLoading(false);
        navigation.navigate("login");
    }

    return (
        <View style={styles.viewUserInfo}>
           

            <AccountOption
                userInfo={userInfo}
                toastRef={toastRef}
                setReloadUserInfo={setReloadUserInfo}
            />


            <Divider
                style={styles.divider}
            />
            <View style={styles.container} >
                <Icon
                    reverse
                    type="material-community"
                    name="file-plus"
                    color="#663366"
                    ali
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate("nuevaSolicitud")}
                />
                <Text>Nueva Solicitud{"\n"}{"\n"}</Text>

                <Icon
                    reverse
                    type="material-community"
                    name="magnify"
                    color="#663366"
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate("busqueda")}
                />
                <Text>Busqueda{"\n"}{"\n"}</Text>

                <Icon
                    reverse
                    type="material-community"
                    name="counter"
                    color="#663366"
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate("puntos")}
                />
                <Text>Puntos{"\n"}{"\n"}</Text>
                <Icon
                    reverse
                    type="material-community"
                    name="account"
                    color="#663366"
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate("account")}
                />
                <Text>Cuenta{"\n"}{"\n"}{"\n"}{"\n"}</Text>
                <Button title="Cerrar Sessión" onPress={CerrarFuncion} />

            </View>



            <Loading isVisible={loading} text="Cerrando sesión"
            />
        </View>


    );
}


const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: "100%",
        backgroundColor: "#F2F2F2",
    }, btnCloseSession: {
        marginTop: 80,
        marginBottom: 30,
        borderRadius: 0,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10
    }, btnCloseSessionText: {
        color: "#00A680"
    }, divider: {
        backgroundColor: "#663366",
        margin: 20
    }, btnContainer: {
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
    }, btnContainerClose: {
        //position: "absolute",
        bottom: 10,
    }, container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        alignContent: "center",
        alignSelf: "center",
        textAlign: "center",


    },

});