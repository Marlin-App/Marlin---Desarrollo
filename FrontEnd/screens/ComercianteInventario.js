import { Text, View, FlatList, Animated, Pressable, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { useColorScheme } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState, useEffect, useRef } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import useCRUDProductos from '../hooks/useCRUDProductos';
import NotificationDropdown from '../components/NotificationDropdown';
import noContent from '../assets/box.png';

export function ComercianteInventario({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const { deleteProduct, fetchStoresWithProducts, storesWithProducts } = useCRUDProductos();
    const [longPressProduct, setLongPressProduct] = useState(null);
    const { colorScheme } = useColorScheme();
    const scrollViewRef = useRef(null);
    const screenWidth = Dimensions.get('window').width;
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentPage, setCurrentPage] = useState(0);

    // llama a la función fetchStoresWithProducts al montarse el componente
    useEffect(() => {
        const fetchStores = async () => {
            await fetchStoresWithProducts();
        };
        const focusListener = navigation.addListener('focus', fetchStores);
    }, [navigation]);
    // ------------------------------------------------------------------------

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [notifications, setNotifications] = useState([
        // aqui va la lista de notificaciones
    ]);

    // Función para manejar el clic en una notificación
    const handleNotificationClick = (notificationId) => {
        setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== notificationId));
    };
    // ------------------------------------------------------------------------

    // Función para manejar el clic en el icono de notificaciones
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };
    // ------------------------------------------------------------------------

    //cierra el dropdown de notificaciones
    const closeDropdown = () => {
        setIsDropdownVisible(false);
    };
    // ------------------------------------------------------------------------

    // Función para manejar el clic largo en un producto
    const longpress = (id) => {
        setLongPressProduct(id);
        setModalVisible(true);
    }
    // ------------------------------------------------------------------------

    // Función para manejar el scroll
    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const pageIndex = Math.round(contentOffsetX / screenWidth);
        setCurrentPage(pageIndex);
    };
    // ------------------------------------------------------------------------

    return (
        <View className="bg-white dark:bg-neutral-950 h-full">
            <NotificationDropdown
                notifications={notifications}
                isDropdownVisible={isDropdownVisible}
                toggleDropdown={toggleDropdown}
                closeDropdown={closeDropdown}
                onNotificationClick={handleNotificationClick}
            />
            <View className="w-full flex-col px-4 bg-main-blue dark:bg-dk-tab py-8 ">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white text-2xl font-Excon_bold w-[80vw] dark:text-light-blue">
                            ¡Rellená tu inventario con más mercadería!
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-center gap-x-4 mr-2">
                        <TouchableOpacity onPress={toggleDropdown}>
                            <Ionicons name="notifications-outline" size={24} color={colorScheme === 'dark' ? "#5186EC" : "white"} />
                            {notifications.length > 0 && (
                                <View className="absolute top-[-2px] right-[-2px] w-2 h-2 bg-red-600 rounded-full" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Text className="text-2xl text-main-blue font-Excon_bold mt-4 ml-4 dark:text-white">Productos de tus tiendas</Text>
            <Animated.ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false, listener: handleScroll }
                )}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
            >
                {storesWithProducts.map((store, storeIndex) => (
                    <View key={storeIndex} style={{ width: screenWidth }} className="flex-col p-4">
                        <Text className="text-lg text-main-blue font-Excon_bold">{store.name}</Text>
                        <Text className="text-md font-Excon_thin text-main-blue dark:text-light-blue">
                            {store.canton}, {store.district}
                        </Text>
                        <View className="flex-col">
                            <View className="items-end mb-4">
                                <Pressable
                                    className="border-main-blue border-[1.5px] rounded-full w-7 h-7 justify-center items-center"
                                    onPress={() => store.status === 'Aceptado' ? navigation.navigate("AgregarProducto", { store: store.id }) : alert(`${store.name} esta siendo validada por nuestro equipo, pronto estará disponible para añadir productos.`)}
                                >
                                    <Ionicons name="add" size={24} color="#015DEC" />
                                </Pressable>
                            </View>
                            <View className="border-[0.5px] border-main-blue rounded-lg px-4 py-2 dark:border-light-blue">
                                {store.items.length > 0 ? (
                                    <FlatList
                                        className="h-[40vh]"
                                        data={store.items}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => (
                                            <Pressable
                                                key={index}
                                                className="flex-col justify-center mb-1 "
                                                onPress={() => navigation.navigate("EditarProducto", { store: store.id, product: item.id })}
                                                onLongPress={() => longpress(item.id)}
                                            >
                                                <View className="flex-row justify-between mt-2 px-4 py-4 border-[0.5px] border-main-blue w-full items-center rounded-md dark:bg-dk-main-bg dark:border-light-blue">
                                                    <View className="flex-row w-[95%] max-w-full">
                                                        <View className="justify-center items-center">
                                                            <Image
                                                                className="rounded-lg"
                                                                source={{ uri: item.item_images.length > 0 ? item.item_images[0].picture : 'https://via.placeholder.com/150', }}
                                                                style={{ width: 100, height: 100 }}
                                                            />
                                                        </View>
                                                        <View className="px-6 flex-shrink">
                                                            <Text className="font-Excon_bold text-sm dark:text-white">{item.name}</Text>
                                                            <Text className="font-Excon_thin text-sm dark:text-white" numberOfLines={3}>
                                                                {item.description}
                                                            </Text>
                                                            <View className="justify-between flex-row">
                                                                <Text className="font-Excon_thin text-sm dark:text-white">₡{item.price}  </Text>
                                                                <Text className="font-Excon_bold text-sm dark:text-white">
                                                                    Inventario: <Text className="font-Excon_thin text-sm">{item.stock}</Text>
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View className="flex-col gap-y-1 h-full items-center">
                                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px]"></View>
                                                    </View>
                                                </View>
                                            </Pressable>
                                        )}
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={{ paddingBottom: 20 }}
                                    />
                                ) : (
                                    <View className="flex-col justify-center mb-1 items-center">
                                        <Image className="m-4" source={noContent} style={{ width: 150, height: 150 }} />
                                        <Text className="text-lg text-main-blue font-Excon_bold">No hay productos disponibles.</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>
            <View className="flex-row justify-center mt-4">
                {storesWithProducts.map((_, index) => {
                    // Animación del tamaño del punto
                    const dotWidth = scrollX.interpolate({
                        inputRange: [
                            (index - 1) * screenWidth,
                            index * screenWidth,
                            (index + 1) * screenWidth,
                        ],
                        outputRange: [8, 16, 8],
                        extrapolate: 'clamp',
                    });

                    const dotOpacity = scrollX.interpolate({
                        inputRange: [
                            (index - 1) * screenWidth,
                            index * screenWidth,
                            (index + 1) * screenWidth,
                        ],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            className="mb-4"
                            key={index}
                            style={{
                                width: dotWidth,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: '#015DEC',
                                marginHorizontal: 4,
                                opacity: dotOpacity,
                            }}
                        />
                    );
                })}
            </View>
            {modalVisible && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View className="flex-1 justify-center items-center">
                        <View className="bg-white border-[1.5px]  rounded-lg p-6 shadow-lg w-[80vw]">
                            <View className="justify-center items-center">
                                <AntDesign name="warning" size={70} color="black" />
                                <Text className="text-lg text-main-blue font-Excon_bold mb-4">¿Deseas eliminar este producto?</Text>
                            </View>
                            <View className="flex-row justify-between">
                                <TouchableOpacity
                                    className="border-[0.5px] border-main-blue rounded-lg px-4 py-2 "
                                    onPress={() => {
                                        deleteProduct(longPressProduct);
                                        setLongPressProduct(null);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text className="text-main-blue font-Excon_regular">Eliminar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="bg-main-blue rounded-lg px-4 py-2"
                                    onPress={() => {
                                        setLongPressProduct(null)
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text className="text-white font-Excon_regular">Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>)}
        </View>
    );
}