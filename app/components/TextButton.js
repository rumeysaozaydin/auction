import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

export function TextButton({title, style, textStyle, onPress}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 5,
  },
  text: {
    fontWeight: '100',
    fontSize: 13,
    color: 'black'
  },
});