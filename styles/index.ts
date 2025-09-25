/**
 * WILDWATCH - EXPORT DES STYLES
 * Point d'entrée centralisé pour tous les styles de l'application
 */

export { animationStyles, borderRadius, buttonStyles, cardStyles, colors, fontSize, fontWeight, inputStyles, layoutStyles, mapStyles, positionStyles, shadows, spacing, theme, typography, wildlifeStyles } from './theme';

// Re-export du thème par défaut
export { theme as default } from './theme';

// Types TypeScript pour une meilleure intégration
export type Theme = typeof theme;
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type Shadows = typeof shadows;
export type Typography = typeof typography;
export type ButtonStyles = typeof buttonStyles;
export type CardStyles = typeof cardStyles;
export type InputStyles = typeof inputStyles;
export type LayoutStyles = typeof layoutStyles;
export type PositionStyles = typeof positionStyles;
export type AnimationStyles = typeof animationStyles;
export type WildlifeStyles = typeof wildlifeStyles;
export type MapStyles = typeof mapStyles;
