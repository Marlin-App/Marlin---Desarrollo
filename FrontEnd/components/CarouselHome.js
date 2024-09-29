import React from "react";
import { View, Text, FlatList, Animated } from "react-native";
import CarouselInfo from "../hooks/useCarousel";
import HomeCarouselItem from "./HomeCarouselItem";
import { useRef, useState, useEffect } from "react";


export default CarouselHome = ({navigation}) => {

    const scrollX = useRef(new Animated.Value(0)).current;
    const CarouselInfoRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % CarouselInfo.length; 
                console.log(nextIndex);
                CarouselInfoRef.current.scrollToIndex({ index: nextIndex, animated: true });
                return nextIndex;
            });
        }, 8000); // Cambia el tiempo según tus necesidades

        return () => clearInterval(interval);
    }, [CarouselInfo.length]);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        // Maneja el cambio de elementos visibles si es necesario
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <View>
            <FlatList
                data={CarouselInfo}
                renderItem={({ item }) => <HomeCarouselItem item={item} navigation={navigation} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false
                })}
                scrollEventThrottle={32}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={CarouselInfoRef}
            />
        </View>
    );
};
