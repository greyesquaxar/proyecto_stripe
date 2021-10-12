import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import ListaUsuario from './pantallas/ListaUsuario'
import CrearUsuario from './pantallas/CrearUsuario'
import DetallesUsuario from './pantallas/DetallesUsuario'

const Stack = createNativeStackNavigator()

function MyStack(){
  return (
    <Stack.Navigator>
        
        <Stack.Screen name = "CrearUsuario" component = {CrearUsuario} />
        <Stack.Screen name = "ListaUsuario" component = {ListaUsuario} />
        <Stack.Screen name = "DetallesUsuario" component = {DetallesUsuario} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
        <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
