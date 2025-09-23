import AsyncStorage from '@react-native-async-storage/async-storage';
import { Observation } from '../types/observation';

const OBSERVATIONS_KEY = 'wildwatch_observations';

export class StorageService {
  static async saveObservation(observation: Observation): Promise<void> {
    try {
      const existingObservations = await this.getObservations();
      const updatedObservations = [...existingObservations, observation];
      await AsyncStorage.setItem(OBSERVATIONS_KEY, JSON.stringify(updatedObservations));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'observation:', error);
      throw error;
    }
  }

  static async getObservations(): Promise<Observation[]> {
    try {
      const observationsJson = await AsyncStorage.getItem(OBSERVATIONS_KEY);
      return observationsJson ? JSON.parse(observationsJson) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des observations:', error);
      return [];
    }
  }

  static async updateObservation(id: string, updatedObservation: Partial<Observation>): Promise<void> {
    try {
      const observations = await this.getObservations();
      const updatedObservations = observations.map(obs => 
        obs.id === id 
          ? { ...obs, ...updatedObservation, updatedAt: new Date().toISOString() }
          : obs
      );
      await AsyncStorage.setItem(OBSERVATIONS_KEY, JSON.stringify(updatedObservations));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'observation:', error);
      throw error;
    }
  }

  static async deleteObservation(id: string): Promise<void> {
    try {
      const observations = await this.getObservations();
      const filteredObservations = observations.filter(obs => obs.id !== id);
      await AsyncStorage.setItem(OBSERVATIONS_KEY, JSON.stringify(filteredObservations));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'observation:', error);
      throw error;
    }
  }

  static async clearAllObservations(): Promise<void> {
    try {
      await AsyncStorage.removeItem(OBSERVATIONS_KEY);
    } catch (error) {
      console.error('Erreur lors de la suppression de toutes les observations:', error);
      throw error;
    }
  }
}
