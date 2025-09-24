import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './ui';

interface UnauthorizedScreenProps {
  onOpenSettings: () => void;
  onRetry: () => void;
}

export const UnauthorizedScreen: React.FC<UnauthorizedScreenProps> = ({ 
  onOpenSettings, 
  onRetry 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📍</Text>
      </View>
      
      <Text style={styles.title}>Localisation requise</Text>
      
      <Text style={styles.description}>
        Wildwatch a besoin d'accéder à votre position pour vous fournir les meilleures informations sur la faune locale.
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Ouvrir les paramètres" 
          onPress={onOpenSettings} 
          variant="primary"
          fullWidth
        />
        
        <Button 
          title="Réessayer" 
          onPress={onRetry} 
          variant="outline"
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
});
