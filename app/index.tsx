import React, { useState } from 'react';
import { HomeScreen } from '../components/HomeScreen';
import { LoadingScreen } from '../components/LoadingScreen';
import { MapScreen } from '../components/MapScreen';
import { UnauthorizedScreen } from '../components/UnauthorizedScreen';
import { useCurrentPosition } from '../hooks/useCurrentPosition';

export default function Index() {
  const { location, status, error, requestLocation, openSettings } = useCurrentPosition();
  const [showMap, setShowMap] = useState(true);

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  if (status === 'denied') {
    return (
      <UnauthorizedScreen 
        onOpenSettings={openSettings}
        onRetry={requestLocation}
      />
    );
  }

  if (status === 'error') {
    return (
      <LoadingScreen 
        message={`Erreur: ${error || 'Impossible de récupérer la position'}`}
      />
    );
  }

  if (status === 'success' && location) {
    if (showMap) {
      return (
        <MapScreen 
          location={location}
          onClose={() => setShowMap(false)}
        />
      );
    }

    return (
      <HomeScreen 
        location={location}
        onRefresh={requestLocation}
        onShowMap={() => setShowMap(true)}
      />
    );
  }

  return <LoadingScreen />;
}
