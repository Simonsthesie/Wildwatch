import Mapbox from "@rnmapbox/maps";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { MAPBOX_ACCESS_TOKEN } from "../config/mapbox";

// Configuration de Mapbox
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

export default function RootLayout() {
  useEffect(() => {
    // Initialisation de Mapbox - pas besoin de setConnected dans les nouvelles versions
    console.log('Mapbox initialisé avec le token:', MAPBOX_ACCESS_TOKEN ? '✅ Configuré' : '❌ Non configuré');
  }, []);

  return <Stack />;
}
