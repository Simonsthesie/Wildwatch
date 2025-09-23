# Configuration Mapbox

## ✅ Configuration terminée !

Vos tokens Mapbox sont configurés via les variables d'environnement dans le fichier `.env` :

- **Token public** : Configuré via `EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN`
- **Token de téléchargement** : Configuré via `MAPBOX_DOWNLOAD_TOKEN`

## Configuration sécurisée

Les tokens sont configurés via les variables d'environnement dans :
- `.env` - Fichier de configuration local (NE PAS COMMITER)
- `.env.example` - Modèle de configuration (à copier vers .env)
- `config/mapbox.ts` - Configuration des tokens
- `app.config.js` - Configuration Expo avec les permissions

### 4. Configuration native (si nécessaire)
Le prebuild a déjà configuré les fichiers natifs, mais si vous rencontrez des problèmes :

#### iOS
- Le token est automatiquement configuré dans `ios/Wildwatch/Info.plist`
- Si vous modifiez le token, relancez `npm run prebuild`

#### Android
- Le token est automatiquement configuré dans `android/app/src/main/res/values/strings.xml`
- Si vous modifiez le token, relancez `npm run prebuild`

### 5. Tester l'application
1. Lancez l'application : `npm run ios` ou `npm run android`
2. Accordez les permissions de localisation
3. Appuyez sur "🗺️ Voir sur la carte" pour ouvrir la carte plein écran

## Fonctionnalités de la carte

- **Carte plein écran** : Interface immersive pour visualiser la position
- **Centrage automatique** : La carte se centre sur la position de l'utilisateur
- **Marqueur personnalisé** : Point de localisation avec icône
- **Contrôles** : Bouton pour recentrer et fermer la carte
- **Informations en temps réel** : Coordonnées et précision affichées
- **Navigation fluide** : Zoom, rotation et déplacement activés

## Styles de carte disponibles

Vous pouvez modifier le style de carte dans `config/mapbox.ts` :

- `mapbox://styles/mapbox/streets-v12` (par défaut)
- `mapbox://styles/mapbox/outdoors-v12`
- `mapbox://styles/mapbox/light-v11`
- `mapbox://styles/mapbox/dark-v11`
- `mapbox://styles/mapbox/satellite-v9`
- `mapbox://styles/mapbox/satellite-streets-v12`

## Dépannage

### Erreur "Mapbox token not found"
- Vérifiez que votre token est correctement configuré dans `config/mapbox.ts`
- Relancez `npm run prebuild` après modification du token

### Carte ne s'affiche pas
- Vérifiez votre connexion internet
- Vérifiez que le token Mapbox est valide
- Consultez les logs de l'application pour plus de détails

### Permissions de localisation
- L'application demande automatiquement les permissions
- Si refusées, utilisez le bouton "Ouvrir les paramètres" pour les activer manuellement
