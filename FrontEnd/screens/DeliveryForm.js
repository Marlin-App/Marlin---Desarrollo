import { useEffect, useState } from "react";
import {
    Button,
    Image,
    View,
    Text,
    Pressable,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useColorScheme } from "nativewind";
import { DropDown } from "../components/DropDown";
import Feather from "@expo/vector-icons/Feather";
import useGetUser from "../hooks/useGetUser";

export function DeliveryFormScreen({ navigation }) {
    const [image, setImage] = useState(null);
    const { colorScheme } = useColorScheme();
    const placeholderTextColor = colorScheme === "dark" ? "white" : "#60a5fa";

    const cantones = [
        { label: "Puntarenas", value: "Puntarenas" },
        { label: "Esparza", value: "Esparza" },
        { label: "Miramar", value: "Miramar" },
    ];

    const [acceptedTerms, setAcceptedTerms] = useState(false);

    // const [selectedCategoryIds, setSelectedCategoryIds] = useState(formData.store_type);
    // const [selectedValue, setSelectedValue] = useState(formData.canton);
    // const [selectedValue2, setSelectedValue2] = useState(formData.district);
    // const { location, openLocationPicker, LocationPickerComponent } = useSelectLocation();
    // const [imagePerfil, setimagePerfil] = useState(formData.picture);
    // const [imagePortada, setimagePortada] = useState(formData.banner);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
    });

    const [imagePerfil, setimagePerfil] = useState(formData.picture);

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const [time, setTime] = useState("");

    const handleTimeChange = (text) => {
        // Remover cualquier carácter que no sea un número
        const cleaned = text.replace(/[^0-9]/g, "");

        // Formatear la entrada como HH:MM
        let formatted = cleaned;
        if (cleaned.length >= 3) {
            formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
        } else if (cleaned.length >= 1) {
            formatted = `${cleaned.slice(0, 2)}`;
        }

        setTime(formatted);
    };

    return (
        <View>
            <View className="h-full bg-white dark:bg-neutral-950">
                <ScrollView
                    className="w-full "
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 80 }}
                >
                    <Text className="font-Excon_regular mt-4 text-main-blue dark:text-white text-[24px] text-center">
                        Formulario de inscripción para repartidor
                    </Text>

                    <View className="mt-4 items-center p-4 ">
                        <Pressable
                            className="mt-1 h-44 w-44 bg-[#C4C4C4]  p-1 rounded-full relative"
                            onPress={pickImage}
                        >
                            <View className="absolute h-14 w-14 rounded-full bg-[#D9D9D9] dark:bg-dk-main-bg bottom-0 right-0 items-center justify-center">
                                <Feather name="camera" size={28} color="#015DEC" />
                            </View>
                        </Pressable>
                        <Text className="font-Excon_regular mt-4 text-main-blue dark:text-[#c2c2c2] text-[11px] text-center">
                            Ingresa una foto clara de tu rostro para tu perfil
                        </Text>
                        <Text className="font-Excon_regular text-main-blue dark:text-white text-[20px] w-full  mt-8">
                            Datos personales
                        </Text>

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-4">
                            Nombre:
                        </Text>
                        <TextInput
                            className="w-full border-[0.5px] border-light-blue dark:text-white dark:border-main-blue mt-2 rounded-md px-2"
                            value={formData.firstName}
                            onChangeText={(value) => handleInputChange("firstName", value)}
                            placeholder="Digita tu nombre"
                            placeholderTextColor={placeholderTextColor}
                        />

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-3">
                            Apellidos:
                        </Text>
                        <TextInput
                            className="w-full border-[0.5px] border-light-blue dark:text-white dark:border-main-blue mt-2 rounded-md px-2"
                            placeholderTextColor={placeholderTextColor}
                            placeholder="Digita tus apellidos"
                        />

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-3">
                            Número de teléfono:
                        </Text>
                        <TextInput
                            className="w-full border-[0.5px] border-light-blue dark:text-white dark:border-main-blue mt-2 rounded-md px-2 py-1"
                            placeholderTextColor={placeholderTextColor}
                            keyboardType="numeric"
                            placeholder="Digita tu número de teléfono"
                        />

                        <Text className="font-Excon_regular text-main-blue dark:text-white text-[20px] w-full  mt-8">
                            Datos del vehículo
                        </Text>

                        <Text className="font-Erode_regular text-main-blue dark:text-white text-[15px] w-full  mt-3">
                            Cédula de identidad:
                        </Text>
                        <View className=" my-2 font-Excon_thin w-full">
                            <Pressable
                                className="justify-center items-center"
                                onPress={() => pickImage("perfil")}
                            >
                                {imagePerfil ? (
                                    <Image
                                        className="rounded-full w-52 h-52"
                                        source={{ uri: imagePerfil }}
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
                            Licencia de conducir:
                        </Text>
                        <View className=" my-2 font-Excon_thin w-full">
                            <Pressable
                                className="justify-center items-center"
                                onPress={() => pickImage("perfil")}
                            >
                                {imagePerfil ? (
                                    <Image
                                        className="rounded-full w-52 h-52"
                                        source={{ uri: imagePerfil }}
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
                            {/* corregir la ruta para mostrar los terminos y condiciones */}
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
                            onPress={() => navigation.replace("thirdScreen")}
                        >
                            <Text className="text-white font-bold ml-2">Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
