import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export default function ThemedButton({ title, onPress }: { title: string; onPress?: () => void }) {
return (
  <TouchableOpacity style={styles.btn} onPress={onPress}>
    <Text style={styles.txt}>{title}</Text>
  </TouchableOpacity>
);
}


const styles = StyleSheet.create({
  btn: { backgroundColor: '#2b6cb0', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, alignItems: 'center' },
  txt: { color: '#fff', fontWeight: '600' }
});