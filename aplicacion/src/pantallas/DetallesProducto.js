import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import firebase from "../database/firebase";

const DetallesProducto = (props) => {
  const estadoInicial = {
    id: "",
    nombre: "",
    precio: "",
  }
  const [producto, setProducto] = useState(estadoInicial);
  const [loading, setLoading] = useState(true);


  const getProductoPorId = async (id) => {
    const dbRef = firebase.baseDatos.collection("producto").doc(id);
    const doc = await dbRef.get();
    const documentoProducto = doc.data();
    setProducto({
      //Se pasan todos los datos que tenga el producto
      ...documentoProducto,
      id: doc.id,
    });
    setLoading(false);
  };

  useEffect(() => {
    getProductoPorId(props.route.params.productoId);
  }, [] );

  const handleChangeText = (nombre, value) => {
    setProducto({ ...producto, [nombre]: value });
  };

  const eliminarProducto = async () => {
      const dbRef = firebase.baseDatos.collection('producto').doc(props.route.params.productoId);
      await dbRef.delete();
      props.navigation.navigate('Inventario')
  }

  const actualizarProducto = async () => {
    const dbRef = firebase.baseDatos.collection('producto').doc(producto.id);
    await dbRef.set({
      nombre: producto.nombre,
      precio: producto.precio,
    })
    setProducto(estadoInicial)
    props.navigation.navigate('Inventario')
  }

  const confirmarEliminacion = () => {
      Alert.alert('Eliminar producto', '¿Desea eliminar el producto?', [
        { text: 'Confirmar', onPress: () => eliminarProducto() },
        { text: 'Cancelar', onPress: () => console.log('Cancelado') },
      ])
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre de producto"
          value={producto.nombre}
          onChangeText={(value) => handleChangeText("nombre", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="precio electronico"
          value={producto.precio}
          onChangeText={(value) => handleChangeText("precio", value)}
        />
      </View>
      <View>
        <Button title="Actualizar" onPress={() => actualizarProducto() } />
      </View>
      <View>
        <Button  title="Eliminar" onPress={() => confirmarEliminacion() } />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#BDD9F2",
  },
});

export default DetallesProducto;
