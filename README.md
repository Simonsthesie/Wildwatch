# 🌿 Wildwatch - Application de Géolocalisation Nature

> **Application mobile React Native pour explorer et documenter la nature sauvage**

[![Expo](https://img.shields.io/badge/Expo-54.0.9-blue.svg)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![Mapbox](https://img.shields.io/badge/Mapbox-10.1.44-green.svg)](https://www.mapbox.com/)

## 📱 Aperçu

Wildwatch est une application mobile qui permet aux utilisateurs de :
- **Localiser** leur position GPS en temps réel
- **Documenter** leurs observations de la nature (animaux, plantes, champignons, oiseaux)
- **Explorer** une carte interactive avec leurs observations
- **Partager** leurs découvertes avec des icônes personnalisées

## ✨ Fonctionnalités

### 🗺️ Géolocalisation
- Position GPS en temps réel avec précision
- Affichage des coordonnées (latitude/longitude)
- Informations détaillées (altitude, vitesse, précision)
- Interface intuitive avec animations

### 🦌 Observations Nature
- **4 types d'observations** : Animaux, Champignons, Plantes, Oiseaux
- **Icônes personnalisées** : 🦌 🍄 🌿 🦅
- **Photos** : Prise de photo ou sélection depuis la galerie
- **Géolocalisation** : Chaque observation est liée à une position GPS

### 🗺️ Carte Interactive
- **Mapbox** intégration professionnelle
- **Marqueurs personnalisés** avec icônes d'observation
- **Navigation fluide** avec animations
- **Contrôles intuitifs** pour centrer sur la position

### 🎨 Interface Moderne
- **Thème nature sauvage** avec palette de couleurs cohérente
- **Animations fluides** et transitions
- **Design responsive** adapté mobile
- **Accessibilité** optimisée

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Expo CLI
- iOS Simulator (Mac) ou Android Studio (Windows/Linux)

### Installation rapide

```bash
# Cloner le projet
git clone <repository-url>
cd Wildwatch

# Installer les dépendances
npm install

# Démarrer l'application
npm start
```

### Commandes disponibles

```bash
# Démarrer en mode développement
npm start

# Lancer sur iOS
npm run ios

# Lancer sur Android  
npm run android

# Lancer sur web
npm run web

# Linter le code
npm run lint

# Rebuild complet
npm run prebuild
```

## 🏗️ Architecture

### Structure du projet

```
Wildwatch/
├── app/                    # Expo Router (pages)
│   ├── _layout.tsx        # Layout principal
│   └── index.tsx          # Page d'accueil
├── components/            # Composants React
│   ├── ui/               # Composants UI réutilisables
│   │   ├── Button.tsx    # Bouton personnalisé
│   │   └── ControlButton.tsx
│   ├── HomeScreen.tsx    # Écran d'accueil
│   ├── MapScreen.tsx     # Écran carte
│   ├── ObservationModal.tsx
│   └── EditObservationModal.tsx
├── services/             # Services métier
│   └── storageService.ts # Gestion AsyncStorage
├── hooks/               # Hooks personnalisés
│   └── useCurrentPosition.ts
├── types/               # Types TypeScript
│   └── observation.ts
├── styles/              # Système de styles
│   ├── theme.ts         # Thème centralisé
│   ├── global.css       # Styles CSS globaux
│   └── README.md        # Documentation styles
├── utils/               # Utilitaires
│   └── formatters.ts    # Fonctions de formatage
├── constants/           # Constantes
│   └── index.ts
└── config/              # Configuration
    └── mapbox.ts        # Configuration Mapbox
```

### Technologies utilisées

- **React Native 0.81.4** - Framework mobile
- **Expo 54.0.9** - Plateforme de développement
- **TypeScript 5.9.2** - Typage statique
- **Mapbox 10.1.44** - Cartes interactives
- **AsyncStorage** - Stockage local
- **Expo Location** - Géolocalisation
- **Expo Image Picker** - Gestion des images

## 🎨 Système de Design

### Palette de couleurs
- **Vert forêt** : `#2D5016` (Primary)
- **Vert mousse** : `#4A7C59` (Secondary)
- **Brun terre** : `#8B4513` (Accent)
- **Beige naturel** : `#F5F5DC` (Background)

### Composants UI
- **Button** : Boutons avec variants (primary, success, danger, etc.)
- **ControlButton** : Boutons de contrôle pour la carte
- **Modals** : Modales pour les observations
- **Cards** : Cartes d'information stylisées

## 📱 Captures d'écran

### Écran d'accueil
- Position GPS en temps réel
- Coordonnées détaillées
- Actions rapides (Carte, Actualiser)

### Carte interactive
- Marqueurs d'observations personnalisés
- Navigation fluide
- Contrôles intuitifs

### Création d'observation
- Sélection du type (Animal, Champignon, Plante, Oiseau)
- Prise de photo ou galerie
- Géolocalisation automatique

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine :

```env
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```

### Configuration Mapbox

1. Créez un compte [Mapbox](https://www.mapbox.com/)
2. Générez un token d'accès
3. Ajoutez-le dans `.env`
4. Redémarrez l'application

## 🧪 Tests

```bash
# Lancer les tests (à implémenter)
npm test

# Tests avec coverage
npm run test:coverage
```

## 📦 Build et déploiement

### Build de production

```bash
# Build pour iOS
expo build:ios

# Build pour Android
expo build:android

# Build pour web
expo build:web
```

### Publication

```bash
# Publier sur Expo
expo publish

# Publier sur les stores
expo build:ios --type archive
expo build:android --type apk
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

Développé avec ❤️ pour explorer la nature sauvage.

## 🆘 Support

Pour toute question ou problème :
- Ouvrez une [issue](https://github.com/your-repo/issues)
- Consultez la [documentation](https://docs.expo.dev/)
- Rejoignez la [communauté Expo](https://chat.expo.dev/)

---

**🌿 Explorez la nature sauvage avec Wildwatch ! 🦌**