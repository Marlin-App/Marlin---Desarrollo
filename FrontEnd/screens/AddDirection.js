import { Text, View, TextInput, ScrollView, Pressable, Image, TouchableOpacity } from 'react-native';
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from 'react';
import { DropDown } from '../components/DropDown';
import useSelectLocation from '../hooks/useSelectLocation';
import Feather from '@expo/vector-icons/Feather';
import useDirections from '../hooks/useDirection';

export function AddDirectionScreen({ navigation }) {
  const { colorScheme } = useColorScheme();
  const placeholderTextColor = colorScheme === 'dark' ? 'white' : '#60a5fa';
  const { direction, addToDirection } = useDirections(navigation);

  // Datos de la tienda
  const [data, setData] = useState({
    id: 1,
    name: "",
    referencias: "",
    district: "",
    canton: "",
    coodernates: "",
    isSelected: false
  });
  // ------------------------------------------------------------------------

  // Opciones de cantones
  const cantons = [
    { label: 'Puntarenas', value: 'Puntarenas' },
    { label: 'Esparza', value: 'Esparza' },
    { label: 'Montes de Oro', value: 'Montes de Oro' },
  ];
  // ------------------------------------------------------------------------

  // Opciones de distritos
  const getDistrictsByCanton = (canton) => {
    switch (canton) {
      case 'Puntarenas':
        return [
          { label: 'Puntarenas', value: 'Puntarenas' },
          { label: 'Chacarita', value: 'Chacarita' },
          { label: 'El Roble', value: 'El Roble' },
          { label: 'Barranca', value: 'Barranca' },
        ];
      case 'Esparza':
        return [
          { label: 'Espíritu Santo', value: 'Espítiru Santo' },
          { label: 'Macacona', value: 'Macacona' },
          { label: 'San Jerónimo', value: 'San Jerónimo' },
        ];
      case 'Montes de Oro':
        return [
          { label: 'La Unión', value: 'La Unión' },
          { label: 'San Isidro', value: 'San Isidro' },
          { label: 'Miramar', value: 'Miramar' },
        ];
      default:
        return [];
    }
  };
  // ------------------------------------------------------------------------

  const [selectedValue, setSelectedValue] = useState();
  const [selectedValue2, setSelectedValue2] = useState();

  const { location, setModalVisible, LocationPickerComponent, isModalVisible } = useSelectLocation();

  // Función para manejar los cambios en los campos
  const handleInputChange = (name, value) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  // ------------------------------------------------------------------------

  // Función para manejar los cambios de los distritos
  useEffect(() => {
    handleInputChange('district', selectedValue2);
  }, [selectedValue2]);
  // ------------------------------------------------------------------------

  // Función para manejar los cambios de la ubicación
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      id: direction.length + 1,
      isSelected: direction.length === 0,
    }));
  }, [direction]);
  // ------------------------------------------------------------------------

  // Función para manejar los cambios de los cantones
  useEffect(() => {
    handleInputChange('canton', selectedValue);
  }, [selectedValue]);
  // ------------------------------------------------------------------------

  // Función para manejar los cambios de la ubicación
  useEffect(() => {
    handleInputChange('coodernates', location);
  }, [location]);
  // ------------------------------------------------------------------------

  const [districts, setDistricts] = useState([]);

  // Función para manejar los cambios de los distritos
  useEffect(() => {
    setDistricts(getDistrictsByCanton(selectedValue));
  }, [selectedValue]);
  // ------------------------------------------------------------------------

  // Función para manejar el evento de guardar
  const handleSave = async () => {
    addToDirection(data);
  };
  // ------------------------------------------------------------------------

  return (
    <ScrollView className="bg-white dark:bg-neutral-950 px-5">
      <View className="w-full flex-col px-4 py-8">
        <Text className="text-main-blue text-3xl font-Excon_bold dark:text-light-blue">
          ¡Vamos agregar una nueva direccion!!
        </Text>
      </View>

      <View className="flex-col px-5">
        <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">Nombre de la Ubicacion</Text>
        <TextInput
          className="border-b-[0.5px] border-main-blue px-4 my-2 font-Excon_thin dark:text-white"
          onChangeText={(value) => handleInputChange('name', value)}
          placeholder="Dale un nombre a la direccion"
          placeholderTextColor={placeholderTextColor}
        />
      </View>

      <View className="flex-col px-5 mb-4">
        <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">Ubicación</Text>
        <View className="border-[0.5px] px-4 py-2 rounded-lg my-2 dark:border-main-blue">
          <DropDown
            title="Selecciona el cantón donde se ubica tu emprendimiento:"
            active={true}
            place="Cantón"
            options={cantons}
            selectedValue={selectedValue}
            onValueChange={(value) => setSelectedValue(value)}
          />
        </View>

        <View className="border-[0.5px] px-4 py-2 rounded-lg my-2 dark:border-main-blue">
          <DropDown
            title="Selecciona el distrito donde se ubica tu emprendimiento:"
            place="Distrito"
            active={!!selectedValue}
            options={districts}
            selectedValue={selectedValue2}
            onValueChange={(value) => setSelectedValue2(value)}
          />
        </View>

        <View className="flex-row justify-between items-center my-4">
          {location ? (
            <Text className="border-b-[0.5px] w-[70vw] px-4 pb-2 font-Excon_thin dark:border-main-blue dark:text-white">
              {location.latitude.toString().slice(0, 8)},{location.longitude.toString().slice(0, 8)}
            </Text>
          ) : (
            <Text className="border-b-[0.5px] w-[70vw] px-4 pb-2 font-Excon_thin dark:border-main-blue dark:text-white">Coordenadas</Text>
          )}
          <Pressable onPress={() => setModalVisible(true)}>
            <Image className="" source={require('../assets/img/location.png')} />
          </Pressable>
          {isModalVisible && <LocationPickerComponent />}
        </View>
      </View>

      <View className="flex-col px-5">
        <Text className="text-main-blue text-md font-Excon_bold dark:text-light-blue">Referencias</Text>
        <TextInput
          className="border-[0.5px] border-main-blue px-4 my-2 font-Excon_thin dark:text-white"
          multiline
          numberOfLines={4}
          maxLength={120}
          placeholderTextColor={placeholderTextColor}
          placeholder="Brinda direcciones, calles, avenidas o puntos de referencia para que tu negocio pueda ser ubicado."
          onChangeText={(value) => handleInputChange('referencias', value)}
        />
      </View>

      <TouchableOpacity
        className={`bg-main-blue py-4 my-6 rounded-lg flex-row items-center justify-center mx-2`}
        onPress={handleSave}
      >
        <Feather name="check" size={24} color="white" />
        <Text className="text-white font-Excon_bold text-lg ">Agregar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}