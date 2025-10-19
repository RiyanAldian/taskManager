import { 
  Alert,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../db/database';
import { Item } from '../types';

export default function ListScreen({ navigation }: any) {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const items = await getItems();
      setData(items);
    } catch (error) {
      console.error('Gagal ambil data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = (id: number) => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus item ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteItem(id);
            await loadData(); // ✅ refresh list
          } catch (err) {
            Alert.alert('Error', 'Gagal menghapus data: ' + err);
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Form', { item })}>
          <Text style={styles.title}>{item.title}</Text>
          {item.description ? (
            <Text style={styles.desc}>{item.description}</Text>
          ) : null}
          <Text style={styles.date}>{item.created_at}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => handleDelete(item.id!)}
      >
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📋 Daftar Task</Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : data.length === 0 ? (
        <Text style={styles.empty}>Belum ada data tersimpan.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Form')}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 16,
    paddingTop: 56,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  desc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
  deleteBtn: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  deleteText: {
    color: '#FFF',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    backgroundColor: '#007bff',
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabText: {
    fontSize: 28,
    color: '#FFF',
    lineHeight: 30,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#aaa',
  },
});
