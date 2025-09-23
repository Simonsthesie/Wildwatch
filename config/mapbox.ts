// Configuration Mapbox
// Utilisation des variables d'environnement pour les tokens
export const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN || 'pk.eyJ1Ijoic3JheW5hdWQtbGFtb2JpbGVyeSIsImEiOiJjbWZmdTRienQwb2F4MmtzYmprNWxieWZwIn0.mgySs3rW_6jA7hEKCF7ycw';
export const MAPBOX_DOWNLOAD_TOKEN = process.env.MAPBOX_DOWNLOAD_TOKEN || 'sk.eyJ1Ijoic3JheW5hdWQtbGFtb2JpbGVyeSIsImEiOiJjbWZoY2hzMGUwYmtoMmlxdG5vdHRneXFlIn0.NDrbW7jA9GC9txgBp_lVJw';

// Vérification que les tokens sont configurés
if (!MAPBOX_ACCESS_TOKEN || MAPBOX_ACCESS_TOKEN === 'YOUR_MAPBOX_ACCESS_TOKEN') {
  console.warn('⚠️ MAPBOX_ACCESS_TOKEN non configuré. La carte ne fonctionnera pas.');
}

if (!MAPBOX_DOWNLOAD_TOKEN || MAPBOX_DOWNLOAD_TOKEN === 'YOUR_MAPBOX_DOWNLOAD_TOKEN') {
  console.warn('⚠️ MAPBOX_DOWNLOAD_TOKEN non configuré. Certaines fonctionnalités peuvent ne pas fonctionner.');
}

// Style de carte par défaut
export const DEFAULT_MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';

// Configuration des options de la carte
export const MAP_CONFIG = {
  // Style de la carte
  styleURL: DEFAULT_MAP_STYLE,
  
  // Options de zoom
  zoomLevel: 15,
  minZoomLevel: 5,
  maxZoomLevel: 20,
  
  // Options de localisation
  showsUserLocation: true,
  showsUserHeadingIndicator: true,
  userLocationPriority: 'high',
  
  // Options de performance
  attributionEnabled: true,
  logoEnabled: true,
  compassEnabled: true,
  scaleBarEnabled: true,
};
