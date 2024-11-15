import { useState } from "react";
import { Image, View, Text, Alert, Pressable, TextInput, ScrollView, TouchableOpacity } from "react-native";
import useGetDeliveryForm from "../hooks/useGetDeliveryForm";
import * as ImagePicker from "expo-image-picker";
import { useColorScheme } from "nativewind";
import { DropDown } from "../components/DropDown";
import Feather from "@expo/vector-icons/Feather";

export function DeliveryFormScreen({ navigation }) {
    const { colorScheme } = useColorScheme();
    const placeholderTextColor = colorScheme === "dark" ? "white" : "#60a5fa";
    const { handleDeliveryForm } = useGetDeliveryForm(navigation);

    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        plate: "",
    });

    const [imageDelivery, setimageDelivery] = useState(null);
    const [imageVehicle, setimageVehicle] = useState(null);
    const [imageLicense, setimageLicense] = useState(null);
    const [imageIDFront, setimageIDFront] = useState(null);
    const [imageIDBack, setimageIDBack] = useState(null);

    const allPictures = [
        { uri: imageDelivery },
        { uri: imageVehicle },
        { uri: imageLicense },
        { uri: imageIDFront },
        { uri: imageIDBack },
    ];

    // Función para manejar el cambio en los campos del formulario
    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };
    // ------------------------------------------------------------------------

    const [selectedValue, setSelectedValue] = useState(formData.TipoVehículo);

    // Opciones de vehículos
    const tipoVehículo = [
        { label: "Carga Liviana", value: "Carga Liviana" },
        { label: "Liviano", value: "Liviano" },
        { label: "Bicicleta", value: "Bicicleta" },
        { label: "Motocicleta", value: "Motocicleta" },
    ];
    // ------------------------------------------------------------------------

    // Opciones para la imagen
    const pickImage = async (pic) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            switch (pic) {
                case "perfil":
                    setimageDelivery(result.assets[0].uri);
                    break;
                case "licencia":
                    setimageLicense(result.assets[0].uri);
                    break;
                case "cedulaDelante":
                    setimageIDFront(result.assets[0].uri);
                    break;
                case "cedulaDetras":
                    setimageIDBack(result.assets[0].uri);
                    break;
                case "vehiculo":
                    setimageVehicle(result.assets[0].uri);
                    break;
                default:
                    console.warn("Tipo de imagen no soportado");
            }
        }
    };
    // ------------------------------------------------------------------------

    // Función para manejar el envío del formulario
    const deliveryRequest = () => {
        if (
            formData.brand &&
            formData.model &&
            formData.plate &&
            acceptedTerms &&
            imageDelivery &&
            imageLicense &&
            imageIDFront &&
            imageIDBack &&
            imageVehicle
        ) {
            const newRequest = {
                brand: formData.brand,
                model: formData.model,
                plate: formData.plate,
                pictures: allPictures,
                vehicle: selectedValue,
            };

            handleDeliveryForm(newRequest);
        } else {

            Alert.alert(
                "Formulario incompleto",
                "Por favor, completa todos los campos obligatorios."
            );
        }
    };
    // ------------------------------------------------------------------------

    return (
        <View>
            <View className="h-full bg-white dark:bg-neutral-950">
                <ScrollView
                    className="w-full "
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 80 }}
                >
                    <Text className="font-Excon_regular mt-4 text-main-blue dark:text-white text-[24px] text-center">
                        Formulario de inscripción para covertirte en repartidor
                    </Text>

                    <View className="mt-4 items-center p-4 ">
                        <Pressable
                            className="mt-1 h-44 w-44 bg-[#C4C4C4]  rounded-full relative"
                            onPress={() => pickImage("perfil")}
                        >
                            {imageDelivery ? (
                                <Image
                                    className="rounded-full w-44 h-44"
                                    source={{ uri: imageDelivery }}
                                />
                            ) : (
                                <View className="absolute h-14 w-14 rounded-full bg-[#D9D9D9] dark:bg-dk-main-bg bottom-0 right-0 items-center justify-center">
                                    <Feather name="camera" size={28} color="#015DEC" />
                                </View>
                            )}
                            <View className="absolute h-14 w-14 rounded-full bg-[#D9D9D9] dark:bg-dk-main-bg bottom-0 right-0 items-center justify-center">
                                <Feather name="camera" size={28} color="#015DEC" />
                            </View>
                        </Pressable>

                        <Text className="font-Excon_regular mt-4 text-main-blue dark:text-[#c2c2c2] text-[11px] text-center">
                            Ingresa una foto clara de tu rostro para tu perfil
                        </Text>

                        <Text className="font-Excon_regular text-main-blue dark:text-white text-[20px] w-full  mt-8">
                            Datos del vehículo
                        </Text>

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-4">
                            Marca del vehículo:
                        </Text>

                        <TextInput
                            className="w-full border-[0.5px] border-light-blue dark:text-white dark:border-main-blue mt-2 rounded-md px-2 py-1"
                            value={formData.brand}
                            onChangeText={(value) => handleInputChange('brand', value)}
                            placeholder="Digita la marca de tu vehículo"
                            placeholderTextColor={placeholderTextColor}
                        />

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-3">
                            Tipo de vehículo:
                        </Text>

                        <View className="w-full border-[0.5px] border-light-blue dark:text-white dark:border-main-blue mt-2 rounded-md px-2 py-[9px]">
                            <DropDown
                                title="Selecciona el tipo de vehículo que conduces para realizar entregas:"
                                active={true}
                                placeholderTextColor={placeholderTextColor}
                                place="Selecciona el tipo de vehículo"
                                options={tipoVehículo}
                                selectedValue={selectedValue}
                                onValueChange={(value) => setSelectedValue(value)}
                            />
                        </View>

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-3">
                            Modelo del vehículo:
                        </Text>

                        <TextInput
                            className="w-full border-[0.5px] border-light-blue dark:text-white dark:border-main-blue mt-2 rounded-md px-2 py-1"
                            placeholderTextColor={placeholderTextColor}
                            value={formData.model}
                            onChangeText={(value) => handleInputChange('model', value)}
                            placeholder="Digita el modelo de tu vehículo"
                        />

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-3">
                            Placa del vehículo:
                        </Text>

                        <TextInput
                            className="w-full border-[0.5px] border-light-blue dark:text-white dark:border-main-blue mt-2 rounded-md px-2 py-1"
                            placeholderTextColor={placeholderTextColor}
                            value={formData.plate}
                            keyboardType="numeric"
                            onChangeText={(value) => handleInputChange('plate', value)}
                            placeholder="Digita la placa de tu vehículo"
                        />

                        <Text className="font-Excon_regular text-main-blue dark:text-white text-[20px] w-full  mt-8">
                            Imagenes:
                        </Text>

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-3">
                            Fotos del vehículo:
                        </Text>

                        <View className=" my-2 font-Excon_thin w-full">
                            <Pressable
                                className="justify-center items-center"
                                onPress={() => pickImage("vehiculo")}
                            >
                                {imageVehicle ? (
                                    <Image
                                        className="rounded-lg w-full h-32"
                                        source={{ uri: imageVehicle }}
                                    />
                                ) : (
                                    <View className="Justify-center items-center py-4 border-[0.5px] border-main-blue rounded-xl w-full">
                                        <Feather
                                            name="upload"
                                            size={24}
                                            color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                                        />
                                        <Text className="text-main-blue text-md font-Excon_thin dark:text-light-blue">
                                            Haz click para subir una imagen
                                        </Text>
                                    </View>
                                )}
                            </Pressable>
                        </View>

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-3">
                            Foto de la cédula de identidad por delante:
                        </Text>

                        <View className=" my-2 font-Excon_thin w-full">
                            <Pressable
                                className="justify-center items-center"
                                onPress={() => pickImage("cedulaDelante")}
                            >
                                {imageIDFront ? (
                                    <Image
                                        className="rounded-lg w-full h-32"
                                        source={{ uri: imageIDFront }}
                                    />
                                ) : (
                                    <View className="Justify-center items-center py-4 border-[0.5px] border-main-blue rounded-xl w-full">
                                        <Feather
                                            name="upload"
                                            size={24}
                                            color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                                        />
                                        <Text className="text-main-blue text-md font-Excon_thin dark:text-light-blue">
                                            Haz click para subir una imagen
                                        </Text>
                                    </View>
                                )}
                            </Pressable>
                        </View>

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-3">
                            Foto de la cédula de identidad por detras:
                        </Text>

                        <View className=" my-2 font-Excon_thin w-full">
                            <Pressable
                                className="justify-center items-center"
                                onPress={() => pickImage("cedulaDetras")}
                            >
                                {imageIDBack ? (
                                    <Image
                                        className="rounded-lg w-full h-32"
                                        source={{ uri: imageIDBack }}
                                    />
                                ) : (
                                    <View className="Justify-center items-center py-4 border-[0.5px] border-main-blue rounded-xl w-full">
                                        <Feather
                                            name="upload"
                                            size={24}
                                            color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                                        />
                                        <Text className="text-main-blue text-md font-Excon_thin dark:text-light-blue">
                                            Haz click para subir una imagen
                                        </Text>
                                    </View>
                                )}
                            </Pressable>
                        </View>

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-3">
                            Foto de la licencia de conducir:
                        </Text>

                        <View className=" my-2 font-Excon_thin w-full">
                            <Pressable
                                className="justify-center items-center"
                                onPress={() => pickImage("licencia")}
                            >
                                {imageLicense ? (
                                    <Image
                                        className="rounded-lg w-full h-32"
                                        source={{ uri: imageLicense }}
                                    />
                                ) : (
                                    <View className="Justify-center items-center py-4 border-[0.5px] border-main-blue rounded-xl w-full">
                                        <Feather
                                            name="upload"
                                            size={24}
                                            color={colorScheme === "dark" ? "#60a5fa" : "#015DEC"}
                                        />
                                        <Text className="text-main-blue text-md font-Excon_thin dark:text-light-blue">
                                            Haz click para subir una imagen
                                        </Text>
                                    </View>
                                )}
                            </Pressable>
                        </View>

                        <View className="flex-row w-full ml-2 mt-4 items-center">
                            <TouchableOpacity
                                onPress={() => setAcceptedTerms(!acceptedTerms)}
                            >
                                <View
                                    className={`w-6 h-6 border-2 border-main-blue ${acceptedTerms ? "bg-main-blue" : "bg-white"
                                        }`}
                                />
                            </TouchableOpacity>
                            <Text className="ml-2 text-main-blue text-xs font-Excon_thin">
                                He leído y acepto los{" "}
                                <Text
                                    onPress={() => navigation.navigate("TerminosCondiciones")}
                                    className="text-main-blue text-xs font-Excon_bold"
                                >
                                    términos y condiciones
                                </Text>{" "}
                            </Text>
                        </View>

                        <TouchableOpacity
                            className="bg-main-blue p-4 mt-6 rounded-lg w-full items-center justify-center"
                            onPress={deliveryRequest}
                        >
                            <Text className="text-white font-bold ml-2">
                                Enviar solicitud
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}