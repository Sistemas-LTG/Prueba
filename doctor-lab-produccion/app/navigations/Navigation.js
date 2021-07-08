import React,{useEfect,useState} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BusquedaStack from "./BusquedaStack";
import PuntosStack from "./PuntosStack";
import NuevaSolicitudStack from "./NuevaSolicitudStack";
import AccountStack from "./AccountStack";
import {Icon} from "react-native-elements";



const Tab = createBottomTabNavigator();

export default function Navigation(){
    
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName="account"
            tabBarOptions={{
                inactiveTinColor:"#646464",
                activeTinColor:"#00A680"
            }}
            screenOptions={({route})=>({
                tabBarIcon: ({color}) => screenOptions(route,color),
            })}
            >   
                
                <Tab.Screen 
                    name="nuevaSolicitud" 
                    component={NuevaSolicitudStack} 
                    options={{title:"Nueva Solicitud", headerLeft:null}} />
                <Tab.Screen 
                    name="busqueda" 
                    component={BusquedaStack} 
                    options={{title:"Busqueda"}}
                 />
                 <Tab.Screen 
                    name="puntos" 
                    component={PuntosStack} 
                    options={{title:"Puntos"}} />
                 <Tab.Screen 
                    name="account" 
                    component={AccountStack} 
                    options={{title:"Mi Cuenta"}} />
            </Tab.Navigator>

        </NavigationContainer>

    );
    
}



function screenOptions(route,color) {
    let iconName;

    switch (route.name) {
        case "nuevaSolicitud":
            iconName="file-plus"
            break;
        case "puntos":
                iconName="counter"
                break;
        case "busqueda":
            iconName="magnify"
            break;
        case "account":
                iconName="account"
                break;
        default:
            break;
    }

    return (
        <Icon type="material-community" name={iconName} size={22} color={color} />

    );

}   