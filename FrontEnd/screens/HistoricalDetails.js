import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image, Modal } from "react-native";
import { useHistorical } from "../hooks/useHistorical";
import * as Print from "expo-print";
import loaderGif from "../assets/loader.gif";
import * as Sharing from "expo-sharing";
import useDecodeJWT from "../hooks/useDecodeJWT";

export function HistoricalDetailsScreen({ route, navigation }) {
  const { getToken, isTokenExpired, refreshToken } = useDecodeJWT();
  const { compraId } = route.params;
  const { orders } = useHistorical();
  const compra = orders.find((p) => p.id === compraId);

  // Efecto para cargar los detalles de la compra
  if (!compra) {
    // navigation.setOptions({
    //   headerShown: !compra,
    // });
    return (
      <View className="bg-main-blue w-full h-full justify-center items-center">
        <Image source={loaderGif} style={{ width: 300, height: 300 }} />
      </View>
    );
  }

  // Función para formatear el precio
  const formatCurrency = (value) => {
    return value.toLocaleString("es-CR", {
      style: "currency",
      currency: "CRC",
      maximumFractionDigits: 0,
    });
  };
  // ------------------------------------------------------------------------

  //Funcion para descargar el PDF con los detalles de la compra
  const handleDownload = async () => {
    try {
      const htmlContent = `
        <h1>Detalles de Compra</h1>
        <p>Usuario: ${compra.user_name}</p>
        <p>Fecha: ${formatDate(compra.order_date)}</p>
        <p>Total a pagar: ${formatCurrency(compra.total_price)}</p>
        <p>Código: ${compra.order_num}</p>
        <hr/>
        <table border="1" cellspacing="0" cellpadding="5">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${compra.products
              .map(
                (item) => `
              <tr>
                <td>${item.item_name}</td>
                <td>${formatCurrency(item.total_price)}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.quantity * item.total_price)}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <hr/>
        <h2>Entrega</h2>
        <p>${compra.direction}</p>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo generar el PDF.");
    }
  };
  // ------------------------------------------------------------------------

  // Función para manejar la notificación de problema
  const handleComplete = async () => {
    if (compra.status === "Entregado") {
      return Alert.alert("Notificación", "La compra ya ha sido entregada.");
    }
    if (compra.status === "Pendiente") {
      return Alert.alert("Notificación", "La compra aun esta pendiente.");
    }
    // Verificar si el token ha expirado
    if (await isTokenExpired()) {
      await refreshToken();
    }
    let token = await getToken();
    try {
      const response = await fetch(
        `https://marlin-backend.vercel.app/api/orders/${compra.id}/`,
        {
          method: "Patch",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access}`,
          },
          body: JSON.stringify({
            status: "Entregado",
          }),
        }
      );

      if(!response.ok){
        console.log(response.status)
      }

      Alert.alert(
        "Perfecto",
        "Próximamente vendrá un repartidor a recoger el pedido",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Inicio");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error en handleReady:", error);
      Alert.alert("Error", "Hubo un problema al procesar el pedido.");
    }
  };
  // ------------------------------------------------------------------------

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CR", options);
  };
  // ------------------------------------------------------------------------

  return (
    <View className="flex-1 bg-white dark:bg-black py-4 px-8">
      <Text className="text-xl mt-2 font-Erode_regular text-main-blue dark:text-[#e6e6e6]">
        Usuario:
      </Text>
      <Text className="text-2xl mt-1 mb-3 font-Excon_bold text-main-blue dark:text-white">
        {compra.user_name}
      </Text>

      <View className="mb-4">
        <Text className="text-gray-600 font-Erode_bold mb-1 dark:text-[#e6e6e6]">
          Fecha:{" "}
          <Text className="font-Erode_regular">
            {formatDate(compra.order_date)}
          </Text>
        </Text>
        <Text className="text-gray-600 font-Erode_bold mb-1 dark:text-[#e6e6e6]">
          Total a pagar:{" "}
          <Text className="font-Erode_regular">
            {formatCurrency(compra.total_price)}
          </Text>
        </Text>
        <Text className="text-gray-600 font-Erode_bold mb-1 dark:text-[#e6e6e6]">
          Código: <Text className="font-Erode_regular">{compra.order_num}</Text>
        </Text>
      </View>

      <View className="border-b border-gray-30 dark:border-main-blue mb-4" />

      <Text className="text-xl mb-4 font-Excon_regular text-main-blue dark:text-white">
        Detalles de la orden
      </Text>

      <View className="flex-row justify-between mb-3 ">
        <Text className="font-Erode_bold w-1/3 text-main-blue text-lg dark:text-[#e6e6e6]">
          Producto
        </Text>
        <Text className="font-Erode_bold w-1/5 text-main-blue text-lg dark:text-[#e6e6e6]">
          Precio
        </Text>
        <Text className="font-Erode_bold w-1/6 text-main-blue text-lg dark:text-[#e6e6e6]">
          Cant.
        </Text>
        <Text className="font-Erode_bold w-1/7 text-main-blue text-lg dark:text-[#e6e6e6]">
          Subtotal
        </Text>
      </View>

      {compra.products.map((item, index) => (
        <View key={index} className="flex-row justify-between mb-3">
          <Text className="font-Erode_regular w-1/3 text-gray-600 text-lg dark:text-[#e6e6e6d0]">
            {item.item_name}
          </Text>
          <Text className="font-Erode_regular w-1/5 text-gray-600 text-lg dark:text-[#e6e6e6d0]">
            {formatCurrency(item.total_price / item.quantity)}
          </Text>
          <Text className="font-Erode_regular w-1/6 text-gray-600 text-lg dark:text-[#e6e6e6d0]">
            {item.quantity}
          </Text>
          <Text className="font-Erode_regular w-1/7 text-gray-600 text-lg dark:text-[#e6e6e6d0]">
            {formatCurrency(item.total_price)}
          </Text>
        </View>
      ))}

      <View className="border-b border-gray-300 dark:border-main-blue mb-4" />

      <Text className="text-lg mb-2 font-Erode_regular text-main-blue dark:text-white">
        Entrega:
      </Text>
      <Text className="text-gray-600 font-Erode_regular mb-2 dark:text-[#e6e6e6d0]">
        {compra.direction}
      </Text>

      <View className="flex-row justify-evenly mt-4 mb-20">
        <TouchableOpacity
          className={` ${compra.status === "En camino" ? "opacity-100" : "opacity-50" }  bg-main-blue px-4 py-2 rounded-lg`}
          onPress={handleComplete}
        >
          <Text className="text-white font-Excon_bold">
            Marcar como completado
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border-main-blue border px-4 py-2 rounded-lg"
          onPress={handleDownload}
        >
          <Text className="text-main-blue font-Excon_bold">Descargar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
