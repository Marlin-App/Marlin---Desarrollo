import {
    Button,
    Image,
    View,
    Text,
    Pressable,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { useColorScheme } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useCallback, useState } from "react";

export function ExpressScreen(navigate) {
    const { colorScheme } = useColorScheme();

    return (
        <View className="flex-1 bg-white dark:bg-neutral-950">
            <View className="w-full flex-col px-4 bg-main-blue dark:bg-dk-main-bg py-8">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white dark:text-light-blue text-2xl font-Excon_bold w-[80vw]">
                            ¡Bienvenido a Marlin, aqui puedes ver los pedidos!
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-center gap-x-4 mr-2">
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color={colorScheme === "dark" ? "#5186EC" : "white"}
                        />
                    </View>
                </View>
            </View>

            <View className="">

            </View>
        </View>
    );
}
