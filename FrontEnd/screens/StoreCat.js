import { React, useState, useEffect, useRef } from 'react';
import { Text, View, FlatList, TextInput, SectionList, Pressable, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useColorScheme } from "nativewind";
import useStoreType from '../hooks/useStoreType';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRoute } from '@react-navigation/native';
import NotificationDropdown from '../components/NotificationDropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import useCart from '../hooks/useCart';

export function StoreCat({ navigation }) {
    const { allCategories, allStores, loading } = useStoreType();
    const [categoryId, setCategoryId] = useState(null);
    const [storeSelected, setStoreSelected] = useState([]);
    const [search, setSearch] = useState('');
    const [originalStoreSelected, setOriginalStoreSelected] = useState([]);
    const { colorScheme } = useColorScheme();
    const placeholderTextColor = colorScheme === 'dark' ? 'white' : '#60a5fa';
    const [isLogged, setIsLogged] = useState(null);
    const isFocused = useIsFocused();
    const logo = colorScheme === 'dark' ? require('../assets/logoDark.png') : require('../assets/LogoLight.png');

    const {
        cart,
        cartLength,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        addToCart,
        total,
    } = useCart();

    const scrollToTopButtonRef = useRef(null);
    const listRef = useRef(null);

    // Función para verificar el estado de inicio de sesión
    useEffect(() => {
        const fetchUserToken = async () => {
            const token = await AsyncStorage.getItem('@userToken');
            setIsLogged(token);
        };
        fetchUserToken();
    }, [navigation, isFocused]);
    // ------------------------------------------------------------------------

    const route = useRoute();

    const id = route.params ? route.params.id : null;

    // Estados para la notificación
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [notifications, setNotifications] = useState([
        // Notificaciones iniciales
    ]);

    // Función para manejar el clic en una notificación
    const handleNotificationClick = (notificationId) => {
        setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== notificationId));
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const closeDropdown = () => {
        setIsDropdownVisible(false);
    };
    // ------------------------------------------------------------------------

    // carga los datos de las tiendas
    useEffect(() => {
        const selectedStore = () => {
            const formattedData = allStores.map(item => ({
                id: item.id,
                name: item.name,
                canton: item.canton,
                district: item.district,
                picture: item.picture,
                num_sinpe: item.num_sinpe,
                owner_sinpe: item.owner_sinpe,
                type: item.store_type,
                banner: item.banner,
            }));

            setOriginalStoreSelected(formattedData);
            setStoreSelected(formattedData);
        };

        selectedStore();
    }, [allStores]);
    // ------------------------------------------------------------------------

    // Función para realizar la búsqueda de la tienda
    const searchStore = (text) => {
        const filteredData = originalStoreSelected.filter(item =>
            item.name.toLowerCase().startsWith(text.toLowerCase())
        );
        setStoreSelected(filteredData);
    };
    // ------------------------------------------------------------------------

    // Para limpiar la búsqueda
    const clearSearch = () => {
        setSearch('');
        setStoreSelected(originalStoreSelected);  // Restablecer la lista original
    };
    // ------------------------------------------------------------------------

    // Función para filtrar la tienda
    useEffect(() => {
        if (categoryId === 0) {
            setStoreSelected(allStores);
            return;
        }
        // selecciona el tipo de tienda
        const selectedStoreType = () => {
            const filteredData = allStores.filter(item => item.store_type.includes(categoryId));
            const formattedData2 = filteredData.map(item => ({
                id: item.id,
                name: item.name,
                canton: item.canton,
                district: item.district,
                picture: item.picture,
                num_sinpe: item.num_sinpe,
                owner_sinpe: item.owner_sinpe,
                type: item.store_type,
                banner: item.banner,
            }));
            clearSearch();
            setStoreSelected(formattedData2);
            setOriginalStoreSelected(formattedData2);
        };

        selectedStoreType();
    }, [categoryId]);
    // ------------------------------------------------------------------------

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    // Función para manejar la selección de categoría
    const handleCategorySelect = (categoryId) => {
        setCategoryId(categoryId);
        setSelectedCategoryId(categoryId);
    };
    // ------------------------------------------------------------------------

    // carga de fuentes
    const [fontsLoaded] = useFonts({
        Excon_regular: require("../../FrontEnd/assets/fonts/Excon/Excon-Regular.otf"),
        Excon_bold: require("../../FrontEnd/assets/fonts/Excon/Excon-Bold.otf"),
        Excon_thin: require("../../FrontEnd/assets/fonts/Excon/Excon-Thin.otf"),
        Erode_regular: require("../../FrontEnd/assets/fonts/Erode/Erode-Regular.otf"),
        Erode_bold: require("../../FrontEnd/assets/fonts/Erode/Erode-Bold.otf"),
    });
    // ------------------------------------------------------------------------

    const sectionListRef = useRef(null);

    // Funcion del scroll de las categorias
    useEffect(() => {
        const scrollToItem = (sectionIndex, itemIndex) => {
            if (sectionListRef.current) {
                sectionListRef.current.scrollToLocation({
                    sectionIndex,
                    itemIndex,
                    animated: true,
                });
                setCategoryId(itemIndex);
                setSelectedCategoryId(itemIndex);
            }
        };

        if (allCategories.length > 0) {
            setTimeout(() => {
                scrollToItem(0, id ? id : 0);
            }, 100);
        }
    }, [allCategories, id]);
    // ------------------------------------------------------------------------

    // Función para manejar el scroll
    const handleScroll = (event) => {
        const contentOffsetY = event.nativeEvent.contentOffset.y;
        if (contentOffsetY > 100) {
            scrollToTopButtonRef.current?.setNativeProps({ style: { opacity: 1 } });
        } else {
            scrollToTopButtonRef.current?.setNativeProps({ style: { opacity: 0 } });
        }
    };
    // ------------------------------------------------------------------------

    // Función para desplazarse hacia arriba
    const scrollToTop = () => {
        listRef.current?.scrollTo({ y: 0, animated: true });
    };
    // ------------------------------------------------------------------------

    return (
        <View className="bg-white dark:bg-neutral-950 flex-1 " >
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
                        <Image className="w-12 h-10 ml-2" source={logo} />
                        <Text className="text-white dark:text-dk-blue text-2xl font-Outfit-medium">
                            Marlin
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-center gap-x-6 relative">
                        <TouchableOpacity onPress={toggleDropdown}>
                            <Ionicons name="notifications-outline" size={25} color={colorScheme === 'dark' ? "#5186EC" : "white"} />
                            {notifications.length > 0 && (
                                <View className="absolute top-[-2px] right-[-2px] w-2 h-2 bg-red-600 rounded-full" />
                            )}
                        </TouchableOpacity>
                        <View className="flex-row items-center justify-center relative">
                            <Pressable onPress={
                                isLogged ? () => navigation.navigate("Cart") : () => navigation.navigate("Landing")
                            }>
                                <Feather name="shopping-cart" size={26} color={colorScheme === 'dark' ? "#5186EC" : "white"} />
                            </Pressable>
                            {cartLength > 0 && (
                                <View className="absolute top-[-10px] right-[-10px] w-5 h-5 bg-red-600 rounded-full items-center justify-center">
                                    <Text className="text-white text-xs font-bold">{cartLength}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>

            <View className="flex-row text-center mt-5 mb-5 bg-gray-input dark:bg-dk-input rounded-lg mx-2 ">
                <Pressable className="bg-light-blue dark:bg-main-blue rounded-l-lg px-2 flex justify-center"
                    onPress={() => {
                        searchStore(search);

                    }}
                >
                    <MaterialCommunityIcons name="magnify" size={30} color="white" />
                </Pressable>
                <TextInput
                    className="ml-2 py-4 text-md text-light-blue dark:text-white  font-Excon_regular w-[70%] "
                    placeholder='Buscar Productos'
                    placeholderTextColor={placeholderTextColor}
                    value={search}
                    onChangeText={setSearch}
                    onSubmitEditing={() => {
                        searchStore(search);

                    }}
                />
                {search ? (
                    <Pressable className="flex-1 items-end mr-4 justify-center"
                        onPress={() => {
                            setSearch('');
                            searchStore('');

                        }}

                    >
                        <Ionicons name="close-sharp" size={35} color={placeholderTextColor} />
                    </Pressable>
                ) : null

                }
            </View>

            <View className="px-2 flex-1">
                {loading ? (
                    <View className={`w-full h-full justify-center items-center ${loading ? 'blur-sm' : 'blur-0'}`}>
                        <ActivityIndicator size="large" color="#3498db" />
                    </View>
                ) : null}

                <ScrollView
                    ref={listRef} // Attach the ref to the ScrollView
                    onScroll={handleScroll} // Listen to scroll events
                    scrollEventThrottle={16} // Improve scroll performance
                >
                    <View className="">
                        <Text className="mt-2 ml-2 text-2xl font-Excon_bold text-main-blue">Categorias</Text>

                        <SectionList
                            ref={sectionListRef}
                            sections={allCategories}
                            horizontal={true}
                            renderItem={({ item }) => (
                                <>
                                    {item.id == 1 ? (
                                        <View key={0}>
                                            <Pressable onPress={() => handleCategorySelect(0)}>
                                                <View className="my-4 mx-2 items-center">
                                                    <View className={`bg-gray-200 dark:dark:bg-dk-input p-5 rounded-lg w-20 h-20 ${selectedCategoryId == 0 ? 'bg-main-blue' : ''}`}>
                                                        <AntDesign name="CodeSandbox" size={40} color={selectedCategoryId == 0 ? "white" : "#1952BE"} />
                                                    </View>
                                                    <Text className="text-lg text-center text-light-blue">Todas</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    ) : null}
                                    <View key={item.id}>
                                        <Pressable onPress={() => handleCategorySelect(item.id)}>
                                            <View className="my-4 mx-2 items-center">
                                                <View className={`bg-gray-200 dark:dark:bg-dk-input p-5 rounded-lg w-20 h-20 ${selectedCategoryId == item.id ? 'bg-main-blue' : ''} `}>
                                                    {selectedCategoryId == item.id ? (
                                                        <Image source={{ uri: item.image_selected.replace("image/upload/", "") }} className="w-full h-full " resizeMode="cover" />
                                                    ) : (
                                                        <Image source={{ uri: item.image.replace("image/upload/", "") }} className="w-full h-full" resizeMode="cover" />
                                                    )}
                                                </View>
                                                <Text className="text-lg text-center text-light-blue">{item.name}</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </>
                            )}
                        />
                    </View>

                    <Text className="mt-2 ml-2 text-2xl font-Excon_bold text-main-blue ">Tiendas de esta categoría</Text>
                    {storeSelected.length == 0 ? (
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-red-500">No se encontraron tiendas</Text>
                        </View>
                    ) : null}

                    <FlatList
                        data={storeSelected}
                        scrollEnabled={false}
                        numColumns={2}
                        className="flex  "
                        columnWrapperStyle={{ justifyContent: 'space-around' }}
                        renderItem={({ item }) => (

                            <Pressable onPress={() => navigation.navigate('Store', { id: item.id, store: item })} className=" mt-4">
                                <View className="items-center ">
                                    <View className="rounded-lg w-40 h-40 bg-[#EDEEF3] p-[2px] ">
                                        <Image
                                            source={{ uri: item.picture }}
                                            className="rounded-lg w-full h-full"
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <Text className="text-lg text-light-blue dark:text-white w-40"
                                        numberOfLines={1}
                                        ellipsizeMode='tail'
                                    >{item.name}</Text>
                                    <Text className="text-lg text-light-blue">{item.district} </Text>
                                </View>
                            </Pressable>
                        )}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>

                <TouchableOpacity
                    onPress={scrollToTop}
                    ref={scrollToTopButtonRef}
                    className="absolute bottom-10 right-5 bg-light-blue p-2 rounded-full shadow-lg"
                    style={{ opacity: 0 }}
                >
                    <Ionicons name="arrow-up" size={26} color="white" />
                </TouchableOpacity>

            </View>
        </View>
    );
}