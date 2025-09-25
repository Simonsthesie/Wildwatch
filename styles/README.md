# 🌿 Styles Wildwatch - Thème Nature Sauvage

Ce dossier contient tous les styles centralisés pour l'application Wildwatch avec un thème inspiré de la nature sauvage.

## 📁 Structure

```
styles/
├── global.css          # Styles CSS globaux (pour web si nécessaire)
├── theme.ts           # Thème TypeScript pour React Native
├── index.ts           # Point d'entrée des exports
├── examples.tsx       # Exemples d'utilisation du thème
└── README.md          # Documentation
```

## 🚀 Utilisation

### Import des styles

```typescript
import { theme, colors, spacing, buttonStyles, wildlifeStyles, mapStyles } from '../styles';
```

### Exemple d'utilisation dans un composant

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme, colors, spacing, typography } from '../styles';

const MyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Titre</Text>
      <Text style={styles.subtitle}>Sous-titre</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.layoutStyles.container,
    padding: theme.spacing.md,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
});
```

## 🎨 Variables disponibles

### Couleurs - Palette Nature Sauvage
- `colors.primary` - Vert forêt profond (#2D5016)
- `colors.success` - Vert forest (#228B22)
- `colors.warning` - Or sauvage (#DAA520)
- `colors.error` - Brun terre (#8B4513)
- `colors.forest` - Vert forêt (#228B22)
- `colors.earth` - Brun terre (#8B4513)
- `colors.moss` - Vert mousse (#4A7C59)
- `colors.bark` - Brun écorce (#5D4037)
- `colors.leaf` - Vert feuille (#4CAF50)
- `colors.sky` - Bleu ciel (#87CEEB)
- `colors.sunset` - Orange coucher (#FF7F50)
- `colors.stone` - Gris pierre (#708090)

### Espacement
- `spacing.xs` - 4px
- `spacing.sm` - 8px
- `spacing.md` - 16px
- `spacing.lg` - 24px
- `spacing.xl` - 32px

### Typographie
- `typography.h1` - Titre principal
- `typography.h2` - Titre secondaire
- `typography.body` - Corps de texte
- `typography.label` - Label de formulaire
- `typography.mono` - Texte monospace (coordonnées)

### Boutons - Styles Sauvages
- `buttonStyles.base` - Style de base
- `buttonStyles.primary` - Bouton principal (vert forêt)
- `buttonStyles.success` - Bouton de succès (vert forest)
- `buttonStyles.forest` - Bouton forêt
- `buttonStyles.earth` - Bouton terre
- `buttonStyles.moss` - Bouton mousse
- `buttonStyles.outline` - Bouton avec bordure

### Cartes - Styles Nature
- `cardStyles.base` - Style de base
- `cardStyles.elevated` - Carte avec ombre
- `cardStyles.overlay` - Carte transparente
- `cardStyles.forest` - Carte forêt
- `cardStyles.earth` - Carte terre
- `cardStyles.moss` - Carte mousse
- `cardStyles.bark` - Carte écorce

### Styles Faune et Nature
- `wildlifeStyles.animalMarker` - Marqueur d'animal
- `wildlifeStyles.userMarker` - Marqueur utilisateur
- `wildlifeStyles.observationLabel` - Label d'observation
- `wildlifeStyles.natureCard` - Carte d'information nature
- `wildlifeStyles.controlButton` - Bouton de contrôle nature
- `wildlifeStyles.infoOverlay` - Overlay d'informations

### Styles Carte
- `mapStyles.mapContainer` - Conteneur de la carte
- `mapStyles.mapControls` - Contrôles de la carte
- `mapStyles.positionInfo` - Informations de position
- `mapStyles.coordinatesText` - Texte des coordonnées
- `mapStyles.accuracyText` - Texte de précision

## 🔧 Personnalisation

Pour modifier les couleurs ou l'espacement, éditez le fichier `theme.ts` :

```typescript
export const colors = {
  primary: '#2D5016', // Vert forêt profond
  forest: '#228B22', // Vert forêt
  earth: '#8B4513', // Brun terre
  moss: '#4A7C59', // Vert mousse
  // ...
};
```

## 📱 Responsive Design

Les styles sont optimisés pour mobile avec :
- Tailles tactiles minimales (44px pour les boutons)
- Espacement adaptatif
- Typographie lisible

## ♿ Accessibilité

- Contraste de couleurs respecté
- Tailles de police lisibles
- Zones tactiles suffisantes
- Support des préférences système

## 🌙 Mode sombre - Nuit Sauvage

Le thème supporte le mode sombre avec des couleurs inspirées de la nuit sauvage :

```typescript
// Dans votre composant
const isDark = useColorScheme() === 'dark';

const styles = StyleSheet.create({
  container: {
    backgroundColor: isDark ? colors.gray900 : colors.background,
  },
});
```

## 🦌 Exemples d'utilisation

Consultez le fichier `examples.tsx` pour des exemples concrets d'utilisation du thème sauvage :

- Boutons avec styles nature (forêt, terre, mousse)
- Cartes d'observation sauvages
- Marqueurs d'animaux
- Overlays d'informations nature
- Boutons de contrôle sauvages

## 🌿 Inspiration Nature

Le thème s'inspire de :
- **Forêt** : Verts profonds et mousse
- **Terre** : Bruns et écorces
- **Ciel** : Bleus et oranges de coucher
- **Pierre** : Gris naturels
- **Faune** : Couleurs d'animaux sauvages
