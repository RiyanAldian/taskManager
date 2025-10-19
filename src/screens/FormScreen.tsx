import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useDispatch, useSelector } from 'react-redux';
import ThemedButton from '../components/ThemedButton';
import { insertItem,updateItem } from '../db/database';
import { useNavigation,useRoute ,RouteProp} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Item } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Form'>;
type FormScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Form'>;
type FormScreenRouteProp = RouteProp<RootStackParamList, 'Form'>;

export default function FormScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<FormScreenNavigationProp>();
  const route = useRoute<FormScreenRouteProp>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState( '');  

  const item = route.params?.item as Item | undefined;

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description || '');
    }
  }, [item]);
  
  const onSave = async () => {
    try {
      if (!title.trim()) {
        Alert.alert('Validasi', 'Judul tidak boleh kosong!');
        return;
      }

      if (item) {
        await updateItem({ id: item.id, title, description });
        Alert.alert('Sukses', 'Item berhasil diperbarui!', [
          { text: 'OK', onPress: () => navigation.navigate('List') },
        ]);
      } else {
        await insertItem({ title, description });
        Alert.alert('Sukses', 'Item berhasil disimpan!', [
          { text: 'OK', onPress: () => navigation.navigate('List') },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan data: ' + error);
    }
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
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  label: { fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 10, marginTop: 6 }
})