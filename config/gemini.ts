/**
 * Configuration pour l'API Gemini
 * 
 * Pour obtenir une clé API Gemini :
 * 1. Allez sur https://makersuite.google.com/app/apikey
 * 2. Connectez-vous avec votre compte Google
 * 3. Créez une nouvelle clé API
 * 4. Ajoutez-la à votre fichier .env comme EXPO_PUBLIC_GEMINI_API_KEY
 */

export const GEMINI_CONFIG = {
  API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
  MODEL: 'gemini-1.5-flash',
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.1, // Faible température pour plus de précision
} as const;

export const getGeminiApiKey = (): string | null => {
  return process.env.EXPO_PUBLIC_GEMINI_API_KEY || null;
};

export const isGeminiConfigured = (): boolean => {
  return !!getGeminiApiKey();
};
