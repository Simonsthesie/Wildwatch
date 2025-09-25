# 🔧 Guide de résolution des problèmes

## ❌ Erreur 401 - Authentification Gemini

### **Problème**
```
Erreur API Gemini: 401
Request had invalid authentication credentials
```

### **Causes possibles**
1. **Clé API invalide** : La clé n'est pas reconnue par Google
2. **Clé expirée** : La clé a été révoquée ou a expiré
3. **Projet incorrect** : La clé n'est pas associée au bon projet
4. **Quota dépassé** : Limite d'utilisation atteinte
5. **Permissions insuffisantes** : Le compte n'a pas accès à Gemini

### **Solutions**

#### **1. Générer une nouvelle clé API**

1. **Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)**
2. **Connectez-vous** avec votre compte Google
3. **Créez une nouvelle clé** :
   - Cliquez sur "Create API Key"
   - Sélectionnez votre projet
   - Copiez la nouvelle clé

#### **2. Vérifier les permissions**

1. **Allez sur [Google Cloud Console](https://console.cloud.google.com/)**
2. **Sélectionnez votre projet**
3. **Activez l'API Gemini** :
   - APIs & Services > Library
   - Recherchez "Generative Language API"
   - Cliquez sur "Enable"

#### **3. Mettre à jour la configuration**

1. **Éditez le fichier `.env`** :
   ```bash
   nano .env
   ```

2. **Remplacez la clé** :
   ```env
   EXPO_PUBLIC_GEMINI_API_KEY=votre_nouvelle_cle_ici
   ```

3. **Redémarrez l'application** :
   ```bash
   npm start
   ```

#### **4. Tester la nouvelle clé**

```bash
node scripts/test-gemini-api.js
```

### **Vérifications supplémentaires**

#### **Format de la clé**
- ✅ Doit commencer par `AIza`
- ✅ Longueur d'environ 39 caractères
- ✅ Pas d'espaces ou de caractères spéciaux

#### **Compte Google**
- ✅ Compte actif et vérifié
- ✅ Accès à Google AI Studio
- ✅ Pas de restrictions de sécurité

#### **Projet Google Cloud**
- ✅ Projet actif
- ✅ API Gemini activée
- ✅ Quota disponible

### **Tests de diagnostic**

#### **1. Vérifier la configuration**
```bash
node scripts/check-gemini-config.js
```

#### **2. Tester l'API**
```bash
node scripts/test-gemini-api.js
```

#### **3. Vérifier les logs**
```bash
npm start
# Regardez les logs dans le terminal
```

### **Messages d'erreur courants**

| Erreur | Cause | Solution |
|--------|-------|----------|
| `401 UNAUTHENTICATED` | Clé API invalide | Générer une nouvelle clé |
| `403 PERMISSION_DENIED` | Permissions insuffisantes | Vérifier les permissions du projet |
| `429 QUOTA_EXCEEDED` | Quota dépassé | Attendre ou augmenter le quota |
| `400 BAD_REQUEST` | Format de requête incorrect | Vérifier le code de l'application |

### **Support**

Si le problème persiste :

1. **Vérifiez la documentation** : [Gemini API Docs](https://ai.google.dev/docs)
2. **Consultez les forums** : [Google AI Community](https://developers.googleblog.com/2023/12/how-its-made-gemini-multimodal-prompting.html)
3. **Créez un nouveau projet** : Parfois un nouveau projet résout les problèmes

### **Prévention**

- **Sauvegardez vos clés** : Stockez-les dans un gestionnaire de mots de passe
- **Surveillez l'usage** : Vérifiez régulièrement votre quota
- **Testez régulièrement** : Utilisez les scripts de diagnostic
- **Mettez à jour** : Gardez vos dépendances à jour
