import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, inputStyles, theme, typography } from '../styles';
import { ObservationFormData } from '../types/observation';
import { Button } from './ui';

interface ObservationModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: ObservationFormData) => void;
  coordinate: [number, number];
}

export const ObservationModal: React.FC<ObservationModalProps> = ({
  visible,
  onClose,
  onSave,
  coordinate,
}) => {
  const [formData, setFormData] = useState<ObservationFormData>({
    name: '',
    date: new Date().toISOString().split('T')[0],
    imageUri: undefined,
    icon: '🦌',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleImagePicker = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission requise', 'Veuillez autoriser l\'accès à la galerie photo.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setFormData(prev => ({ ...prev, imageUri: result.assets[0].uri }));
      }
    } catch (error) {
      console.error('Erreur lors de la sélection d\'image:', error);
      Alert.alert('Erreur', 'Impossible de sélectionner l\'image.');
    }
  };

  const handleCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission requise', 'Veuillez autoriser l\'accès à l\'appareil photo.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setFormData(prev => ({ ...prev, imageUri: result.assets[0].uri }));
      }
    } catch (error) {
      console.error('Erreur lors de la prise de photo:', error);
      Alert.alert('Erreur', 'Impossible de prendre la photo.');
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Erreur', 'Veuillez renseigner le nom de l\'observation.');
      return;
    }

    setIsLoading(true);
    try {
      await onSave(formData);
      setFormData({
        name: '',
        date: new Date().toISOString().split('T')[0],
        imageUri: undefined,
        icon: '🦌',
      });
      onClose();
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de sauvegarder l\'observation.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      date: new Date().toISOString().split('T')[0],
      imageUri: undefined,
      icon: '🦌',
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.header}>
                <View style={styles.headerContent}>
                  <Text style={styles.title}>🦌 Nouvelle observation</Text>
                  <Text style={styles.subtitle}>
                    📍 {coordinate[1].toFixed(6)}, {coordinate[0].toFixed(6)}
                  </Text>
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{"Nom de l'animal *"}</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                placeholder="Ex: Renard roux, Aigle royal..."
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Type d'observation</Text>
              <View style={styles.iconSelector}>
                {[
                  { icon: '🦌', label: 'Animal' },
                  { icon: '🍄', label: 'Champignon' },
                  { icon: '🌿', label: 'Plante' },
                  { icon: '🦅', label: 'Oiseau' },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.icon}
                    style={[
                      styles.iconOption,
                      formData.icon === option.icon && styles.iconOptionSelected
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, icon: option.icon }))}
                  >
                    <Text style={styles.iconText}>{option.icon}</Text>
                    <Text style={[
                      styles.iconLabel,
                      formData.icon === option.icon && styles.iconLabelSelected
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{"Date d'observation"}</Text>
              <TextInput
                style={styles.input}
                value={formData.date}
                onChangeText={(text) => setFormData(prev => ({ ...prev, date: text }))}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Photo</Text>
              <View style={styles.imageContainer}>
                {formData.imageUri ? (
                  <View style={styles.imageWrapper}>
                    <Image source={{ uri: formData.imageUri }} style={styles.image} />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => setFormData(prev => ({ ...prev, imageUri: undefined }))}
                    >
                      <Text style={styles.removeImageText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderText}>Aucune image</Text>
                  </View>
                )}
              </View>
              <View style={styles.imageButtons}>
                <Button 
                  title="📷 Appareil photo" 
                  onPress={handleCamera} 
                  variant="primary"
                  size="small"
                />
                <Button 
                  title="🖼️ Galerie" 
                  onPress={handleImagePicker} 
                  variant="primary"
                  size="small"
                />
              </View>
            </View>
          </View>

          <View style={styles.buttons}>
            <Button 
              title="Annuler" 
              onPress={handleCancel} 
              variant="outline"
            />
            <Button 
              title={isLoading ? 'Enregistrement...' : 'Enregistrer'} 
              onPress={handleSave} 
              variant="success"
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: theme.spacing.lg,
    backgroundColor: colors.primary,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    ...typography.h3,
    color: colors.textInverse,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...typography.monoSmall,
    color: colors.textInverse,
    opacity: 0.9,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.md,
  },
  closeButtonText: {
    color: colors.textInverse,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  },
  form: {
    padding: theme.spacing.lg,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    ...inputStyles.base,
  },
  imageContainer: {
    marginBottom: theme.spacing.sm,
  },
  imageWrapper: {
    position: 'relative',
    alignSelf: 'center',
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: theme.borderRadius.md,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: colors.textInverse,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
  },
  imagePlaceholder: {
    width: 200,
    height: 150,
    borderRadius: theme.borderRadius.md,
    backgroundColor: colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  imagePlaceholderText: {
    color: colors.textTertiary,
    fontSize: theme.fontSize.sm,
  },
  imageButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  buttons: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  iconSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  iconOption: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: colors.gray100,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  iconText: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  iconLabel: {
    ...typography.body,
    fontSize: theme.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  iconLabelSelected: {
    color: colors.textInverse,
    fontWeight: theme.fontWeight.semibold,
  },
});
