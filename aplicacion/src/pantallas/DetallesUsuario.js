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

const DetallesUsuario = (props) => {
  const estadoInicial = {
    id: "",
    nombre: "",
    correo: "",
    celular: "",
  }
  const [usuario, setUsuario] = useState(estadoInicial);
  const [loading, setLoading] = useState(true);


  const getUsuarioPorId = async (id) => {
    const dbRef = firebase.baseDatos.collection("usuario").doc(id);
    const doc = await dbRef.get();
    const documentoUsuario = doc.data();
    setUsuario({
      //Se pasan todos los datos que tenga el usuario
      ...documentoUsuario,
      id: doc.id,
    });
    setLoading(false);
  };

  useEffect(() => {
    getUsuarioPorId(props.route.params.usuarioId);
  }, [] );

  const handleChangeText = (nombre, value) => {
    setUsuario({ ...usuario, [nombre]: value });
  };

  const eliminarUsuario = async () => {
      const dbRef = firebase.baseDatos.collection('usuario').doc(props.route.params.usuarioId);
      await dbRef.delete();
      props.navigation.navigate('Usuarios')
  }

  const actualizarUsuario = async () => {
    const dbRef = firebase.baseDatos.collection('usuario').doc(usuario.id);
    await dbRef.set({
      nombre: usuario.nombre,
      correo: usuario.correo,
      celular: usuario.celular
    })
    setUsuario(estadoInicial)
    props.navigation.navigate('Usuarios')
  }

  const confirmarEliminacion = () => {
      Alert.alert('Eliminar usuario', '¿Desea eliminar el usuario?', [
        { text: 'Confirmar', onPress: () => eliminarUsuario() },
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
          placeholder="Nombre de usuario"
          value={usuario.nombre}
          onChangeText={(value) => handleChangeText("nombre", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Correo electronico"
          value={usuario.correo}
          onChangeText={(value) => handleChangeText("correo", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Numero de celular"
          value={usuario.celular}
          onChangeText={(value) => handleChangeText("celular", value)}
        />
      </View>
      <View>
        <Button title="Actualizar" onPress={() => actualizarUsuario() } />
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

export default DetallesUsuario;
