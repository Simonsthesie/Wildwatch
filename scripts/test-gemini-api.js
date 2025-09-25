#!/usr/bin/env node

/**
 * Script de test pour vérifier la clé API Gemini
 */

// Charger les variables d'environnement
require('dotenv').config();

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent';

async function testGeminiAPI() {
  console.log('🧪 Test de l\'API Gemini...\n');
  
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.log('❌ Clé API non trouvée dans les variables d\'environnement');
    return;
  }
  
  console.log(`🔑 Clé API : ${apiKey.substring(0, 10)}...`);
  
  try {
    // Test simple avec une requête textuelle (API Gemini 1.5 Flash)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Réponds simplement 'API fonctionnelle' si tu reçois ce message."
          }]
        }]
      })
    });
    
    console.log(`📊 Statut de la réponse : ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API Gemini fonctionnelle !');
      console.log('📝 Réponse :', data.candidates?.[0]?.content?.parts?.[0]?.text || 'Aucune réponse');
    } else {
      const errorText = await response.text();
      console.log('❌ Erreur API :', response.status);
      console.log('📝 Détails :', errorText);
      
      if (response.status === 401) {
        console.log('\n🔧 SOLUTIONS POSSIBLES :');
        console.log('1. Vérifiez que votre clé API est correcte');
        console.log('2. Vérifiez que votre compte Google a accès à Gemini');
        console.log('3. Vérifiez que votre quota n\'est pas dépassé');
        console.log('4. Essayez de générer une nouvelle clé API');
      }
    }
    
  } catch (error) {
    console.log('❌ Erreur de connexion :', error.message);
  }
}

testGeminiAPI();
