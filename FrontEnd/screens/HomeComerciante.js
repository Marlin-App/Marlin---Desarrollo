
import { Text, View, FlatList, Pressable, Image, ScrollView } from 'react-native';
import { useColorScheme } from "nativewind";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';

export function HomeComercianteScreen({ navigation }) {
    const { colorScheme } = useColorScheme();
    const [filter, setFilter] = useState("Completado");

    const [orders, setOrders] = useState([
        {
            id: 1,
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB8W02HdwwjvQtQl1b2-86cJnh6td58ShJdQ&s",
            deliveredDate: "02/10/24",
            status: "Completado",
            receipt: "12454",
            price: 12000,
            productsCount: 2,
            total: 215415,
            customer: {
                name: "Jorge Lopez Fernandez",
                date: "05/10/24",
                receiptNumber: "215415",
            },
            orderDetails: [
                { productName: "Producto 1", price: 100, quantity: 2, subtotal: 200, productPicture:"https://res.cloudinary.com/dgpqi6ukf/v1729140750/items/Tenis%20converse_picture.webp", description: "Un artículo versátil y práctico, perfecto para cualquier ocasión. Con su excelente relación calidad-precio, este producto se destaca por su durabilidad y diseño atractivo." },
                { productName: "Producto 2", price: 150, quantity: 1, subtotal: 150, productPicture:"https://res.cloudinary.com/dgpqi6ukf/v1729140750/items/Tenis%20converse_picture.webp", description: "Este producto combina calidad y estilo. Ideal para quienes buscan algo especial, ofrece una experiencia premium con una excelente atención al detalle." }
            ],
            deliveryInfo: {
                references: "Esta en la refencia de la orden numero 1.",
            }
        },
        {
            id: 2,
            logo: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB8W02HdwwjvQtQl1b2-86cJnh6td58ShJdQ&s`,
            deliveredDate: "03/10/24",
            status: "Pendiente",
            receipt: "12455",
            price: 14000,
            productsCount: 3,
            total: 240415,
            customer: {
                name: "Jose Alvarado",
                date: "06/10/24",
                receiptNumber: "215416",
            },
            orderDetails: [
                { productName: "Producto 3", price: 200, quantity: 1, subtotal: 200, productPicture: "https://res.cloudinary.com/dgpqi6ukf/v1729140750/items/Tenis%20converse_picture.webp", description: "Una opción confiable y duradera para quienes buscan productos de alta calidad. Diseñado para durar, este artículo es una inversión segura." },
                { productName: "Producto 4", price: 300, quantity: 2, subtotal: 600, productPicture:"https://www.gollo.com/media/catalog/product/5/0/5001111143_rpsoi9usgtfb3wmr.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:", description: "Con un diseño moderno y características avanzadas, este producto ofrece un rendimiento excepcional, ideal para los más exigentes." }
            ],
            deliveryInfo: {
                references: "Referencias de entrega de la ordern numero 2",
            }
        },
        {
            id: 3,
            logo: "https://pbs.twimg.com/media/DaXUEfcX0AEx2iY.jpg",
            deliveredDate: "04/10/24",
            status: "Completado",
            receipt: "12456",
            price: 8000,
            productsCount: 2,
            total: 150215,
            customer: {
                name: "Carlos Jimenez",
                date: "07/10/24",
                receiptNumber: "215417",
            },
            orderDetails: [
                { productName: "Producto 5", price: 50, quantity: 4, subtotal: 200, productPicture: "https://www.gollo.com/media/catalog/product/5/0/5001111143_rpsoi9usgtfb3wmr.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:", description: "Este producto ofrece una excelente relación calidad-precio, siendo una opción popular entre los compradores que buscan fiabilidad a un buen precio." },
                { productName: "Producto 6", price: 100, quantity: 2, subtotal: 200, productPicture: "https://www.gollo.com/media/catalog/product/i/p/iphone_13_blanco_askezpgrxnmn6mey.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1040&width=1040&canvas=1040:1040", description: "Elegante y funcional, este producto es la combinación perfecta de diseño atractivo y alto rendimiento, ideal para quienes valoran tanto el estilo como la utilidad." }
            ],
            deliveryInfo: {
                references: "Detalles adicionales de entrega del pedido 3.",
            }
        },
        {
            id: 4,
            logo: "https://pbs.twimg.com/media/DaXUEfcX0AEx2iY.jpg",
            deliveredDate: "05/10/24",
            status: "Cancelado",
            receipt: "12457",
            price: 16000,
            productsCount: 4,
            total: 260415,
            customer: {
                name: "Paulo Jimenez Fernandez",
                date: "08/10/24",
                receiptNumber: "215418",
            },
            orderDetails: [
                { productName: "Producto 7", price: 400, quantity: 1, subtotal: 400, productPicture: "https://www.gollo.com/media/catalog/product/i/p/iphone_13_blanco_askezpgrxnmn6mey.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=1040&width=1040&canvas=1040:1040", description: "Un producto de gama alta, diseñado para ofrecer una experiencia única. Perfecto para aquellos que buscan calidad superior y un rendimiento impecable." },
                { productName: "Producto 8", price: 350, quantity: 2, subtotal: 700, productPicture: "https://res.cloudinary.com/dgpqi6ukf/v1729140750/items", description: "Este artículo ofrece una combinación perfecta de diseño y tecnología. Ideal para los usuarios más exigentes que buscan rendimiento y estética en un solo producto." }
            ],
            deliveryInfo: {
                references: "Referencias de entrega actualizadas.",
            }
        },
        {
            id: 5,
            logo: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35af6a41332353.57a1ce913e889.jpg",
            deliveredDate: "06/10/24",
            status: "Completado",
            receipt: "12458",
            price: 11000,
            productsCount: 1,
            total: 170215,
            customer: {
                name: "Jose Alvarado",
                date: "09/10/24",
                receiptNumber: "215419",
            },
            orderDetails: [
                { productName: "Producto 9", price: 200, quantity: 1, subtotal: 200, productPicture: "https://res.cloudinary.com/dgpqi6ukf/v1729140750/items", description: "Sencillo pero eficiente, este producto es una opción fiable para el uso diario. Su diseño compacto lo hace fácil de usar y transportar." },
                { productName: "Producto 10", price: 150, quantity: 3, subtotal: 450, productPicture: "https://res.cloudinary.com/dgpqi6ukf/v1729140750/items/Tenis%20con", description: "Con un diseño moderno y funcional, este artículo es la elección ideal para aquellos que buscan un equilibrio entre calidad y precio, con un enfoque en la durabilidad." }
            ],
            deliveryInfo: {
                references: "Instrucciones especiales de entrega.",
            }
        }
    ]);
    
    const [orderFiler, setOrderFilter] = useState(orders);


    useEffect(() => {
       
            const filteredOrders = orders.filter(order => order.status === filter);
            setOrderFilter(filteredOrders);
        
    }, [filter]);




    return (
        <View className="flex-1 bg-white dark:bg-neutral-950">
            <View className="w-full flex-col px-4 bg-main-blue dark:bg-dk-main-bg py-8">
                <View className="flex-row justify-between w-full">
                    <View className="flex-row items-center">
                        <Text className="text-white dark:text-light-blue text-2xl font-Excon_bold w-[80vw]">
                            ¡Bienvenido a Marlin comerciante Luis!
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-center gap-x-4 mr-2">
                        <Ionicons name="notifications-outline" size={24} color={colorScheme === 'dark' ? "#5186EC" : "white"} />
                    </View>
                </View>
            </View>
            <Text className="text-2xl font-Excon_bold text-main-blue mt-8 ml-4 dark:text-light-blue">Tus pedidos</Text>
            <View className="flex-row justify-center gap-x-2 p-4 mt-4 ">
                <Pressable className={`border-4 px-4 py-2 rounded-xl dark:border-light-blue ${filter === "Completado" ? 'border border-light-blue dark:border-main-blue' : 'border border-gray-800 dark:border-white'} `} onPress={() => setFilter("Completado")} >
                    <Text className="font-Excon_thin text-sm dark:text-white">Completados</Text>
                </Pressable>
                <Pressable className={`border-4 px-4 py-2 rounded-xl dark:border-light-blue ${filter === "Pendiente" ? 'border border-light-blue dark:border-main-blue' : 'border border-gray-800 dark:border-white'} `} onPress={() => setFilter("Pendiente")}>
                    <Text className="font-Excon_thin text-sm dark:text-white">Pendientes</Text>
                </Pressable>
                <Pressable className={`border-4 px-4 py-2 rounded-xl dark:border-light-blue ${filter === "Cancelado" ? 'border border-light-blue dark:border-main-blue' : 'border border-gray-800 dark:border-white'} `} onPress={() => setFilter("Cancelado")}>
                    <Text className="font-Excon_thin text-sm dark:text-white">Cancelados</Text>
                </Pressable>
            </View>

            <ScrollView className="flex-col p-4 mx-5  border border-light-blue dark:border-main-blue rounded-lg mb-4">

                    <FlatList
                        data={orderFiler}
                        scrollEnabled={false}   
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        className=""
                        ListEmptyComponent={
                            <View className="items-center mt-4">
                                <Text className="text-gray-600 dark:text-gray-400">No hay pedidos</Text>
                            </View>
                        }
                        renderItem={({ item }) => (
                            <Pressable className="flex-row justify-center mb-1" onPress={() => navigation.navigate("Pedido", { order: item })}>
                                <View className="flex-row justify-between mt-2 px-4 py-4 border-[0.5px] border-[#D6D6D6] dark:border-light-blue w-full items-center rounded-md ">
                                    <View className="flex-row">
                                        <View className=" justify-center item-center bg-red-600 rounded-lg dark:bg-neutral-900">
                                            <Image source={{uri: item.logo }} style={{ width: 100, height: 100, resizeMode: "stretch" }} />
                                        </View>
                                        <View className="px-6">
                                            <Text className="font-Excon_bold text-sm dark:text-white">Entregado: <Text className="font-Excon_thin text-sm">{item.deliveredDate} </Text></Text>
                                            <Text className="font-Excon_bold text-sm dark:text-white">Estado: <Text className="font-Excon_thin text-sm">{item.status} </Text></Text>
                                            <Text className="font-Excon_bold text-sm dark:text-white">Recibo: <Text className="font-Excon_thin text-sm">{item.receipt} </Text></Text>
                                            <Text className="font-Excon_thin text-sm dark:text-white">₡{item.price} - {item.orderDetails.length} productos</Text>
                                        </View>
                                    </View>

                                    <View className="flex-col gap-y-1 h-full">
                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px] dark:bg-light-blue"></View>
                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px] dark:bg-light-blue"></View>
                                        <View className="bg-main-blue rounded-full w-[5px] h-[5px] dark:bg-light-blue"></View>
                                    </View>

                                </View>
                            </Pressable>
                        )}
                    />
            </ScrollView>
        </View>
    );
}