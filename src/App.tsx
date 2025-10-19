import React ,{useEffect} from 'react';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './store';
import { initDatabase } from './db/database';

export default function App() {
   useEffect(() => {
    const setupDB = async () => {
      try {
        await initDatabase();
        console.log('Database berhasil diinisialisasi!');
      } catch (error) {
        console.error('Gagal inisialisasi database:', error);
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