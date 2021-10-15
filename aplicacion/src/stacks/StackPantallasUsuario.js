import React from 'react'
import { View, Text } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import CrearUsuario from '../pantallas/CrearUsuario'
import DetallesUsuario from '../pantallas/DetallesUsuario'
import ListaUsuario from '../pantallas/ListaUsuario'

const StackPantallasUsuario = () => {
    const StackUsuario = createNativeStackNavigator();
    return (
        <StackUsuario.Navigator>
            <StackUsuario.Screen name = "Usuarios" component ={ListaUsuario} />
            <StackUsuario.Screen name = "Agregar nuevo usuario" component ={CrearUsuario} />
            <StackUsuario.Screen name = "Detalles del usuario" component ={DetallesUsuario} />
        </StackUsuario.Navigator>
    )
}

export default StackPantallasUsuario
