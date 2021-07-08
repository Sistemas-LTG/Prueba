import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Puntos from "../screens/Puntos/Puntos";
import DetallePuntos from "../screens/Puntos/DetallePuntos";

const Stack = createStackNavigator();

export default function PuntosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="puntos"
        component={Puntos}
        options={{ title: "Puntos" ,headerLeft: null}}
      />
      <Stack.Screen
        name="detallePuntos"
        component={DetallePuntos}
        options={{ title: "Detalle Puntos" }}
      />
    </Stack.Navigator>
  );
}
