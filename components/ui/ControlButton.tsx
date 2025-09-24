import React from 'react';
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';

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
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  default: {
    backgroundColor: 'white',
  },
  
  close: {
    backgroundColor: '#ff4444',
  },
  
  text: {
    fontSize: 20,
  },
  
  defaultText: {
    // Pas de couleur spécifique, utilise la couleur par défaut
  },
  
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
