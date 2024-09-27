import React from "react";
import { View, Text, Image, useWindowDimensions, TouchableOpacity, StyleSheet } from "react-native";

const HomeCarouselItem = ({ item }) => {
  const { width, height } = useWindowDimensions();

  return (
    <View className="relative" style={{ width, height: height / 3.5 }}>
      <Image
        className="w-full h-full object-cover"
        source={ item.image }
        style={{ width, height: height / 3.5 }}
      />

      <View style={styles.overlay} />

      <View className="absolute flex items-center justify-center"
        style={{ inset: 0 }}>
        <Text className="text-white text-3xl font-bold text-center">{item.title}</Text>
        <Text className="text-white text-lg mx-4 text-center pb-6">{item.description}</Text>
      </View>

      <View className="absolute bottom-4 w-full flex items-center">
        <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded">
          <Text className="text-white text-lg font-semibold">Pescalo !!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export default HomeCarouselItem;
