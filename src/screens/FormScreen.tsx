import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, editItem } from '../store/itemsSlice';
import { AppDispatch, RootState } from '../store';
import ThemedButton from '../components/ThemedButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Form'>;

export default function FormScreen({ navigation, route }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.items.items);

  const existing = route.params?.itemId
    ? items.find(i => i.id === route.params.itemId)
    : undefined;

  const [title, setTitle] = useState(existing?.title || '');
  const [description, setDescription] = useState(existing?.description || '');

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setDescription(existing.description || '');
    }
  }, [existing]);

  const onSave = async () => {
    if (!title.trim()) {
      return Alert.alert('Validasi', 'Judul wajib diisi');
    }

    try {
      if (existing) {
        // Edit item
        await dispatch(editItem({ id: existing.id, title, description }));
        Alert.alert('Sukses', 'Item berhasil diperbarui!', [
          { text: 'OK', onPress: () => navigation.navigate('List') },
        ]);
      } else {
        // Tambah item baru
        await dispatch(addItem({ title, description }));
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
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Masukkan judul"
      />

      <Text style={[styles.label, { marginTop: 12 }]}>Deskripsi</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
        multiline
        placeholder="Masukkan deskripsi"
      />

      <View style={{ marginTop: 20 }}>
        <ThemedButton title="Simpan" onPress={onSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  label: { fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
});
