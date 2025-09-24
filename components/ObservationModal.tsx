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
            <Text style={styles.title}>Nouvelle observation</Text>
            <Text style={styles.subtitle}>
              Position: {coordinate[1].toFixed(6)}, {coordinate[0].toFixed(6)}
            </Text>
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
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  imageContainer: {
    marginBottom: 12,
  },
  imageWrapper: {
    position: 'relative',
    alignSelf: 'center',
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imagePlaceholder: {
    width: 200,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  imagePlaceholderText: {
    color: '#999',
    fontSize: 14,
  },
  imageButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  buttons: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
});
