import { Alert } from "react-native";
const useGetDeliveryForm = (navigation) => {
    const handleDeliveryForm = (deliveryForm) => {
        console.log("deliveryForm", deliveryForm);
        const formDataToSend = new FormData();
        formDataToSend.append("brand", deliveryForm.brand);
        formDataToSend.append("model", deliveryForm.model);
        formDataToSend.append("plate", deliveryForm.plate);
        formDataToSend.append("vehicle", deliveryForm.vehicle);
        formDataToSend.append("selfie", deliveryForm.pictures[0]);
        formDataToSend.append("vehicle_picture", deliveryForm.pictures[1]);
        formDataToSend.append("iD_front_picture", deliveryForm.pictures[2]);
        formDataToSend.append("iD_back_picture", deliveryForm.pictures[3]);
        formDataToSend.append("license_picture", deliveryForm.pictures[4]);

        // if (deliveryForm.pictures && deliveryForm.pictures.length > 0) {
        //     deliveryForm.pictures.forEach((image, index) => {
        //         const perfilFile = {
        //             uri: image.uri,
        //             type: "image/jpeg",
        //             name: `${deliveryForm.name}_${image.id}.jpg`, 
        //         };
        //         formDataToSend.append("pictures", perfilFile);
        //     });
        // }
        console.log("formDataToSend", formDataToSend);
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
