import React, { useEffect } from 'react';
import { loadItems, removeItem } from '../store/itemsSlice';
import { AppDispatch, RootState } from '../store';
import { StyleSheet ,Alert,Text,FlatList, TouchableOpacity,View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import ThemedButton from '../components/ThemedButton';
import { useDispatch, useSelector } from 'react-redux';


type Props = NativeStackScreenProps<RootStackParamList, 'List'>;


export default function ListScreen({ navigation }: Props) {

  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((s: RootState) => s.items);
  useEffect(() => { 
    dispatch(loadItems()); 
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert('Konfirmasi', 'Hapus data ini?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => dispatch(removeItem(id)) }
    ]);
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
          <TouchableOpacity  style={styles.deleteButton}  onPress={() => handleDelete(item.id!)}>
            <Text style={styles.deleteText}>Hapus</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        )}
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
    flex: 1, backgroundColor: '#fff',marginTop:50 
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
  deleteButton: {
    backgroundColor: '#e53e3e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
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
});