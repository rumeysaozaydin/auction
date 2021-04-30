import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {shade1, shade2, shade3, shade4, shade5, shadeTrans} from "../config/color"

export function Heading({children, style, ...props}) {
  const {colors} = useTheme();
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    color: shade5
  },
});