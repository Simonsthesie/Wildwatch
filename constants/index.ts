/**
 * Constantes de l'application Wildwatch
 */

// Clés de stockage
export const STORAGE_KEYS = {
  OBSERVATIONS: 'wildwatch_observations',
} as const;

// Configuration de la carte
export const MAP_CONFIG = {
  DEFAULT_ZOOM: 15,
  DEFAULT_CENTER: {
    latitude: 48.8566,
    longitude: 2.3522,
  },
} as const;

// Types d'icônes d'observation
export const OBSERVATION_ICONS = [
  { icon: '🦌', label: 'Animal' },
  { icon: '🍄', label: 'Champignon' },
  { icon: '🌿', label: 'Plante' },
  { icon: '🦅', label: 'Oiseau' },
] as const;

// Messages d'erreur
export const ERROR_MESSAGES = {
  LOCATION_PERMISSION_DENIED: 'Permission de localisation refusée',
  LOCATION_ERROR: 'Impossible de récupérer la position',
  SAVE_OBSERVATION_ERROR: 'Impossible de sauvegarder l\'observation',
  UPDATE_OBSERVATION_ERROR: 'Impossible de mettre à jour l\'observation',
  DELETE_OBSERVATION_ERROR: 'Impossible de supprimer l\'observation',
  IMAGE_PICKER_ERROR: 'Impossible de sélectionner l\'image',
  CAMERA_ERROR: 'Impossible de prendre la photo',
} as const;

// Durées d'animation
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  PULSE: 1000,
} as const;

// Tailles de composants
export const COMPONENT_SIZES = {
  BUTTON_HEIGHT: {
    SMALL: 40,
    MEDIUM: 50,
    LARGE: 60,
  },
  ICON_SIZE: {
    SMALL: 16,
    MEDIUM: 24,
    LARGE: 32,
  },
} as const;
