import * as Location from 'expo-location';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapScreen } from './MapScreen';
import { Button } from './ui';

interface HomeScreenProps {
  location: Location.LocationObject;
  onRefresh: () => void;
  onShowMap: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ location, onRefresh, onShowMap }) => {
  const [showMap, setShowMap] = useState(false);

  const formatCoordinate = (coord: number, isLatitude: boolean) => {
    const direction = isLatitude 
      ? (coord >= 0 ? 'N' : 'S')
      : (coord >= 0 ? 'E' : 'W');
    return `${Math.abs(coord).toFixed(6)}° ${direction}`;
  };

  const formatAccuracy = (accuracy: number | null) => {
    if (!accuracy) return 'N/A';
    return accuracy < 1000 ? `${Math.round(accuracy)}m` : `${(accuracy / 1000).toFixed(1)}km`;
  };

  if (showMap) {
    return (
      <MapScreen 
        location={location}
        onClose={() => setShowMap(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wildwatch</Text>
        <Text style={styles.subtitle}>Votre position actuelle</Text>
      </View>

      <View style={styles.locationCard}>
        <View style={styles.coordinateRow}>
          <Text style={styles.coordinateLabel}>Latitude</Text>
          <Text style={styles.coordinateValue}>
            {formatCoordinate(location.coords.latitude, true)}
          </Text>
        </View>

        <View style={styles.coordinateRow}>
          <Text style={styles.coordinateLabel}>Longitude</Text>
          <Text style={styles.coordinateValue}>
            {formatCoordinate(location.coords.longitude, false)}
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Précision</Text>
          <Text style={styles.infoValue}>
            {formatAccuracy(location.coords.accuracy)}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Altitude</Text>
          <Text style={styles.infoValue}>
            {location.coords.altitude 
              ? `${Math.round(location.coords.altitude)}m`
              : 'N/A'
            }
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Vitesse</Text>
          <Text style={styles.infoValue}>
            {location.coords.speed 
              ? `${Math.round(location.coords.speed * 3.6)} km/h`
              : 'N/A'
            }
          </Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <Button 
          title="🗺️ Voir sur la carte" 
          onPress={onShowMap} 
          variant="success"
          size="large"
        />
        
        <Button 
          title="🔄 Actualiser" 
          onPress={onRefresh} 
          variant="primary"
          size="large"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Dernière mise à jour: {new Date(location.timestamp).toLocaleTimeString('fr-FR')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  locationCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  coordinateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  coordinateLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  coordinateValue: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});
