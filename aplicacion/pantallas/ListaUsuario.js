import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";

const ListaUsuario = (props) => {
  const [usuario, setUsuario] = useState([]);
  useEffect(() => {
    // Devuelve los datos almacenados hasta este momento en la BD
    firebase.baseDatos.collection("usuario").onSnapshot((querySnapshot) => {
      const usuarios = [];

      querySnapshot.docs.forEach((doc) => {
        const { nombre, correo, celular } = doc.data();
        usuarios.push({
          id: doc.id,
          nombre,
          correo,
          celular,
        });
      });
      setUsuario(usuarios);
    });
  }, []);

  return (
    <ScrollView>

      {usuario.map((usuario) => {
        return (
          <ListItem key={usuario.id} bottomDivider onPress = {() => {
              props.navigation.navigate('DetallesUsuario',{
                usuarioId: usuario.id
              })
          }  } >
            <ListItem.Chevron />
            <ListItem.Content>
              <ListItem.Title>{usuario.nombre}</ListItem.Title>
              <ListItem.Subtitle>{usuario.correo}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}

      <Button
        title="Crear usuario"
        onPress={() => props.navigation.navigate("CrearUsuario")}
      />
      <Button
        title="Ir a agregar producto"
        onPress={() => props.navigation.navigate("AgregarProducto")}
      />
    </ScrollView>
  );
};

export default ListaUsuario;
