import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import NuevaSolicitud  from "../screens/NuevaSolicitud/NuevaSolicitud";
import NuevoPaciente  from "../screens/NuevaSolicitud/NuevoPaciente";
import CargaEstudios  from "../screens/NuevaSolicitud/CargaEstudios";
import DatosPaciente  from "../screens/NuevaSolicitud/DatosPaciente";
import FinSolicitud from '../screens/NuevaSolicitud/FinSolicitud';



const Stack = createStackNavigator();

export default  function NuevaSolicitudStack(){

    return(

        <Stack.Navigator>
            <Stack.Screen
                name="nuevaSolicitud"
                component={NuevaSolicitud}
                options={{title: "Nueva Solicitud",headerLeft: null}}

            />
            <Stack.Screen
                name="nuevoPaciente"
                component={NuevoPaciente}
                options={{title: "Nuevo Paciente",headerLeft: null}}
            />
             <Stack.Screen
                name="datosPaciente"
                component={DatosPaciente}
                options={{title: "Datos del paciente",headerLeft: null}}
            />
             <Stack.Screen
                name="cargaEstudios"
                component={CargaEstudios}
                options={{title: "Carga de estudios",headerLeft: null}}
            />
             <Stack.Screen
                name="finSolicitud"
                component={FinSolicitud}
                options={{title: "Fin De La Solicitud",headerLeft: null}}
            />
        </Stack.Navigator>
    );

}