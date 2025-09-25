/**
 * WILDWATCH - THÈME GLOBAL
 * Fichier centralisé pour tous les styles de l'application
 */

export const colors = {
  // Couleurs principales - Nature sauvage
  primary: '#2D5016', // Vert forêt profond
  primaryDark: '#1A3009', // Vert très sombre
  primaryLight: '#4A7C59', // Vert mousse
  
  // Couleurs secondaires - Palette naturelle
  success: '#228B22', // Vert forest
  successDark: '#006400', // Vert sombre
  warning: '#DAA520', // Or sauvage
  error: '#8B4513', // Brun terre
  
  // Couleurs neutres - Tons terre
  white: '#F5F5DC', // Beige naturel
  black: '#2F1B14', // Brun très sombre
  gray50: '#F0F8E8', // Vert très clair
  gray100: '#E6F3D6', // Vert pâle
  gray200: '#CCE7B3', // Vert clair
  gray300: '#B3D999', // Vert moyen clair
  gray400: '#99CC80', // Vert moyen
  gray500: '#7FB366', // Vert
  gray600: '#66994D', // Vert foncé
  gray700: '#4D7A33', // Vert très foncé
  gray800: '#335C1A', // Vert sombre
  gray900: '#1A3D0A', // Vert très sombre
  
  // Couleurs de fond - Nature
  background: '#F0F8E8', // Vert très clair
  backgroundSecondary: '#F5F5DC', // Beige naturel
  backgroundOverlay: 'rgba(245, 245, 220, 0.95)', // Beige transparent
  
  // Couleurs de texte - Tons terre
  textPrimary: '#2F1B14', // Brun très sombre
  textSecondary: '#4A3C2A', // Brun moyen
  textTertiary: '#6B5B47', // Brun clair
  textInverse: '#F5F5DC', // Beige naturel
  
  // Couleurs spéciales nature
  forest: '#228B22', // Vert forêt
  earth: '#8B4513', // Brun terre
  moss: '#4A7C59', // Vert mousse
  bark: '#5D4037', // Brun écorce
  leaf: '#4CAF50', // Vert feuille
  sky: '#87CEEB', // Bleu ciel
  sunset: '#FF7F50', // Orange coucher de soleil
  stone: '#708090', // Gris pierre
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 50,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
} as const;

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export const typography = {
  // Titres
  h1: {
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    lineHeight: 48,
  },
  h2: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    lineHeight: 40,
  },
  h3: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    lineHeight: 32,
  },
  h4: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    lineHeight: 28,
  },
  
  // Corps de texte
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  bodyLarge: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.normal,
    color: colors.textPrimary,
    lineHeight: 28,
  },
  
  // Labels
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  labelSmall: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  
  // Texte monospace (pour les coordonnées)
  mono: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    color: colors.textPrimary,
    fontFamily: 'monospace',
    lineHeight: 24,
  },
  monoSmall: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    color: colors.textSecondary,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
} as const;

export const buttonStyles = {
  // Style de base pour tous les boutons
  base: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg, // Plus arrondi pour un look naturel
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minHeight: 44,
    flexDirection: 'row' as const,
    ...shadows.sm, // Ombre subtile
  },
  
  // Variantes de couleurs - Nature sauvage
  primary: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primaryDark,
  },
  success: {
    backgroundColor: colors.success,
    borderWidth: 1,
    borderColor: colors.successDark,
  },
  warning: {
    backgroundColor: colors.warning,
    borderWidth: 1,
    borderColor: colors.earth,
  },
  error: {
    backgroundColor: colors.error,
    borderWidth: 1,
    borderColor: colors.bark,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  close: {
    backgroundColor: colors.gray200,
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  
  // Styles naturels spéciaux
  forest: {
    backgroundColor: colors.forest,
    borderWidth: 1,
    borderColor: colors.primaryDark,
  },
  earth: {
    backgroundColor: colors.earth,
    borderWidth: 1,
    borderColor: colors.bark,
  },
  moss: {
    backgroundColor: colors.moss,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  
  // Tailles
  small: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minHeight: 32,
    borderRadius: borderRadius.md,
  },
  large: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 56,
    borderRadius: borderRadius.xl,
  },
  
  // Texte des boutons
  text: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    color: colors.textInverse,
  },
  textOutline: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    color: colors.primary,
  },
  textClose: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
} as const;

export const cardStyles = {
  base: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  elevated: {
    ...shadows.md,
  },
  overlay: {
    backgroundColor: colors.backgroundOverlay,
  },
  
  // Styles naturels spéciaux
  forest: {
    backgroundColor: colors.gray50,
    borderColor: colors.forest,
    borderWidth: 2,
  },
  earth: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.earth,
    borderWidth: 2,
  },
  moss: {
    backgroundColor: colors.gray100,
    borderColor: colors.moss,
    borderWidth: 2,
  },
  bark: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.bark,
    borderWidth: 2,
  },
} as const;

export const inputStyles = {
  base: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: borderRadius.md,
    fontSize: fontSize.base,
    backgroundColor: colors.backgroundSecondary,
    color: colors.textPrimary,
  },
  focused: {
    borderColor: colors.primary,
  },
  error: {
    borderColor: colors.error,
  },
} as const;

export const layoutStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  column: {
    flexDirection: 'column' as const,
  },
  spaceBetween: {
    justifyContent: 'space-between' as const,
  },
  spaceAround: {
    justifyContent: 'space-around' as const,
  },
  spaceEvenly: {
    justifyContent: 'space-evenly' as const,
  },
} as const;

export const positionStyles = {
  absolute: {
    position: 'absolute' as const,
  },
  relative: {
    position: 'relative' as const,
  },
  fixed: {
    position: 'absolute' as const, // React Native n'a pas de position fixed
  },
} as const;

// Styles utilitaires pour les animations
export const animationStyles = {
  fadeIn: {
    opacity: 1,
  },
  fadeOut: {
    opacity: 0,
  },
  scaleIn: {
    transform: [{ scale: 1 }],
  },
  scaleOut: {
    transform: [{ scale: 0.9 }],
  },
  slideInUp: {
    transform: [{ translateY: 0 }],
  },
  slideOutDown: {
    transform: [{ translateY: 20 }],
  },
} as const;

// Styles spéciaux pour la faune et la nature
export const wildlifeStyles = {
  // Marqueurs d'animaux
  animalMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.forest,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  
  // Marqueur de position utilisateur
  userMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  
  // Labels d'observation
  observationLabel: {
    backgroundColor: colors.backgroundOverlay,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
    marginTop: spacing.xs,
    maxWidth: 120,
    ...shadows.sm,
  },
  
  // Cartes d'information nature
  natureCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.forest,
    ...shadows.md,
  },
  
  // Boutons de contrôle nature
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.backgroundOverlay,
    borderWidth: 1,
    borderColor: colors.forest,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    ...shadows.sm,
  },
  
  // Overlay d'informations
  infoOverlay: {
    backgroundColor: colors.backgroundOverlay,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadows.md,
  },
} as const;

// Styles pour les éléments de la carte
export const mapStyles = {
  // Conteneur de la carte
  mapContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Contrôles de la carte
  mapControls: {
    position: 'absolute' as const,
    top: 60,
    right: 20,
    gap: spacing.sm,
  },
  
  // Informations de position
  positionInfo: {
    position: 'absolute' as const,
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: colors.backgroundOverlay,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.forest,
    ...shadows.md,
  },
  
  // Texte des coordonnées
  coordinatesText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    textAlign: 'center' as const,
    fontFamily: 'monospace',
  },
  
  // Texte de précision
  accuracyText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center' as const,
    marginTop: spacing.xs,
  },
} as const;

// Export du thème complet
export const theme = {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  shadows,
  typography,
  buttonStyles,
  cardStyles,
  inputStyles,
  layoutStyles,
  positionStyles,
  animationStyles,
  wildlifeStyles,
  mapStyles,
} as const;

export default theme;
