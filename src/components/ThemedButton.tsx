import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export default function ThemedButton({ title, color ,onPress }:
  { title: string,
    color:string,
    onPress?: () => void }) {
  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { 
    paddingVertical: 10, 
    paddingHorizontal: 14, 
    borderRadius: 10, 
    alignItems: 'center' },
  txt: { 
    color: '#fff', 
    fontWeight: '600' 
  }
});