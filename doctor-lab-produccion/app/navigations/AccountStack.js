import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Account  from "../screens/Account/Account";
import Login from "../screens/Account/Login";   
import Register from "../screens/Account/Register";
import ForgotPassword from '../screens/Account/ForgotPassword';

import UserLogged from '../screens/Account/UserLogged';

const Stack = createStackNavigator();

export default  function AccountStack(){

    return(

        <Stack.Navigator>
            <Stack.Screen
                name="account"
                component={Account}
                initialParams={{ email: ""}}
                options={{title: "Datos de la cuenta",headerLeft: null}}
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{title: "Log In",headerLeft: null}}
            />
             <Stack.Screen
                name="register"
                component={Register}
                options={{title: "Registrarse",headerLeft: null}}
            />
             <Stack.Screen
                name="forgotPassword"
                component={ForgotPassword}
                options={{title: "Olvide Contraseña",headerLeft: null}}
            />
             <Stack.Screen
                name="userLogged"
                component={UserLogged}
                options={{title: "Usuario Logeado,",headerLeft: null}}
            />
        </Stack.Navigator>
    );

}