import React from "react";
import { View, Text, Image, useWindowDimensions, TouchableOpacity, StyleSheet } from "react-native";

const HomeCarouselItem = ({ item, navigation }) => {
  const { width, height } = useWindowDimensions();
 

  return (
    <View className="relative" style={{ width, height: height / 3.5 }}>
      <View className="bg-black">
        <Image
          className="w-full h-full object-cover opacity-50"
          source={item.image}
          style={{ width, height: height / 3.5 }}
        />
      </View>
      {/* <View style={styles.overlay} className="items-center justify-center"/> */}

      <View className="absolute flex items-center m-auto top-4 bottom-0 left-0 right-0">
        <Text className="text-white text-3xl font-bold text-center">{item.title}</Text>
        <Text className="text-white text-base leading-5 mx-6 text-center pb-6">{item.description}</Text>
      </View>

      <View className="absolute bottom-4 w-full flex items-center">
        <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded"
        onPress={() => navigation.navigate('Tiendas', item )} 
        >
          <Text className="text-white text-lg font-semibold">Pescalo !!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
   width: '100%',
   height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export default HomeCarouselItem;
