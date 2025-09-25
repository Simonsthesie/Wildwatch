#!/usr/bin/env node

/**
 * Script de test pour l'identification d'image avec Gemini
 */

require('dotenv').config();

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

async function testImageIdentification() {
  console.log('🖼️ Test de l\'identification d\'image avec Gemini...\n');
  
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.log('❌ Clé API non trouvée');
    return;
  }
  
  console.log(`🔑 Clé API : ${apiKey.substring(0, 10)}...`);
  
  try {
    // Test avec une image factice (base64 d'une image 1x1 pixel transparent)
    const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: "Identifie cette image de nature. Réponds au format JSON : {\"name\": \"Test\", \"scientificName\": \"Test sp.\", \"family\": \"Testaceae\", \"description\": \"Image de test\", \"habitat\": \"Test\", \"safety\": \"safe\", \"confidence\": 0.5, \"category\": \"unknown\"}"
            },
            {
              inline_data: {
                mime_type: "image/png",
                data: testImageBase64
              }
            }
          ]
        }]
      })
    });
    
    console.log(`📊 Statut de la réponse : ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API Gemini Vision fonctionnelle !');
      console.log('📝 Réponse :', data.candidates?.[0]?.content?.parts?.[0]?.text || 'Aucune réponse');
    } else {
      const errorText = await response.text();
      console.log('❌ Erreur API :', response.status);
      console.log('📝 Détails :', errorText);
    }
    
  } catch (error) {
    console.log('❌ Erreur de connexion :', error.message);
  }
}

testImageIdentification();
