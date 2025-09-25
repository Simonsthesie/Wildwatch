import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, theme } from '../styles';
import { formatAccuracy, formatAltitude, formatCoordinate, formatSpeed } from '../utils/formatters';
import { MapScreen } from './MapScreen';

interface HomeScreenProps {
  location: Location.LocationObject;
  onRefresh: () => void;
  onShowMap: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ location, onRefresh, onShowMap }) => {
  const [showMap, setShowMap] = useState(false);
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animation d'entrée
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation de pulsation pour le statut
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, []);


  if (showMap) {
    return (
      <MapScreen 
        location={location}
        onClose={() => setShowMap(false)}
      />
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header avec gradient et icônes */}
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          }
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>🌿 Wildwatch</Text>
          <Text style={styles.subtitle}>Votre position dans la nature sauvage</Text>
        </View>
      </Animated.View>

      {/* Carte de localisation améliorée */}
      <View style={styles.locationCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>📍 Position actuelle</Text>
          <Animated.View 
            style={[
              styles.statusIndicator,
              {
                transform: [{ scale: pulseAnim }]
              }
            ]}
          >
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Connecté</Text>
          </Animated.View>
        </View>

        <View style={styles.coordinateSection}>
          <View style={styles.coordinateRow}>
            <View style={styles.coordinateLabelContainer}>
              <Text style={styles.coordinateIcon}>🌍</Text>
              <Text style={styles.coordinateLabel}>Latitude</Text>
            </View>
            <Text style={styles.coordinateValue}>
              {formatCoordinate(location.coords.latitude, true)}
            </Text>
          </View>

          <View style={styles.coordinateRow}>
            <View style={styles.coordinateLabelContainer}>
              <Text style={styles.coordinateIcon}>🌐</Text>
              <Text style={styles.coordinateLabel}>Longitude</Text>
            </View>
            <Text style={styles.coordinateValue}>
              {formatCoordinate(location.coords.longitude, false)}
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Text style={styles.infoIcon}>🎯</Text>
              <Text style={styles.infoLabel}>Précision</Text>
            </View>
            <Text style={styles.infoValue}>
              {formatAccuracy(location.coords.accuracy)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Text style={styles.infoIcon}>⛰️</Text>
              <Text style={styles.infoLabel}>Altitude</Text>
            </View>
            <Text style={styles.infoValue}>
              {formatAltitude(location.coords.altitude)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Text style={styles.infoIcon}>🏃</Text>
              <Text style={styles.infoLabel}>Vitesse</Text>
            </View>
            <Text style={styles.infoValue}>
              {formatSpeed(location.coords.speed)}
            </Text>
          </View>
        </View>
      </View>

      {/* Section des actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.actionsTitle}>Actions rapides</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.customButton, styles.successButton]}
            onPress={onShowMap}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonIcon}>🗺️</Text>
            <Text style={styles.buttonText}>Carte</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.customButton, styles.primaryButton]}
            onPress={onRefresh}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonIcon}>🔄</Text>
            <Text style={styles.buttonText}>Actualiser</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer amélioré */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.footerIcon}>🕐</Text>
          <Text style={styles.footerText}>
            Dernière mise à jour: {new Date(location.timestamp).toLocaleTimeString('fr-FR')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.layoutStyles.container,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h1,
    color: colors.textInverse,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: colors.textInverse,
    opacity: 0.9,
    textAlign: 'center',
  },
  locationCard: {
    ...theme.cardStyles.forest,
    margin: theme.spacing.lg,
    marginTop: -theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    ...theme.typography.h4,
    color: colors.primary,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  statusText: {
    ...theme.typography.bodySmall,
    color: colors.success,
    fontWeight: theme.fontWeight.medium,
  },
  coordinateSection: {
    marginBottom: theme.spacing.md,
  },
  coordinateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: colors.gray50,
    borderRadius: theme.borderRadius.md,
  },
  coordinateLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  coordinateIcon: {
    fontSize: theme.fontSize.lg,
  },
  coordinateLabel: {
    ...theme.typography.label,
    color: colors.textSecondary,
  },
  coordinateValue: {
    ...theme.typography.mono,
    color: colors.textPrimary,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
  },
  separator: {
    height: 2,
    backgroundColor: colors.gray200,
    marginVertical: theme.spacing.md,
    borderRadius: 1,
  },
  infoSection: {
    marginTop: theme.spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: colors.gray50,
    borderRadius: theme.borderRadius.md,
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  infoIcon: {
    fontSize: theme.fontSize.base,
  },
  infoLabel: {
    ...theme.typography.bodySmall,
    color: colors.textSecondary,
  },
  infoValue: {
    ...theme.typography.bodySmall,
    color: colors.textPrimary,
    fontWeight: theme.fontWeight.semibold,
  },
  actionsSection: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  actionsTitle: {
    ...theme.typography.h4,
    color: colors.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  footer: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  footerIcon: {
    fontSize: theme.fontSize.base,
  },
  footerText: {
    ...theme.typography.bodySmall,
    color: colors.textTertiary,
    fontSize: theme.fontSize.xs,
  },
  footerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerStat: {
    ...theme.typography.bodySmall,
    color: colors.textSecondary,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
  },
  customButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.xs,
    minHeight: 80,
  },
  successButton: {
    backgroundColor: colors.success,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  buttonIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  buttonText: {
    ...theme.typography.label,
    color: colors.textInverse,
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
  },
});
