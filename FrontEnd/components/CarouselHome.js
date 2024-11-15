import React, { useRef, useState, useEffect } from "react";
import { View, FlatList, Animated, StyleSheet, Dimensions } from "react-native";
import CarouselInfo from "../hooks/useCarousel";
import HomeCarouselItem from "./HomeCarouselItem";

const { width } = Dimensions.get('window');

export default CarouselHome = ({ navigation }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const CarouselInfoRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Autoplay hace que el carrusel se mueva de forma automática
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % CarouselInfo.length;
                CarouselInfoRef.current.scrollToIndex({ index: nextIndex, animated: true });
                return nextIndex;
            });
        }, 8000);

        return () => clearInterval(interval);
    }, [CarouselInfo.length]);
    // ------------------------------------------------------------------------

    // Para que el carrusel se mueva de forma automática al hacer scroll
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;
    // ------------------------------------------------------------------------

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    // hace un seguido del carrusel
    const onMomentumScrollEnd = (event) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(newIndex);
    };
    // ------------------------------------------------------------------------

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
                onMomentumScrollEnd={onMomentumScrollEnd}
            />
            <View style={styles.dotContainer}>
                {CarouselInfo.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index ? styles.dotActive : styles.dotInactive
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 8,
        width: '100%',
    },
    dot: {
        height: 3,
        width: 9,
        borderRadius: 5,
        marginHorizontal: 4,
    },
    dotActive: {
        backgroundColor: '#fff',
    },
    dotInactive: {
        backgroundColor: '#ccc',
        opacity: 0.5,
    },
});