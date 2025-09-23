import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';

export type LocationStatus = 'idle' | 'loading' | 'success' | 'error' | 'denied';

export interface LocationState {
  location: Location.LocationObject | null;
  status: LocationStatus;
  error: string | null;
}

export const useCurrentPosition = () => {
  const [state, setState] = useState<LocationState>({
    location: null,
    status: 'idle',
    error: null,
  });

  const requestLocation = async () => {
    setState(prev => ({ ...prev, status: 'loading', error: null }));

    try {
      // Vérifier les permissions
      const { status: existingStatus } = await Location.getForegroundPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        setState(prev => ({
          ...prev,
          status: 'denied',
          error: 'Permission de localisation refusée',
        }));
        return;
      }

      // Récupérer la position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setState({
        location,
        status: 'success',
        error: null,
      });

      console.log('Position de l\'utilisateur:', location);
    } catch (error) {
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      }));
    }
  };

  const openSettings = () => {
    Alert.alert(
      'Permission requise',
      'Pour utiliser la géolocalisation, veuillez activer les permissions dans les paramètres.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Ouvrir les paramètres', onPress: () => Linking.openSettings() },
      ]
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return {
    ...state,
    requestLocation,
    openSettings,
  };
};
