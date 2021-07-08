import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Busqueda from "../screens/Busqueda/Busqueda";
import DetalleSolicitud from "../screens/Busqueda/DetalleSolicitud";
import DetallePDF from "../screens/Busqueda/DetallePDF";

const Stack = createStackNavigator();

export default function BusquedaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="busqueda"
        component={Busqueda}
        lazy={false}
        options={{ title: "Busqueda" ,headerLeft: null}}
      />
      <Stack.Screen
        name="detalleSolicitud"
        component={DetalleSolicitud}
        options={{ title: "Detalle Solicitud Medica" }}
      />
      <Stack.Screen
        name="detallePDF"
        component={DetallePDF}
        options={{ title: "Consultar PDF" }}
      />
    </Stack.Navigator>
  );
}
