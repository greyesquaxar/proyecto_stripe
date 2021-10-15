import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaProducto from "../pantallas/ListaProducto";
import AgregarProducto from '../pantallas/AgregarProducto'
import DetallesProducto from "../pantallas/DetallesProducto";

const StackPantallasProducto = () => {
  const StackProducto = createNativeStackNavigator();
  return (
    <StackProducto.Navigator>
      <StackProducto.Screen
        name="Inventario"
        component={ListaProducto}
      />
      <StackProducto.Screen
        name="Agregar producto"
        component={AgregarProducto}
      />
      <StackProducto.Screen
        name="Detalles del producto"
        component={DetallesProducto}
      />
    </StackProducto.Navigator>
  );
};

export default StackPantallasProducto;
