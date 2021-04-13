import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

export function FilledButton({title, style, onPress}) {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#666699'
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});