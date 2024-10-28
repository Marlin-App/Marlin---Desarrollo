import { Alert } from "react-native";
const useGetDeliveryForm = (navigation) => {
    const handleDeliveryForm = (deliveryForm) => {
        const formDataToSend = new FormData();
        formDataToSend.append("brand", deliveryForm.brand);
        formDataToSend.append("model", deliveryForm.model);
        formDataToSend.append("plate", deliveryForm.plate);
        formDataToSend.append("vehicle", deliveryForm.vehicle);
        if (deliveryForm.pictures && deliveryForm.pictures.length > 0) {
            deliveryForm.pictures.forEach((image, index) => {
                const perfilFile = {
                    uri: image.uri,
                    type: "image/jpeg",
                    name: `${deliveryForm.name}_${image.id}.jpg`, 
                };
                formDataToSend.append("pictures", perfilFile);
            });
        }
        Alert.alert(
            "Solicitud enviada",
            "Tu solicitud está siendo verificada por los administradores."
        );
        navigation.navigate("thirdScreen");
    };

    return {
        handleDeliveryForm,
    };
};

export default useGetDeliveryForm;
