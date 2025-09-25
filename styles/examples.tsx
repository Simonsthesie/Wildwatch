/**
 * WILDWATCH - EXEMPLES D'UTILISATION DU THÈME SAUVAGE
 * Fichier d'exemples pour montrer comment utiliser le nouveau thème nature
 */

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, theme } from './index';

// Exemple 1: Bouton avec style sauvage
export const WildButton = ({ title, onPress, variant = 'forest' }: {
  title: string;
  onPress: () => void;
  variant?: 'forest' | 'earth' | 'moss' | 'sunset';
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'forest':
        return [styles.button, styles.forestButton];
      case 'earth':
        return [styles.button, styles.earthButton];
      case 'moss':
        return [styles.button, styles.mossButton];
      case 'sunset':
        return [styles.button, styles.sunsetButton];
      default:
        return [styles.button, styles.forestButton];
    }
  };

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// Exemple 2: Carte d'observation sauvage
export const WildObservationCard = ({ observation }: {
  observation: {
    name: string;
    date: string;
    location: string;
    type: 'forest' | 'earth' | 'moss' | 'bark';
  };
}) => {
  const getCardStyle = () => {
    switch (observation.type) {
      case 'forest':
        return [styles.card, styles.forestCard];
      case 'earth':
        return [styles.card, styles.earthCard];
      case 'moss':
        return [styles.card, styles.mossCard];
      case 'bark':
        return [styles.card, styles.barkCard];
      default:
        return [styles.card, styles.forestCard];
    }
  };

  return (
    <View style={getCardStyle()}>
      <Text style={styles.observationTitle}>{observation.name}</Text>
      <Text style={styles.observationDate}>{observation.date}</Text>
      <Text style={styles.observationLocation}>{observation.location}</Text>
    </View>
  );
};

// Exemple 3: Marqueur d'animal
export const AnimalMarker = ({ animalType, onPress }: {
  animalType: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.animalMarker} onPress={onPress}>
      <Text style={styles.animalEmoji}>
        {animalType === 'deer' ? '🦌' : 
         animalType === 'bird' ? '🦅' : 
         animalType === 'fox' ? '🦊' : '🐾'}
      </Text>
    </TouchableOpacity>
  );
};

// Exemple 4: Overlay d'informations nature
export const NatureInfoOverlay = ({ coordinates, accuracy }: {
  coordinates: { lat: number; lng: number };
  accuracy: number;
}) => {
  return (
    <View style={styles.infoOverlay}>
      <Text style={styles.coordinatesText}>
        {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
      </Text>
      <Text style={styles.accuracyText}>
        Précision: {Math.round(accuracy)}m
      </Text>
    </View>
  );
};

// Exemple 5: Bouton de contrôle nature
export const NatureControlButton = ({ icon, onPress, variant = 'forest' }: {
  icon: string;
  onPress: () => void;
  variant?: 'forest' | 'earth' | 'moss';
}) => {
  const getControlStyle = () => {
    switch (variant) {
      case 'forest':
        return [styles.controlButton, styles.forestControl];
      case 'earth':
        return [styles.controlButton, styles.earthControl];
      case 'moss':
        return [styles.controlButton, styles.mossControl];
      default:
        return [styles.controlButton, styles.forestControl];
    }
  };

  return (
    <TouchableOpacity style={getControlStyle()} onPress={onPress}>
      <Text style={styles.controlIcon}>{icon}</Text>
    </TouchableOpacity>
  );
};

// Styles utilisant le thème sauvage
const styles = StyleSheet.create({
  // Boutons sauvages
  button: {
    ...theme.buttonStyles.base,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  forestButton: {
    ...theme.buttonStyles.forest,
  },
  earthButton: {
    ...theme.buttonStyles.earth,
  },
  mossButton: {
    ...theme.buttonStyles.moss,
  },
  sunsetButton: {
    backgroundColor: colors.sunset,
    borderColor: colors.earth,
  },
  buttonText: {
    ...theme.buttonStyles.text,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
  },

  // Cartes d'observation
  card: {
    ...theme.cardStyles.base,
    marginVertical: theme.spacing.sm,
    padding: theme.spacing.lg,
  },
  forestCard: {
    ...theme.cardStyles.forest,
  },
  earthCard: {
    ...theme.cardStyles.earth,
  },
  mossCard: {
    ...theme.cardStyles.moss,
  },
  barkCard: {
    ...theme.cardStyles.bark,
  },
  observationTitle: {
    ...theme.typography.h4,
    color: colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  observationDate: {
    ...theme.typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  observationLocation: {
    ...theme.typography.bodySmall,
    color: colors.textTertiary,
  },

  // Marqueurs d'animaux
  animalMarker: {
    ...theme.wildlifeStyles.animalMarker,
  },
  animalEmoji: {
    fontSize: theme.fontSize.xl,
  },

  // Overlay d'informations
  infoOverlay: {
    ...theme.wildlifeStyles.infoOverlay,
  },
  coordinatesText: {
    ...theme.mapStyles.coordinatesText,
  },
  accuracyText: {
    ...theme.mapStyles.accuracyText,
  },

  // Boutons de contrôle
  controlButton: {
    ...theme.wildlifeStyles.controlButton,
  },
  forestControl: {
    borderColor: colors.forest,
  },
  earthControl: {
    borderColor: colors.earth,
  },
  mossControl: {
    borderColor: colors.moss,
  },
  controlIcon: {
    fontSize: theme.fontSize.lg,
    color: colors.textPrimary,
  },
});

export default {
  WildButton,
  WildObservationCard,
  AnimalMarker,
  NatureInfoOverlay,
  NatureControlButton,
};
