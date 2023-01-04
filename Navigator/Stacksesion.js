import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registro from "../Screens/Registrarse";
import InicioSesion from "../Screens/InicioSesion";

const Stack = createNativeStackNavigator();

const StackSesion = () => {
  return (
    <Stack.Navigator
      initialRouteName="IniciarSesion"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="IniciarSesion" component={InicioSesion} />
      <Stack.Screen name="Registro" component={Registro} />
    </Stack.Navigator>
  );
};

export default StackSesion;

