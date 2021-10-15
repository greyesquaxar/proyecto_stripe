import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackPantallasProducto from "./stacks/StackPantallasProducto";
import StackPantallasUsuario from "./stacks/StackPantallasUsuario";
import { NavigationContainer } from "@react-navigation/native";

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown:false}} >
        <Tab.Screen name="Producto" component={StackPantallasProducto} />
        <Tab.Screen name="Usuario" component={StackPantallasUsuario} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;
