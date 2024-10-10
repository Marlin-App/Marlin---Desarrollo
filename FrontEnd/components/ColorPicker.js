import { Pressable, View, Animated, StyleSheet, PanResponder, Text } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';

export function ColorPicker({ color, handleChange }) {

    const [position, setPosition] = useState(0);
    const [hslvalue, setHslvalue] = useState(0);
    const sliderWidth = 200; // Ajusta el ancho del slider como necesites
    const pan = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                // Calcula la nueva posición dentro de los límites del slider
                let newX = Math.max(0, Math.min(gestureState.dx + position, sliderWidth));
                pan.setValue(newX);
            },
            onPanResponderRelease: (event, gestureState) => {
                // Actualiza la posición final
                let newX = Math.max(0, Math.min(gestureState.dx + position, sliderWidth));
                setPosition(newX);
            },
        })
    ).current;

    return (
        <View className="justify-center items-center">

            <View className="justify-center items-center">
                <View className="border-2 rounded-full w-10 h-10 mb-5" />
                <View className="bg-[#767577] h-[8px] w-[30vw] relative rounded-sm w-[30vw]">
                    <Animated.View className="bg-main-blue h-[20px] w-[20px] rounded-full absolute top-[-6]"
                        {...panResponder.panHandlers}
                        style={[
                            {
                                transform: [{ translateX: pan }],
                            },
                        ]}
                    />
                </View>
            </View>

        </View>
    );
}