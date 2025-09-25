import React, { useState } from 'react';
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { IdentificationResult } from '../services/imageIdentificationService';
import { colors, theme, typography } from '../styles';

interface ImageIdentificationModalProps {
  visible: boolean;
  onClose: () => void;
  onUseResult: (result: IdentificationResult) => void;
  imageUri: string;
}

export const ImageIdentificationModal: React.FC<ImageIdentificationModalProps> = ({
  visible,
  onClose,
  onUseResult,
  imageUri,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IdentificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleIdentify = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { ImageIdentificationService } = await import('../services/imageIdentificationService');
      
      if (!ImageIdentificationService.isConfigured()) {
        throw new Error('API Gemini non configurée. Veuillez ajouter votre clé API.');
      }

      const identificationResult = await ImageIdentificationService.identifyImage(imageUri);
      setResult(identificationResult);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error('Erreur identification:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseResult = () => {
    if (result) {
      onUseResult(result);
      onClose();
    }
  };

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case 'safe': return colors.success;
      case 'caution': return colors.warning;
      case 'dangerous': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getSafetyIcon = (safety: string) => {
    switch (safety) {
      case 'safe': return '✅';
      case 'caution': return '⚠️';
      case 'dangerous': return '☠️';
      default: return '❓';
    }
  };

  const getSafetyText = (safety: string) => {
    switch (safety) {
      case 'safe': return 'Sûr';
      case 'caution': return 'Précautions nécessaires';
      case 'dangerous': return 'Dangereux';
      default: return 'Inconnu';
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>🔍 Identification d'image</Text>
            <Text style={styles.subtitle}>Analyse en cours...</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Contenu */}
        <View style={styles.content}>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Analyse de l'image...</Text>
              <Text style={styles.loadingSubtext}>
                L'IA identifie la plante, l'animal ou le champignon
              </Text>
            </View>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorIcon}>❌</Text>
              <Text style={styles.errorTitle}>Erreur d'identification</Text>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={handleIdentify}>
                <Text style={styles.retryButtonText}>Réessayer</Text>
              </TouchableOpacity>
            </View>
          )}

          {result && !isLoading && (
            <View style={styles.resultContainer}>
              {/* Résultat principal */}
              <View style={styles.resultHeader}>
                <Text style={styles.resultIcon}>
                  {result.category === 'plant' ? '🌿' : 
                   result.category === 'animal' ? '🦌' : 
                   result.category === 'fungus' ? '🍄' : '🔍'}
                </Text>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultName}>{result.name}</Text>
                  <Text style={styles.resultScientific}>{result.scientificName}</Text>
                  <Text style={styles.resultFamily}>{result.family}</Text>
                </View>
                <View style={styles.confidenceContainer}>
                  <Text style={styles.confidenceText}>
                    {Math.round(result.confidence * 100)}%
                  </Text>
                </View>
              </View>

              {/* Description */}
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.descriptionText}>{result.description}</Text>
              </View>

              {/* Habitat */}
              <View style={styles.habitatContainer}>
                <Text style={styles.habitatTitle}>Habitat</Text>
                <Text style={styles.habitatText}>{result.habitat}</Text>
              </View>

              {/* Sécurité */}
              <View style={styles.safetyContainer}>
                <View style={styles.safetyHeader}>
                  <Text style={styles.safetyTitle}>Sécurité</Text>
                  <View style={[styles.safetyBadge, { backgroundColor: getSafetyColor(result.safety) }]}>
                    <Text style={styles.safetyIcon}>{getSafetyIcon(result.safety)}</Text>
                    <Text style={styles.safetyText}>{getSafetyText(result.safety)}</Text>
                  </View>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.useButton} onPress={handleUseResult}>
                  <Text style={styles.useButtonText}>Utiliser ce résultat</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {!isLoading && !error && !result && (
            <View style={styles.startContainer}>
              <Text style={styles.startIcon}>🔍</Text>
              <Text style={styles.startTitle}>Identifier cette image</Text>
              <Text style={styles.startText}>
                L'IA va analyser votre photo pour identifier la plante, l'animal ou le champignon.
              </Text>
              <TouchableOpacity style={styles.startButton} onPress={handleIdentify}>
                <Text style={styles.startButtonText}>Commencer l'identification</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: theme.spacing.lg,
    backgroundColor: colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: theme.fontSize.lg,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  loadingSubtext: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.lg,
  },
  errorTitle: {
    ...typography.h3,
    color: colors.error,
    marginBottom: theme.spacing.sm,
  },
  errorText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  retryButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: colors.primary,
  },
  retryButtonText: {
    ...typography.button,
    color: colors.textInverse,
  },
  resultContainer: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: theme.borderRadius.lg,
  },
  resultIcon: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  resultScientific: {
    ...typography.body,
    color: colors.primary,
    fontStyle: 'italic',
    marginBottom: theme.spacing.xs,
  },
  resultFamily: {
    ...typography.small,
    color: colors.textSecondary,
  },
  confidenceContainer: {
    alignItems: 'center',
  },
  confidenceText: {
    ...typography.h4,
    color: colors.primary,
    fontWeight: theme.fontWeight.bold,
  },
  descriptionContainer: {
    marginBottom: theme.spacing.lg,
  },
  descriptionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  descriptionText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  habitatContainer: {
    marginBottom: theme.spacing.lg,
  },
  habitatTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  habitatText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  safetyContainer: {
    marginBottom: theme.spacing.xl,
  },
  safetyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  safetyTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  safetyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
  },
  safetyIcon: {
    fontSize: theme.fontSize.sm,
    marginRight: theme.spacing.xs,
  },
  safetyText: {
    ...typography.small,
    color: colors.textInverse,
    fontWeight: theme.fontWeight.semibold,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: colors.gray100,
    alignItems: 'center',
  },
  cancelButtonText: {
    ...typography.button,
    color: colors.textSecondary,
  },
  useButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  useButtonText: {
    ...typography.button,
    color: colors.textInverse,
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  startIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.lg,
  },
  startTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  startText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  startButton: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: colors.primary,
  },
  startButtonText: {
    ...typography.button,
    color: colors.textInverse,
    fontSize: theme.fontSize.lg,
  },
});
