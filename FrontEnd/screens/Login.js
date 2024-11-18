import * as React from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  Alert,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

export function LoginPage({ navigation }) {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordVisible, setpasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisible = () => {
    setpasswordVisible(!passwordVisible);
  };
  // ------------------------------------------------------------------------

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://marlin-backend.vercel.app/api/token/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            username: userName,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Registro exitoso:");
        setIsLoading(false);

        await AsyncStorage.setItem("@userToken", JSON.stringify(data));
        navigation.navigate("Mi perfil");
      } else {
        setError("Nombre de usuario o contraseña incorrectos!");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert(
        "Error",
        "No se pudo completar el registro. Inténtalo de nuevo más tarde."
      );
      setIsLoading(false);
    }
  };
  // ------------------------------------------------------------------------

  return (
    <View className="flex-1  bg-white">
      {isLoading ? (
        <View
          className={`w-full h-full justify-center items-center absolute z-10  `}
        >
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      ) : null}
      <View>
        <Image
          source={require("../assets/img/FondoLogin.png")}
          className="w-full h-64"
          style={{ resizeMode: "stretch", marginBottom: 30 }}
        />
        <Text className="text-[41px] font-Excon_bold  text-white absolute top-[10%] ml-4 mt-6  ">
          ¡Bienvenido de vuelta!{" "}
        </Text>
      </View>

      <View className="px-8">
        <Text className="text-[24px] font-Excon_regular  text-main-blue mt-6">
          Nombre de usuario
        </Text>
        <View className="flex-row items-center border-b-2 border-[#1952BE] mb-4 gap-2 ">
          <Feather name="user" size={18} color="#1952BE" />
          <TextInput
            id="userName"
            className="w-full"
            placeholder="Ej: marlinPescador24"
            placeholderTextColor={"#1877F2"}
            value={userName}
            onChangeText={setUserName}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text className="text-[24px] font-Excon_regular text-main-blue ">
          Contraseña
        </Text>
        <View className="flex-row items-center border-b-2 border-[#1952BE] mb-2 gap-2 relative">
          <Feather name="lock" size={18} color="#1952BE" />
          <TextInput
            id="password"
            className="w-full"
            placeholder="Ej: contraseña123"
            placeholderTextColor={"#1877F2"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
          />
          <TouchableOpacity
            className="absolute right-4 text-[16px] font-Excon_regular text-main-blue opacity-70"
            onPress={togglePasswordVisible}
          >
            <MaterialIcons
              name={passwordVisible ? "visibility" : "visibility-off"}
              size={24}
              color="#1952BE"
            />
          </TouchableOpacity>
        </View>
        <Text className="text-red-500 text-center w-full">{error} </Text>
        <Pressable
          onPress={() => navigation.navigate("RestorePasswordScreen")}
          className="mb-10"
        >
          <Text className="text-right text-main-blue font-Excon_regular mb-1">
            Olvidaste tu contraseña?
          </Text>
        </Pressable>

        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgba(0,0,0,0.2)" : "#1952BE",
            },
            styles.button,
          ]}
        >
          <Text className="text-[16px] font-Excon_bold" style={styles.text}>
            Ingresa a la cuenta
          </Text>
        </Pressable>

        <View className="justify-center items-center w-full my-2">
          <Text className="text-[#3765AE] text-[16px] font-Excon_regular ">
            o
          </Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgba(0,0,0,0.1)" : "white",
              border: "2px solid #3765AE",
              marginBottom: 15,
              paddingVertical: 10,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-[16px] font-Excon_bold text-[#3765AE] ">
            Crea una cuenta
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
