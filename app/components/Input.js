  
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {shade1, shade2, shade3, shade4, shade5, shadeTrans, textColor} from "../config/color"


export function Input({style, ...props}) {
  return (
    <TextInput
      {...props}
      style={[styles.input, style]}
      placeholderTextColor={shade4}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#e8e8e8',
    width: '90%',
    padding: 20,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    color: 'black',
  },
});