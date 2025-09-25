# Configuration de l'identification d'image avec Gemini AI

## 🔍 Fonctionnalité d'identification d'image

Wildwatch utilise l'API Gemini de Google pour identifier automatiquement les plantes, animaux et champignons à partir de photos.

## 🚀 Configuration

### 1. Obtenir une clé API Gemini

1. **Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)**
2. **Connectez-vous** avec votre compte Google
3. **Créez une nouvelle clé API** :
   - Cliquez sur "Create API Key"
   - Sélectionnez votre projet ou créez-en un nouveau
   - Copiez la clé générée

### 2. Configurer la clé dans votre projet

#### Option A : Fichier .env (Recommandé)
```bash
# Créez un fichier .env à la racine du projet
touch .env
```

Ajoutez votre clé dans le fichier `.env` :
```env
# Configuration Mapbox
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here

# Configuration Gemini AI
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

#### Option B : Variables d'environnement système
```bash
export EXPO_PUBLIC_GEMINI_API_KEY="your_gemini_api_key_here"
```

### 3. Redémarrer l'application

```bash
npm start
# ou
expo start
```

## 🎯 Utilisation

### Dans l'application :
1. **Prenez une photo** ou sélectionnez une image
2. **Cliquez sur "🔍 Identifier"** (bouton vert qui apparaît)
3. **L'IA analyse** l'image et propose une identification
4. **Utilisez le résultat** pour pré-remplir le formulaire

### Fonctionnalités :
- ✅ **Identification automatique** : Plantes, animaux, champignons
- ✅ **Noms scientifiques** : Classification taxonomique précise
- ✅ **Informations de sécurité** : Alertes pour espèces dangereuses
- ✅ **Habitat naturel** : Contexte environnemental
- ✅ **Confiance** : Score de fiabilité de l'identification

## 🔧 Dépannage

### Erreur "API Gemini non configurée"
- Vérifiez que votre clé API est dans le fichier `.env`
- Redémarrez l'application après avoir ajouté la clé
- Vérifiez que la variable commence par `EXPO_PUBLIC_`

### Erreur "Erreur API Gemini"
- Vérifiez que votre clé API est valide
- Vérifiez votre quota d'utilisation sur Google AI Studio
- Vérifiez votre connexion internet

### L'identification ne fonctionne pas
- Vérifiez que l'image est claire et bien éclairée
- Essayez avec une image plus nette
- Vérifiez que l'objet est bien visible dans l'image

## 💡 Conseils pour de meilleurs résultats

### Photos optimales :
- ✅ **Éclairage naturel** : Évitez les ombres dures
- ✅ **Objet centré** : L'élément à identifier doit être au centre
- ✅ **Résolution suffisante** : Image nette et détaillée
- ✅ **Arrière-plan simple** : Évitez les distractions

### Types d'identification :
- 🌿 **Plantes** : Feuilles, fleurs, fruits, écorce
- 🦌 **Animaux** : Corps entier, profil, détails caractéristiques
- 🍄 **Champignons** : Chapeau, pied, lamelles visibles

## 📊 Limites et quotas

- **Quota gratuit** : Limité par Google
- **Taille d'image** : Maximum 4MB
- **Formats supportés** : JPEG, PNG, WebP
- **Résolution** : Recommandé 1024x1024 minimum

## 🔒 Sécurité

- Votre clé API est stockée localement
- Aucune donnée n'est partagée avec des tiers
- Les images sont analysées par Google Gemini
- Respect de la vie privée et des données personnelles

## 🆘 Support

En cas de problème :
1. Vérifiez la configuration de votre clé API
2. Consultez les logs de l'application
3. Testez avec une image simple et claire
4. Vérifiez votre quota sur Google AI Studio
