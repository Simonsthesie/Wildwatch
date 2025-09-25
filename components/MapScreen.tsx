import Mapbox from '@rnmapbox/maps';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MAP_CONFIG, MAPBOX_ACCESS_TOKEN } from '../config/mapbox';
import { StorageService } from '../services/storageService';
import { Observation, ObservationFormData } from '../types/observation';
import { EditObservationModal } from './EditObservationModal';
import { ObservationModal } from './ObservationModal';
import { ControlButton } from './ui';

interface MapScreenProps {
  location: Location.LocationObject;
  onClose: () => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ location, onClose }) => {
  const mapRef = useRef<Mapbox.MapView>(null);
  const cameraRef = useRef<Mapbox.Camera>(null);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [showObservationModal, setShowObservationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedObservation, setSelectedObservation] = useState<Observation | null>(null);
  const [selectedCoordinate, setSelectedCoordinate] = useState<[number, number]>([0, 0]);
  const [newMarkerAnimation] = useState(new Animated.Value(0));
  const [markersKey, setMarkersKey] = useState(0); // Clé pour forcer le re-rendu des marqueurs

  useEffect(() => {
    // Vérifier que le token Mapbox est configuré
    if (!MAPBOX_ACCESS_TOKEN) {
      console.error('❌ Token Mapbox non configuré');
      return;
    }
    
    // S'assurer que Mapbox est initialisé
    Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
    
    loadObservations();
  }, []);

  useEffect(() => {
    // Centrer la carte sur la position de l'utilisateur
    if (cameraRef.current && location) {
      cameraRef.current.setCamera({
        centerCoordinate: [location.coords.longitude, location.coords.latitude],
        zoomLevel: MAP_CONFIG.zoomLevel,
        animationDuration: 1000,
      });
    }
  }, [location]);

  const loadObservations = async () => {
    try {
      const obs = await StorageService.getObservations();
      setObservations(obs);
      // Incrémenter la clé pour forcer le re-rendu des marqueurs
      setMarkersKey(prev => prev + 1);
    } catch (error) {
      console.error('Erreur lors du chargement des observations:', error);
    }
  };

  const centerOnUser = () => {
    if (cameraRef.current && location) {
      cameraRef.current.setCamera({
        centerCoordinate: [location.coords.longitude, location.coords.latitude],
        zoomLevel: MAP_CONFIG.zoomLevel,
        animationDuration: 1000,
      });
    }
  };

  const handleMapPress = (feature: any) => {
    const coordinates = feature.geometry?.coordinates;
    if (coordinates && coordinates.length >= 2) {
      setSelectedCoordinate([coordinates[0], coordinates[1]]);
      setShowObservationModal(true);
    }
  };

  const handleMarkerPress = (observation: Observation) => {
    setSelectedObservation(observation);
    setShowEditModal(true);
  };

  const handleSaveObservation = async (formData: ObservationFormData) => {
    try {
      const newObservation: Observation = {
        id: Date.now().toString(),
        name: formData.name,
        date: formData.date,
        latitude: selectedCoordinate[1],
        longitude: selectedCoordinate[0],
        imageUri: formData.imageUri,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await StorageService.saveObservation(newObservation);
      await loadObservations();
      
      // Animation du nouveau marqueur
      Animated.sequence([
        Animated.timing(newMarkerAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(newMarkerAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      throw error;
    }
  };

  const handleUpdateObservation = async (id: string, formData: ObservationFormData) => {
    try {
      await StorageService.updateObservation(id, formData);
      await loadObservations();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      throw error;
    }
  };

  const handleDeleteObservation = async (id: string) => {
    try {
      await StorageService.deleteObservation(id);
      await loadObservations();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <Mapbox.MapView
        ref={mapRef}
        style={styles.map}
        styleURL={MAP_CONFIG.styleURL}
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        attributionEnabled={MAP_CONFIG.attributionEnabled}
        logoEnabled={MAP_CONFIG.logoEnabled}
        compassEnabled={MAP_CONFIG.compassEnabled}
        scaleBarEnabled={MAP_CONFIG.scaleBarEnabled}
        onPress={handleMapPress}
        onDidFinishLoadingMap={() => console.log('✅ Carte chargée avec succès')}
        onMapLoadingError={() => console.error('❌ Erreur de chargement de la carte')}
      >
        {/* Marqueur de position utilisateur */}
        <Mapbox.Camera
          ref={cameraRef}
          centerCoordinate={[location.coords.longitude, location.coords.latitude]}
          zoomLevel={MAP_CONFIG.zoomLevel}
          animationMode="flyTo"
          animationDuration={1000}
        />
        
        {/* Point de localisation personnalisé */}
        <Mapbox.PointAnnotation
          id="user-location"
          coordinate={[location.coords.longitude, location.coords.latitude]}
        >
          <View style={styles.markerContainer}>
            <View style={styles.marker}>
              <Text style={styles.markerText}>📍</Text>
            </View>
          </View>
        </Mapbox.PointAnnotation>

        {/* Marqueurs des observations */}
        {observations.map((observation, index) => (
          <Mapbox.PointAnnotation
            key={`${observation.id}-${markersKey}`}
            id={`observation-${observation.id}`}
            coordinate={[observation.longitude, observation.latitude]}
            onSelected={() => handleMarkerPress(observation)}
          >
            <Animated.View
              style={[
                styles.observationMarkerContainer,
                {
                  transform: [
                    {
                      scale: index === observations.length - 1 
                        ? newMarkerAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.3],
                          })
                        : 1,
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.observationMarker}
                onPress={() => handleMarkerPress(observation)}
                activeOpacity={0.7}
              >
                <Text style={styles.observationMarkerText}>🦌</Text>
              </TouchableOpacity>
              <View style={styles.observationLabel}>
                <Text style={styles.observationLabelText} numberOfLines={1}>
                  {observation.name}
                </Text>
              </View>
            </Animated.View>
          </Mapbox.PointAnnotation>
        ))}
      </Mapbox.MapView>

      {/* Boutons de contrôle */}
      <View style={styles.controls}>
        <ControlButton 
          title="🎯" 
          onPress={centerOnUser} 
          variant="default"
        />
        
        <ControlButton 
          title="✕" 
          onPress={onClose} 
          variant="close"
        />
      </View>

      {/* Informations de position */}
      <View style={styles.infoOverlay}>
        <Text style={styles.coordinatesText}>
          {location.coords.latitude.toFixed(6)}, {location.coords.longitude.toFixed(6)}
        </Text>
        <Text style={styles.accuracyText}>
          Précision: {location.coords.accuracy ? `${Math.round(location.coords.accuracy)}m` : 'N/A'}
        </Text>
      </View>

      {/* Modale d'observation */}
      <ObservationModal
        visible={showObservationModal}
        onClose={() => setShowObservationModal(false)}
        onSave={handleSaveObservation}
        coordinate={selectedCoordinate}
      />

      {/* Modale de modification d'observation */}
      <EditObservationModal
        visible={showEditModal}
        observation={selectedObservation}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdateObservation}
        onDelete={handleDeleteObservation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    top: 60,
    right: 20,
    gap: 10,
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  coordinatesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  accuracyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  markerText: {
    fontSize: 16,
  },
  observationMarkerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  observationMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  observationMarkerText: {
    fontSize: 20,
  },
  observationLabel: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
    maxWidth: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  observationLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
