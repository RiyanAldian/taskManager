import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useDispatch, useSelector } from 'react-redux';
import ThemedButton from '../components/ThemedButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Form'>;

export default function FormScreen() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState( '');  
  
  const onSave = async () => {
      console.log('Save');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Judul</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} placeholder="Masukkan judul" />

      <Text style={[styles.label, { marginTop: 12 }]}>Deskripsi</Text>
      <TextInput value={description} onChangeText={setDescription} style={[styles.input, { height: 100 }]} multiline placeholder="Masukkan deskripsi" />

      <View style={{ marginTop: 20 }}>
        <ThemedButton title="Simpan" onPress={onSave} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 ,marginTop:36},
  label: { fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 10, marginTop: 6 }
})