/**
 * WILDWATCH - TEST DU THÈME SAUVAGE
 * Script de test pour vérifier que tous les styles fonctionnent correctement
 */

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { buttonStyles, cardStyles, colors, theme, wildlifeStyles } from './index';

export const ThemeTestScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌿 Test du Thème Sauvage</Text>
      
      {/* Test des couleurs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Couleurs Nature</Text>
        <View style={styles.colorGrid}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.primary }]}>
            <Text style={styles.colorLabel}>Primary</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.forest }]}>
            <Text style={styles.colorLabel}>Forest</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.earth }]}>
            <Text style={styles.colorLabel}>Earth</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.moss }]}>
            <Text style={styles.colorLabel}>Moss</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.bark }]}>
            <Text style={styles.colorLabel}>Bark</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.leaf }]}>
            <Text style={styles.colorLabel}>Leaf</Text>
          </View>
        </View>
      </View>

      {/* Test des boutons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Boutons Sauvages</Text>
        <View style={styles.buttonGrid}>
          <View style={[styles.button, buttonStyles.primary]}>
            <Text style={styles.buttonText}>Primary</Text>
          </View>
          <View style={[styles.button, buttonStyles.forest]}>
            <Text style={styles.buttonText}>Forest</Text>
          </View>
          <View style={[styles.button, buttonStyles.earth]}>
            <Text style={styles.buttonText}>Earth</Text>
          </View>
          <View style={[styles.button, buttonStyles.moss]}>
            <Text style={styles.buttonText}>Moss</Text>
          </View>
        </View>
      </View>

      {/* Test des cartes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cartes Nature</Text>
        <View style={[styles.card, cardStyles.forest]}>
          <Text style={styles.cardTitle}>Carte Forêt</Text>
          <Text style={styles.cardText}>Observation dans la forêt sauvage</Text>
        </View>
        <View style={[styles.card, cardStyles.earth]}>
          <Text style={styles.cardTitle}>Carte Terre</Text>
          <Text style={styles.cardText}>Observation sur le sol</Text>
        </View>
        <View style={[styles.card, cardStyles.moss]}>
          <Text style={styles.cardTitle}>Carte Mousse</Text>
          <Text style={styles.cardText}>Observation sur la mousse</Text>
        </View>
      </View>

      {/* Test des marqueurs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Marqueurs Faune</Text>
        <View style={styles.markerGrid}>
          <View style={wildlifeStyles.userMarker}>
            <Text style={styles.markerText}>🌿</Text>
          </View>
          <View style={wildlifeStyles.animalMarker}>
            <Text style={styles.markerText}>🦌</Text>
          </View>
          <View style={wildlifeStyles.animalMarker}>
            <Text style={styles.markerText}>🦅</Text>
          </View>
          <View style={wildlifeStyles.animalMarker}>
            <Text style={styles.markerText}>🦊</Text>
          </View>
        </View>
      </View>

      {/* Test de la typographie */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Typographie</Text>
        <Text style={theme.typography.h1}>Titre H1</Text>
        <Text style={theme.typography.h2}>Titre H2</Text>
        <Text style={theme.typography.h3}>Titre H3</Text>
        <Text style={theme.typography.body}>Corps de texte normal</Text>
        <Text style={theme.typography.bodySmall}>Texte petit</Text>
        <Text style={theme.typography.mono}>Coordonnées: 45.123456, 2.345678</Text>
      </View>

      {/* Test des espacements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Espacements</Text>
        <View style={styles.spacingTest}>
          <View style={[styles.spacingBox, { margin: theme.spacing.xs }]}>
            <Text style={styles.spacingLabel}>XS</Text>
          </View>
          <View style={[styles.spacingBox, { margin: theme.spacing.sm }]}>
            <Text style={styles.spacingLabel}>SM</Text>
          </View>
          <View style={[styles.spacingBox, { margin: theme.spacing.md }]}>
            <Text style={styles.spacingLabel}>MD</Text>
          </View>
          <View style={[styles.spacingBox, { margin: theme.spacing.lg }]}>
            <Text style={styles.spacingLabel}>LG</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: colors.primary,
    marginBottom: theme.spacing.md,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  colorSwatch: {
    width: 80,
    height: 60,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  colorLabel: {
    ...theme.typography.bodySmall,
    color: colors.textInverse,
    fontWeight: theme.fontWeight.semibold,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  button: {
    ...buttonStyles.base,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  buttonText: {
    ...buttonStyles.text,
  },
  card: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  cardTitle: {
    ...theme.typography.h4,
    color: colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  cardText: {
    ...theme.typography.body,
    color: colors.textSecondary,
  },
  markerGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    justifyContent: 'center',
  },
  markerText: {
    fontSize: theme.fontSize.lg,
  },
  spacingTest: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  spacingBox: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacingLabel: {
    ...theme.typography.bodySmall,
    color: colors.textInverse,
    fontWeight: theme.fontWeight.bold,
  },
});

export default ThemeTestScreen;
