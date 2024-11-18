import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable, Modal } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Feather } from '@expo/vector-icons'; // Usa feather como iconos
import useDirections from '../hooks/useDirection';

export function DirectionScreen({ navigation }) {
  const { direction, reLoadDirections, replaceDirection, removeDirection } = useDirections(navigation);
  const [modalVisible, setModalVisible] = useState(false);
  const [delet, setDelete] = useState();
  const [edit, setEdit] = useState(false);
  // Cargar las direcciones
  useEffect(() => {
    const fetchStores = async () => {
      await reLoadDirections();
    };
    const focusListener = navigation.addListener('focus', fetchStores);
  }, [navigation]);
  // ------------------------------------------------------------------------

  return (
    <View className="flex-1 bg-white dark:bg-black py-4 px-8">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg p-6 shadow-lg w-[80vw] dark:bg-dk-main-bg">
            <View className="justify-center items-center">
              <View className="border-b-[0.5px] dark:border-light-blue w-full mb-4">
                <Text className="text-lg text-center font-Excon_bold mb-2 dark:text-white">¡Desea liminar esta dirección!</Text>
              </View>

            </View>
            <View className="flex-row justify-center">
              <TouchableOpacity
                className="bg-main-blue dark:bg-light-blue rounded-lg px-4 py-2"
                onPress={() => {
                  setModalVisible(false);
                  removeDirection(delet);
                }}
              >
                <Text className="text-white font-Excon_regular">Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Text className="text-xl font-Excon_bold mb-6 text-center dark:text-main-blue">Mis Direcciones</Text>

      <ScrollView className="space-y-4"
        showsVerticalScrollIndicator={false}
      >
        {
          direction.map((item, index) =>
            <Pressable key={index} className="flex flex-row border-b-2 pb-2 justify-between border-light-blue dark:border-main-blue"
              onPress={() => {
                !edit ?
                  replaceDirection(index, item) : navigation.navigate('AddDirectionScreen', { item: item })
                setEdit(false)

              }

              }
              /* onLongPress={() => removeDirection(item.id)} */
              onLongPress={() => {
                setDelete(item.id)
                setModalVisible(!modalVisible)
              }}
            >
              <View className="flex-row justify-between w-full items-center">
                <View className="flex-row items-center">
                  <Feather name="map-pin" size={24} color="#015DEC" />
                  <View className="ml-4 ">
                    <Text className="font-Erode_regular text-base dark:text-white">{item.name} </Text>
                    <Text className="font-Erode_regular dark:text-white">{item.referencias} </Text>
                  </View>
                </View>
                {item.isSelected && !edit ? (

                  <Feather name="check" size={24} color="#015DEC" />
                ) : null

                }
              </View>
            </Pressable>
          )
        }


        {direction.length > 0 ? (null) : (
          <View className="flex-1 h-full items-center justify-center">
            <Text className="text-lg font-Excon_bold text-center dark:text-main-blue">No existen direcciones registradas</Text>
          </View>
        )}

        {!edit ? (null) : (
          <View className="flex-1 h-full items-center justify-center">
            <Text className="font-Excon_bold text-center text-red-400 dark:text-main-blue">Selecciona la dirección que deseas editar</Text>
          </View>
        )}
      </ScrollView>
      <View className="flex-row  items-center justify-center gap-2 h-10">
        <TouchableOpacity className="bg-main-blue  mt-6 h-full rounded-lg px-4 flex-row items-center justify-center"
          onPress={() => {
            navigation.navigate('AddDirectionScreen')
            setEdit(false)
          }}
        >
          <MaterialCommunityIcons name="map-marker-plus-outline" size={30} color="white" />
          <Text className="text-white font-bold ml-2">Agregar dirección</Text>
        </TouchableOpacity>
        <Pressable className={`bg-main-blue mt-6 rounded-lg flex-row px-4 h-full items-center justify-center ${edit ? 'opacity-80' : 'opacity-100'}`}
          onPress={() => setEdit(!edit)}
        >
          <MaterialCommunityIcons name="view-dashboard-edit-outline" size={24} color="white" />
          <Text className="text-white font-bold ml-2">Editar dirección</Text>
        </Pressable>

      </View>
    </View>
  );
};