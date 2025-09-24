export interface Observation {
  id: string;
  name: string;
  date: string;
  latitude: number;
  longitude: number;
  imageUri?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ObservationFormData {
  name: string;
  date: string;
  imageUri?: string;
}
