import React, { useEffect } from "react";
import { View, Text, Pressable, ScrollView, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";
import { styled, useColorScheme } from "nativewind";
import useDecodeJWT from "../hooks/useDecodeJWT";
import useGetUser from "../hooks/useGetUser";
import useCRUDDelivery from "../hooks/useCRUDDelivery";

export function ProfileScreen({ navigation }) {
  const { fetchData, user, isLogged, setIsLogged } = useGetUser();
  const { decodeJWT } = useDecodeJWT();
  const isFocused = useIsFocused();
  const { toggleColorScheme } = useColorScheme();
  const { colorScheme } = useColorScheme();
  const { isDelivery, esRepartidor } = useCRUDDelivery();
  const siEsRepartidor = false;

  // Verificar si el usuario esta logueado
  useEffect(() => {
    const loadUser = async () => {
      const jsonValue = await AsyncStorage.getItem("@userToken");
      if (jsonValue == null) {
        setIsLogged(false);
      } else {
        setIsLogged(true);
        await fetchData();
      }
    };

    loadUser();
  }, [isFocused, navigation]);
  // ------------------------------------------------------------------------

  // Verificar el estado de inicio de sesión
  useEffect(() => {
    const search = async () => {
      const jsonValue = await AsyncStorage.getItem("@userToken");
      const userData = JSON.parse(jsonValue);
      const token = userData.access;
      const decodedToken = decodeJWT(token);
      const user_id = decodedToken.payload.user_id;
      isDelivery(user_id);
    };
    search();
    console.log("buscar usuario: ");
  }, []);
  // ------------------------------------------------------------------------

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@userToken");
      await AsyncStorage.removeItem("@cart");
      navigation.replace("Home");
      setIsLogged(false);
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
    }
  };
  // ------------------------------------------------------------------------

  return (
    <View
      style={{ flex: 1, alignItems: "center" }}
      className="px-8 bg-white dark:bg-black"
    >
      {isLogged == false ? (
        <ScrollView className="w-full h-full">
          <View className="w-full mt-14">
            <View className="flex justify-center items-center">
              <View className="flex justify-center items-center bg-main-blue p-4 rounded-3xl">
                <Image
                  source={require("../assets/img/marlin.png")}
                  style={{ width: 100, height: 100, resizeMode: "contain" }}
                />
              </View>
              <Text className="font-Excon_bold text-center bottom-4 text-2xl text-main-blue dark:text-white mt-8">
                Bienvenido a Marlin
              </Text>
            </View>

            <View className="w-full mt-6">
              <Pressable
                className="flex-row flex gap-3 items-center mb-6"
                onPress={() => navigation.navigate("Landing")}
              >
                <MaterialIcons
                  name="logout"
                  size={24}
                  color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                />
                <Text className="dark:text-white font-Excon_regular">
                  iniciar Sesion o Registrarse
                </Text>
              </Pressable>
              <View className="border border-main-blue dark:border-light-blue">

              </View>
            </View>

            <View className="w-full ">
              <Pressable
                className="flex-row justify-between mt-5  "
                onPress={() => toggleColorScheme()}
              >
                <Pressable
                  className="flex-row items-center flex gap-3 mb-4"
                  onPress={() => toggleColorScheme()}
                >
                  <Feather
                    name={colorScheme === "dark" ? "sun" : "moon"}
                    size={24}
                    color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                  />
                  <Text className="text-center font-Excon_regular dark:text-white">
                    {colorScheme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                  </Text>
                </Pressable>
              </Pressable>

              <Pressable
                className="flex-row items-center py-4 flex gap-3"
                onPress={() => navigation.navigate("TerminosCondiciones")}
              >
                <AntDesign
                  name="questioncircleo"
                  size={24}
                  color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                />
                <Text className="dark:text-white font-Excon_regular">Terminos y condiciones</Text>
              </Pressable>

            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          className="w-full h-full"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="w-full mt-14">
            <Text className="font-Excon_bold text-center bottom-4 text-xl dark:text-white mt-4">
              Configuración de Usuario
            </Text>
            <View className="flex flex-row justify-center items-center">
              <View className="flex justify-center items-center w-28 h-28 rounded-full bg-light-blue dark:bg-main-blue">
                <Image
                  source={{
                    uri: user.picture
                      ? user.picture.replace("image/upload/", "")
                      : `https://ui-avatars.com/api/?name=${user.username}&background=random`,
                  }}
                  style={{ width: 108, height: 108, borderRadius: 100 }}
                />
              </View>

              <View className="ml-6">
                <Text className="text-lg dark:text-white font-Erode_regular">
                  {user.username}
                </Text>
                <Text className="text-sm dark:text-white font-Erode_regular">
                  {user.email}
                </Text>
              </View>
            </View>

            <View className="w-full mt-4">
              <Text className="text-lg font-Excon_bold mb-4 dark:text-white">
                Perfil
              </Text>
              <Pressable
                className="flex-row justify-between border-b-2 border-main-blue dark:border-light-blue"
                onPress={() => navigation.navigate("InformationScreen")}
              >
                <View className="flex-row gap-2 mb-1 items-center">
                  <Feather
                    name="user"
                    size={24}
                    color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                  />
                  <Text className="text-center font-Erode_regular dark:text-white">
                    Información
                  </Text>
                </View>

                <Text className="text-main-blue dark:text-light-blue">
                  {">"}
                </Text>
              </Pressable>

              <Pressable
                className="flex-row justify-between mt-5 border-b-2 border-main-blue dark:border-light-blue"
                onPress={() => navigation.navigate("DirectionScreen")}
              >
                <View className="flex-row gap-2 mb-1 items-center">
                  <Feather
                    name="map-pin"
                    size={24}
                    color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                  />
                  <Text className="text-center font-Erode_regular dark:text-white">
                    Direcciones
                  </Text>
                </View>
                <Text className="text-main-blue dark:text-light-blue">
                  {">"}
                </Text>
              </Pressable>

              <Pressable
                className="flex-row justify-between mt-5 border-b-2 border-main-blue dark:border-light-blue"
                onPress={() => navigation.navigate("HistoricalScreen")}
              >
                <View className="flex-row gap-2 mb-1 items-center">
                  <MaterialIcons
                    name="history"
                    size={24}
                    color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                  />
                  <Text className="text-center font-Erode_regular dark:text-white">
                    Historial de compras
                  </Text>
                </View>
                <Text className="text-main-blue dark:text-light-blue">
                  {">"}
                </Text>
              </Pressable>
            </View>

            <View className="w-full mt-6">
              <Text className="text-lg font-Excon_bold mb-4 dark:text-white">
                Ajustes de la aplicación
              </Text>

              <Pressable
                className="flex-row justify-between border-b-2 border-main-blue dark:border-light-blue"
                onPress={() => navigation.replace("Home")}
              >
                <View className="flex-row gap-2 mb-1 items-center">
                  <Ionicons
                    name="refresh-outline"
                    size={24}
                    color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                  />
                  <Text className="text-center font-Erode_regular dark:text-white">
                    Continuar comprando
                  </Text>
                </View>
                <Text className="text-main-blue dark:text-light-blue">
                  {">"}
                </Text>
              </Pressable>

              <Pressable
                className="flex-row justify-between mt-5 border-b-2 border-main-blue dark:border-light-blue"
                onPress={() => navigation.replace("secondScreen")}
              >
                <View className="flex-row gap-2 mb-1 items-center">
                  <AntDesign
                    name="tago"
                    size={24}
                    color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                  />
                  <Text className="text-center font-Erode_regular dark:text-white">
                    Convertirte en comerciante
                  </Text>
                </View>
                <Text className="text-main-blue dark:text-light-blue">
                  {">"}
                </Text>
              </Pressable>

              <Pressable
                className="flex-row justify-between mt-5 border-b-2 border-main-blue dark:border-light-blue"
                onPress={() =>
                  navigation.navigate(
                    esRepartidor != "" ? "thirdScreen" : "DeliveryFormScreen"
                  )
                }
              >
                <View className="flex-row gap-2 mb-1 items-center">
                  <Ionicons
                    name="bicycle"
                    size={24}
                    color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                  />
                  <Text className="text-center font-Erode_regular dark:text-white">
                    Convertirte en repartidor
                  </Text>
                </View>
                <Text className="text-main-blue dark:text-light-blue">
                  {">"}
                </Text>
              </Pressable>
            </View>

            <View className="w-full mt-10">
              <Pressable
                className="flex-row items-center flex gap-3 mb-4"
                onPress={() => toggleColorScheme()}
              >
                <Feather
                  name={colorScheme === "dark" ? "sun" : "moon"}
                  size={24}
                  color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                />
                <Text className="text-center font-Excon_regular dark:text-white">
                  {colorScheme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                </Text>
              </Pressable>

              <Pressable
                className="flex-row items-center flex gap-3 mb-4"
                onPress={() => navigation.navigate("TerminosCondiciones")}
              >
                <AntDesign
                  name="questioncircleo"
                  size={24}
                  color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                />
                <Text className="dark:text-white font-Excon_regular">Terminos y condiciones</Text>
              </Pressable>
              
              <Pressable
                className="flex-row flex gap-3 items-center"
                onPress={handleLogout}
              >
                <MaterialIcons
                  name="logout"
                  size={24}
                  color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                />
                <Text className="dark:text-white font-Excon_regular">Cerrar Sesión</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}