import { GOOGLE_API_KEY } from '@env'

export const useTransportFee = async (startCoords, endCoords) => {
  const apiKey = GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoords.latitude},${startCoords.longitude}&destination=${endCoords.latitude},${endCoords.longitude}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.routes.length) {
      const distance = data.routes[0].legs[0].distance.text;
      const distanceValue = data.routes[0].legs[0].distance.value;

      // Obtener las coordenadas de la ruta
      const steps = data.routes[0].legs[0].steps;
      const routeCoordinates = steps.map(step => ({
        latitude: step.start_location.lat,
        longitude: step.start_location.lng,
      }));
      routeCoordinates.push({
        latitude: endCoords.latitude,
        longitude: endCoords.longitude,
      });

      return { distance, distanceValue, routeCoordinates };
    } else {
      throw new Error('No se encontró una ruta entre los puntos especificados.');
    }
  } catch (error) {
    console.error('Error al obtener la distancia:', error.message || error);
    return null;
  }
};
