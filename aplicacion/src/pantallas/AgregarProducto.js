import React, { useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import firebase from '../database/firebase'

const AgregarProducto = (props) => {

    const [state, setstate] = useState({
        nombre: '',
        precio: '',
    })

    const handleChangeText = (nombre, value) => {
        setstate({...state, [nombre]: value})
    }

    const guardarNuevoPrducto = async () => {
        if (state.nombre === ''){
            alert('Por favor ingrese un nombre')
        } else {
            //Manejo de errores
            try {
                await firebase.baseDatos.collection('producto').add({
                    nombre: state.nombre,
                    precio: state.precio, 
                })
                //alert('Usuario guardado')
                props.navigation.navigate('Inventario');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <ScrollView style = {styles.container} >
            <View style = {styles.inputGroup} >
                <TextInput placeholder = "Producto" onChangeText={(value) => handleChangeText('nombre', value) } />
            </View>
            <View style = {styles.inputGroup} >
                <TextInput placeholder = "Precio" onChangeText={(value) => handleChangeText('precio', value) } />
            </View>
            <View>
                <Button title = "Guardar producto" onPress = {()=> guardarNuevoPrducto() } />
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

export default AgregarProducto