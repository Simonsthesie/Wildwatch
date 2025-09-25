import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';
import { colors, theme, typography, cardStyles } from '../styles';
import { Observation } from '../types/observation';
import { OBSERVATION_ICONS } from '../constants';
import { formatDate } from '../utils/formatters';

interface ObservationsListModalProps {
  visible: boolean;
  observations: Observation[];
  onClose: () => void;
  onEditObservation: (observation: Observation) => void;
}

type FilterType = 'all' | '🦌' | '🍄' | '🌿' | '🦅';
type SortType = 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc';

export const ObservationsListModal: React.FC<ObservationsListModalProps> = ({
  visible,
  observations,
  onClose,
  onEditObservation,
}) => {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [sortType, setSortType] = useState<SortType>('date-desc');
  const [searchText, setSearchText] = useState('');
  const [filteredObservations, setFilteredObservations] = useState<Observation[]>([]);

  useEffect(() => {
    let filtered = [...observations];

    // Filtre par type
    if (filterType !== 'all') {
      filtered = filtered.filter(obs => obs.icon === filterType);
    }

    // Filtre par texte de recherche
    if (searchText.trim()) {
      filtered = filtered.filter(obs => 
        obs.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortType) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredObservations(filtered);
  }, [observations, filterType, sortType, searchText]);

  const handleFilterChange = (type: FilterType) => {
    setFilterType(type);
  };

  const handleSortChange = (sort: SortType) => {
    setSortType(sort);
  };

  const getFilterIcon = (type: FilterType) => {
    if (type === 'all') return '📋';
    return type;
  };

  const getSortLabel = (sort: SortType) => {
    switch (sort) {
      case 'date-desc': return '📅 Récent';
      case 'date-asc': return '📅 Ancien';
      case 'name-asc': return '🔤 A-Z';
      case 'name-desc': return '🔤 Z-A';
      default: return '📅 Récent';
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
            <Text style={styles.title}>📋 Mes observations</Text>
            <Text style={styles.subtitle}>
              {filteredObservations.length} observation{filteredObservations.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Filtres */}
        <View style={styles.filtersContainer}>
          {/* Recherche */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher par nom..."
              placeholderTextColor={colors.textSecondary}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Filtres par type */}
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Type :</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {(['all', '🦌', '🍄', '🌿', '🦅'] as FilterType[]).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterButton,
                    filterType === type && styles.filterButtonActive
                  ]}
                  onPress={() => handleFilterChange(type)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    filterType === type && styles.filterButtonTextActive
                  ]}>
                    {getFilterIcon(type)} {type === 'all' ? 'Tous' : OBSERVATION_ICONS.find(icon => icon.icon === type)?.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Tri */}
          <View style={styles.sortRow}>
            <Text style={styles.sortLabel}>Trier par :</Text>
            <TouchableOpacity
              style={styles.sortButton}
              onPress={() => {
                const sorts: SortType[] = ['date-desc', 'date-asc', 'name-asc', 'name-desc'];
                const currentIndex = sorts.indexOf(sortType);
                const nextIndex = (currentIndex + 1) % sorts.length;
                handleSortChange(sorts[nextIndex]);
              }}
            >
              <Text style={styles.sortButtonText}>{getSortLabel(sortType)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Liste des observations */}
        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          {filteredObservations.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Aucune observation trouvée</Text>
              <Text style={styles.emptySubtext}>
                {searchText ? 'Essayez un autre terme de recherche' : 'Ajoutez votre première observation !'}
              </Text>
            </View>
          ) : (
            filteredObservations.map((observation) => (
              <TouchableOpacity
                key={observation.id}
                style={styles.observationCard}
                onPress={() => onEditObservation(observation)}
              >
                <View style={styles.observationHeader}>
                  <Text style={styles.observationIcon}>{observation.icon}</Text>
                  <View style={styles.observationInfo}>
                    <Text style={styles.observationName}>{observation.name}</Text>
                    <Text style={styles.observationDate}>
                      📅 {formatDate(observation.date)}
                    </Text>
                  </View>
                  <Text style={styles.observationArrow}>›</Text>
                </View>
                
                <View style={styles.observationDetails}>
                  <Text style={styles.observationCoordinates}>
                    📍 {observation.latitude.toFixed(6)}, {observation.longitude.toFixed(6)}
                  </Text>
                  {observation.imageUri && (
                    <Text style={styles.observationImage}>📷 Photo disponible</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
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
  filtersContainer: {
    padding: theme.spacing.lg,
    backgroundColor: colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  searchContainer: {
    marginBottom: theme.spacing.md,
  },
  searchInput: {
    ...cardStyles.base,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.fontSize.base,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  filterRow: {
    marginBottom: theme.spacing.md,
  },
  filterLabel: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: colors.gray100,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    ...typography.small,
    color: colors.textSecondary,
    fontWeight: theme.fontWeight.medium,
  },
  filterButtonTextActive: {
    color: colors.textInverse,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sortLabel: {
    ...typography.label,
    color: colors.textPrimary,
  },
  sortButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: colors.primary,
  },
  sortButtonText: {
    ...typography.small,
    color: colors.textInverse,
    fontWeight: theme.fontWeight.semibold,
  },
  listContainer: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl * 2,
  },
  emptyText: {
    ...typography.h3,
    color: colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  emptySubtext: {
    ...typography.body,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  observationCard: {
    ...cardStyles.base,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  observationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  observationIcon: {
    fontSize: 24,
    marginRight: theme.spacing.sm,
  },
  observationInfo: {
    flex: 1,
  },
  observationName: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  observationDate: {
    ...typography.small,
    color: colors.textSecondary,
  },
  observationArrow: {
    fontSize: theme.fontSize.lg,
    color: colors.textSecondary,
  },
  observationDetails: {
    paddingLeft: 36, // Align with text after icon
  },
  observationCoordinates: {
    ...typography.small,
    color: colors.textTertiary,
    marginBottom: theme.spacing.xs,
  },
  observationImage: {
    ...typography.small,
    color: colors.primary,
  },
});
