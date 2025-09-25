#!/usr/bin/env node

/**
 * Script de diagnostic pour vérifier la configuration Gemini
 */

console.log('🔍 Diagnostic de la configuration Gemini...\n');

// Vérifier les variables d'environnement
const geminiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const mapboxKey = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

console.log('📋 Variables d\'environnement :');
console.log(`   EXPO_PUBLIC_GEMINI_API_KEY: ${geminiKey ? '✅ Configurée' : '❌ Non configurée'}`);
console.log(`   EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN: ${mapboxKey ? '✅ Configurée' : '❌ Non configurée'}`);

if (!geminiKey) {
  console.log('\n❌ PROBLÈME : Clé API Gemini non trouvée');
  console.log('\n🔧 SOLUTION :');
  console.log('1. Créez un fichier .env à la racine du projet');
  console.log('2. Ajoutez votre clé API :');
  console.log('   EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here');
  console.log('3. Redémarrez l\'application');
  console.log('\n📖 Guide complet : GEMINI_SETUP.md');
} else {
  console.log('\n✅ Clé API Gemini trouvée');
  console.log(`   Longueur : ${geminiKey.length} caractères`);
  console.log(`   Commence par : ${geminiKey.substring(0, 10)}...`);
  
  // Vérifier le format de la clé
  if (geminiKey.startsWith('AIza')) {
    console.log('✅ Format de clé valide (commence par AIza)');
  } else {
    console.log('⚠️  Format de clé suspect (devrait commencer par AIza)');
  }
}

console.log('\n🔗 Liens utiles :');
console.log('   - Google AI Studio : https://makersuite.google.com/app/apikey');
console.log('   - Documentation Gemini : https://ai.google.dev/docs');
console.log('   - Guide Wildwatch : GEMINI_SETUP.md');
