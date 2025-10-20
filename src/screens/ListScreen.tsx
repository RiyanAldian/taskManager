import React, { useEffect,useState } from 'react';
import { loadItems, removeItem } from '../store/itemsSlice';
import { AppDispatch, RootState } from '../store';
import { StyleSheet ,Alert,Text,FlatList, TouchableOpacity,View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import ThemedButton from '../components/ThemedButton';
import { useDispatch, useSelector } from 'react-redux';
import AlertModal from '../components/AlertModal';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export default function ListScreen({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showAlert, setShowAlert] = useState(false);
  const { items } = useSelector((s: RootState) => s.items);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => { 
    dispatch(loadItems()); 
  }, []);

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setShowAlert(true);
    loadItems();
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daftar Task</Text>
      </View>
      
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Form', { itemId: item.id })}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>
          </View>
          <ThemedButton title="Delete" color='#e53e3e' onPress={() => handleDelete(item.id!)} />
        </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tidak ada task tersedia.</Text>
          </View>
        )}
      />


      <AlertModal
        visible={showAlert}
        title="Hapus Task?"
        message="Apakah kamu yakin ingin menghapus task ini?"
        icon="⚠️"
        onCancel={() => {
          setShowAlert(false);
          setSelectedId(null);
        }}
        onConfirm={() => {
          if (selectedId !== null) {
            dispatch(removeItem(selectedId));
            setShowAlert(false);
            setSelectedId(null);
          }
        }}
        confirmText="Hapus"
        cancelText="Batal"
      />

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
    flex: 1, backgroundColor: '#fff',paddingTop:36 
  },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  card: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f7fafc', marginHorizontal: 12, marginVertical: 6, borderRadius: 8, padding: 12 
  },
  itemTitle: { 
    fontWeight: '600', 
    fontSize: 16 
  },
  itemDesc: {
    color: '#4a5568', 
    marginTop: 4 
  },
  fab: {
    position: 'absolute',
    bottom: 50,
    right: 25,
    backgroundColor: '#007bff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 28,
    fontWeight: 'bold',
  },
    emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});