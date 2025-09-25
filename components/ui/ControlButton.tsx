import React from 'react';
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { colors, theme, wildlifeStyles } from '../../styles';

export type ControlButtonVariant = 'default' | 'close';

interface ControlButtonProps {
  title: string;
  onPress: () => void;
  variant?: ControlButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const ControlButton: React.FC<ControlButtonProps> = ({
  title,
  onPress,
  variant = 'default',
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    style,
  ];

  const buttonTextStyle = [
    styles.text,
    styles[`${variant}Text`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    ...wildlifeStyles.controlButton,
  },
  
  default: {
    backgroundColor: colors.backgroundOverlay,
    borderColor: colors.forest,
  },
  
  close: {
    backgroundColor: colors.error,
    borderColor: colors.bark,
  },
  
  text: {
    fontSize: theme.fontSize.lg,
    color: colors.textPrimary,
  },
  
  defaultText: {
    color: colors.primary,
  },
  
  closeText: {
    color: colors.textInverse,
    fontWeight: theme.fontWeight.bold,
  },
});
