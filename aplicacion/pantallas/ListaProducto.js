import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";

const ListaProducto = (props) => {
  const [producto, setProducto] = useState([]);
  useEffect(() => {
    // Devuelve los datos almacenados hasta este momento en la BD
    firebase.baseDatos.collection("producto").onSnapshot((querySnapshot) => {
      const productos = [];

      querySnapshot.docs.forEach((doc) => {
        const { nombre, precio } = doc.data();
        productos.push({
          id: doc.id,
          nombre,
          precio,
        });
      });
      setProducto(productos);
    });
  }, []);

  return (
    <ScrollView>
      {producto.map((producto) => {
        return (
          <ListItem
            key={producto.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("DetallesProducto", {
                productoId: producto.id,
              });
            }}
          >
            <ListItem.Chevron />
            <ListItem.Content>
              <ListItem.Title>{producto.nombre}</ListItem.Title>
              <ListItem.Subtitle>{producto.precio}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}

      <Button
        title="Crear producto"
        onPress={() => props.navigation.navigate("CrearProducto")}
      />
    </ScrollView>
  );
};

export default ListaProducto;
