import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export function DropDown({options, selectedValue, onValueChange, place, title }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View>
        <View>
      <TouchableOpacity className="flex-row items-center justify-between"
        onPress={() => setModalVisible(true)}
        >
        <Text className="font-Excon_thin dark:text-white">{selectedValue || place} </Text>
        <Text className="font-Excon_thin text-main-blue">{'▼'} </Text>
      </TouchableOpacity>
          </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-col justify-center items-center bg-black/50 ">
          <View className="my-60 bg-white px-5 py-20 rounded-lg  dark:bg-neutral-900">
          <Text className="font-Excon_bold text-xl text-main-blue mb-8 dark:text-light-blue">{title}</Text>
            <FlatList className=""
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity className=" p-2 border-[1px] rounded-xl border-main-blue dark:border-light-blue mb-4"
                  onPress={() => handleSelect(item.value)}
                >
                  <Text className="text-center dark:text-white">{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

