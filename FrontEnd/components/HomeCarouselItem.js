import React from "react";
import { View, Text, Image, useWindowDimensions, TouchableOpacity } from "react-native";

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

      <View className="absolute flex items-center m-auto top-0 bottom-3 left-0 right-0">
        <Text className="text-white text-[7vw] font-bold text-center mt-[5vw]">{item.title}</Text>
        <Text className="text-white text-[4vw] leading-5 mx-5 text-center">{item.description}</Text>
        <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded mt-[1vh]"
          onPress={() => navigation.navigate('Tiendas', item)}
        >
          <Text className="text-white text-[4vw] font-semibold">Pescalo !!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeCarouselItem;