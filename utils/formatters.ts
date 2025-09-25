/**
 * Utilitaires de formatage pour l'application Wildwatch
 */

/**
 * Formate une coordonnée GPS avec direction
 * @param coord - Coordonnée numérique
 * @param isLatitude - True si c'est une latitude, false si longitude
 * @returns Coordonnée formatée avec direction (ex: "37.785834° N")
 */
export const formatCoordinate = (coord: number, isLatitude: boolean): string => {
  const direction = isLatitude 
    ? (coord >= 0 ? 'N' : 'S')
    : (coord >= 0 ? 'E' : 'W');
  return `${Math.abs(coord).toFixed(6)}° ${direction}`;
};

/**
 * Formate la précision GPS
 * @param accuracy - Précision en mètres (peut être null)
 * @returns Précision formatée (ex: "5m" ou "1.2km")
 */
export const formatAccuracy = (accuracy: number | null): string => {
  if (!accuracy) return 'N/A';
  return accuracy < 1000 ? `${Math.round(accuracy)}m` : `${(accuracy / 1000).toFixed(1)}km`;
};

/**
 * Formate la vitesse
 * @param speed - Vitesse en m/s (peut être null)
 * @returns Vitesse formatée (ex: "5 km/h")
 */
export const formatSpeed = (speed: number | null): string => {
  if (!speed) return 'N/A';
  const kmh = speed * 3.6;
  return `${kmh.toFixed(1)} km/h`;
};

/**
 * Formate l'altitude
 * @param altitude - Altitude en mètres (peut être null)
 * @returns Altitude formatée (ex: "150m")
 */
export const formatAltitude = (altitude: number | null): string => {
  if (!altitude) return 'N/A';
  return `${Math.round(altitude)}m`;
};

/**
 * Formate une date pour l'affichage
 * @param dateString - Date au format ISO string
 * @returns Date formatée (ex: "15/03/2024 14:30")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
