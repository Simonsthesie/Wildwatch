import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { buttonStyles, colors, theme } from '../../styles';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost' | 'forest' | 'earth' | 'moss' | 'sunset';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const buttonTextStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.textInverse} 
        />
      ) : (
        <Text style={[buttonTextStyle, { textAlign: 'center' }]} numberOfLines={0}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Styles de base
  base: {
    ...buttonStyles.base,
  },
  fullWidth: {
    width: '100%',
  },
  
  // Variants de couleur - Thème sauvage
  primary: {
    ...buttonStyles.primary,
  },
  secondary: {
    backgroundColor: colors.gray500,
  },
  success: {
    ...buttonStyles.success,
  },
  danger: {
    ...buttonStyles.error,
  },
  outline: {
    ...buttonStyles.outline,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  forest: {
    ...buttonStyles.forest,
  },
  earth: {
    ...buttonStyles.earth,
  },
  moss: {
    ...buttonStyles.moss,
  },
  sunset: {
    backgroundColor: colors.sunset,
    borderColor: colors.earth,
  },
  
  // Tailles
  small: {
    ...buttonStyles.small,
  },
  medium: {
    ...buttonStyles.base,
  },
  large: {
    ...buttonStyles.large,
    minHeight: 60,
    paddingVertical: theme.spacing.md,
  },
  
  // États
  disabled: {
    backgroundColor: colors.gray300,
    borderColor: colors.gray300,
  },
  
  // Styles de texte
  text: {
    ...buttonStyles.text,
  },
  primaryText: {
    ...buttonStyles.text,
  },
  secondaryText: {
    color: colors.textInverse,
  },
  successText: {
    ...buttonStyles.text,
  },
  dangerText: {
    ...buttonStyles.text,
  },
  outlineText: {
    ...buttonStyles.textOutline,
  },
  ghostText: {
    color: colors.primary,
  },
  forestText: {
    ...buttonStyles.text,
  },
  earthText: {
    ...buttonStyles.text,
  },
  mossText: {
    ...buttonStyles.text,
  },
  sunsetText: {
    ...buttonStyles.text,
  },
  
  // Tailles de texte
  smallText: {
    fontSize: theme.fontSize.sm,
  },
  mediumText: {
    fontSize: theme.fontSize.base,
  },
  largeText: {
    fontSize: theme.fontSize.lg,
  },
  
  // Texte désactivé
  disabledText: {
    color: colors.textTertiary,
  },
});
