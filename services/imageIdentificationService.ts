import * as FileSystem from 'expo-file-system/legacy';
import { GEMINI_CONFIG, getGeminiApiKey, isGeminiConfigured } from '../config/gemini';

export interface IdentificationResult {
  name: string;
  scientificName: string;
  family: string;
  description: string;
  habitat: string;
  safety: 'safe' | 'caution' | 'dangerous';
  confidence: number;
  category: 'plant' | 'animal' | 'fungus' | 'unknown';
}

export class ImageIdentificationService {
  
  /**
   * Identifie une image de nature en utilisant l'API Gemini
   */
  static async identifyImage(imageUri: string): Promise<IdentificationResult> {
    try {
      // Convertir l'image en base64
      const base64Image = await this.convertImageToBase64(imageUri);
      
      // Appel à l'API Gemini
      const response = await fetch(`${GEMINI_CONFIG.API_URL}?key=${getGeminiApiKey()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: this.getPrompt()
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Image
                }
              }
            ]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur API Gemini: ${response.status}`);
      }

      const data = await response.json();
      return this.parseGeminiResponse(data);
      
    } catch (error) {
      console.error('Erreur identification image:', error);
      return this.getDefaultResult();
    }
  }

  /**
   * Convertit une image en base64
   */
  private static async convertImageToBase64(imageUri: string): Promise<string> {
    try {
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (error) {
      console.error('Erreur conversion base64:', error);
      throw new Error('Impossible de convertir l\'image. Vérifiez que le fichier existe et est accessible.');
    }
  }

  /**
   * Prompt pour l'identification
   */
  private static getPrompt(): string {
    return `Identifie cette image de nature (plante, animal ou champignon). 

Réponds UNIQUEMENT au format JSON suivant :
{
  "name": "Nom commun en français",
  "scientificName": "Nom scientifique (genre espèce)",
  "family": "Famille taxonomique",
  "description": "Description courte (2-3 phrases)",
  "habitat": "Habitat naturel et distribution",
  "safety": "safe|caution|dangerous",
  "confidence": 0.95,
  "category": "plant|animal|fungus|unknown"
}

Critères de sécurité :
- "safe" : Espèce inoffensive
- "caution" : Précautions nécessaires (allergies, épines, etc.)
- "dangerous" : Espèce toxique, venimeuse ou dangereuse

Sois précis et scientifique dans ton identification.`;
  }

  /**
   * Parse la réponse de Gemini
   */
  private static parseGeminiResponse(data: any): IdentificationResult {
    try {
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!content) {
        throw new Error('Réponse vide de Gemini');
      }

      // Extraire le JSON de la réponse
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Format JSON non trouvé');
      }

      const result = JSON.parse(jsonMatch[0]);
      
      return {
        name: result.name || 'Inconnu',
        scientificName: result.scientificName || 'Non identifié',
        family: result.family || 'Famille inconnue',
        description: result.description || 'Description non disponible',
        habitat: result.habitat || 'Habitat non spécifié',
        safety: result.safety || 'safe',
        confidence: result.confidence || 0.5,
        category: result.category || 'unknown'
      };
      
    } catch (error) {
      console.error('Erreur parsing Gemini:', error);
      return this.getDefaultResult();
    }
  }

  /**
   * Résultat par défaut en cas d'erreur
   */
  private static getDefaultResult(): IdentificationResult {
    return {
      name: 'Non identifié',
      scientificName: 'Non identifié',
      family: 'Famille inconnue',
      description: 'Impossible d\'identifier cette image. Veuillez réessayer ou saisir manuellement.',
      habitat: 'Habitat non spécifié',
      safety: 'safe',
      confidence: 0,
      category: 'unknown'
    };
  }

  /**
   * Vérifie si l'API Gemini est configurée
   */
  static isConfigured(): boolean {
    return isGeminiConfigured();
  }

  /**
   * Obtient des suggestions d'icônes basées sur la catégorie
   */
  static getIconSuggestion(category: string): string {
    switch (category) {
      case 'plant':
        return '🌿';
      case 'animal':
        return '🦌';
      case 'fungus':
        return '🍄';
      default:
        return '🔍';
    }
  }
}
