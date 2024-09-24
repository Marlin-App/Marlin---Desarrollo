import React from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";

export default HomeCarouselItem = ({item}) => {

    const { width } = useWindowDimensions();

    return (
        <View>
            <Image className="object-contain justify-center" source={item.image} />

            <View className="">
            </View>
        </View>
    );

}