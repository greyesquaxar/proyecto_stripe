import React, { useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import firebase from '../database/firebase'


const CrearUsuario = (props) => {

    const [state, setstate] = useState({
        nombre: '',
        correo: '',
        celular: '',
    })

    const handleChangeText = (nombre, value) => {
        setstate({...state, [nombre]: value})
    }

    const guardarNuevoUsuario = async () => {
        if (state.nombre === ''){
            alert('Por favor ingrese un nombre')
        } else {
            //Manejo de errores
            try {
                await firebase.baseDatos.collection('usuario').add({
                    nombre: state.nombre,
                    correo: state.correo,
                    celular: state.celular 
                })
                //alert('Usuario guardado')
                props.navigation.navigate('Usuarios');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <ScrollView style = {styles.container} >
            <View style = {styles.inputGroup} >
                <TextInput placeholder = "Nombre de usuario" onChangeText={(value) => handleChangeText('nombre', value) } />
            </View>
            <View style = {styles.inputGroup} >
                <TextInput placeholder = "Correo electronico" onChangeText={(value) => handleChangeText('correo', value) } />
            </View>
            <View style = {styles.inputGroup} >
                <TextInput placeholder = "Numero de celular" onChangeText={(value) => handleChangeText('celular', value) } />
            </View>
            <View>
                <Button title = "Guardar usuario" onPress = {()=> guardarNuevoUsuario() } />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35 
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15, 
        borderBottomWidth: 1,
        borderBottomColor: '#BDD9F2'
    }
})

export default CrearUsuario