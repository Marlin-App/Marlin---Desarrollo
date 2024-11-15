import React from 'react';
import { Modal, View, Text, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

const NotificationDropdown = ({ notifications, isDropdownVisible, closeDropdown, onNotificationClick }) => {

    // solo se muestra si hay notificaciones
    return (
        <Modal
            transparent={true}
            visible={isDropdownVisible}
            animationType="fade"
            onRequestClose={closeDropdown}
        >
            <TouchableWithoutFeedback onPress={closeDropdown}>
                <View className="flex-1 justify-start items-end p-4 bg-[#00000070]">
                    <TouchableWithoutFeedback>
                        <View className="w-72 bg-white rounded-lg shadow-lg max-h-96 dark:bg-black">
                            <Text className="text-xl font-Excon_bold px-4 py-2 border-b text-main-blue dark:text-light-blue dark:border-main-blue">Notificaciones</Text>
                            <FlatList
                                data={notifications}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => onNotificationClick(item.id)}>
                                        <View className="px-4 py-2 border-b border-gray-200 dark:border-light-blue">
                                            <Text className="font-semibold text-gray-800">{item.title}</Text>
                                            <Text className="text-gray-400">{item.description}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                ListEmptyComponent={
                                    <View className="px-4 py-4 items-center">
                                        <Text className="text-gray-600 dark:text-[#d6d6d6]">No tienes notificaciones nuevas.</Text>
                                    </View>
                                }
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default NotificationDropdown;