import React ,{useEffect} from 'react';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './store';
import { initDatabase } from './db/database';
import { Alert } from 'react-native';

export default function App() {
   useEffect(() => {
    const setupDB = async () => {
      try {
        await initDatabase();
      } catch (error) {
        Alert.alert('Gagal inisialisasi database: '+ error);
      }
    };
    setupDB();
  }, []);
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
  }