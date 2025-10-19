import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../types';
import * as db from '../db/database';


interface ItemsState {
  items: Item[];
  error?: string | null;
}

const initialState: ItemsState = { items: []};

export const loadItems = createAsyncThunk('items/load', async () => {
  const data = await db.fetchItems();
  return data;
});

export const addItem = createAsyncThunk('items/add', async (item: Item) => {
  const id = await db.insertItem(item);
  return { ...item, id };
});

export const editItem = createAsyncThunk('items/edit', async (item: Item) => {
  await db.updateItem(item);
  return item;
});

export const removeItem = createAsyncThunk('items/remove', async (id: number) => {
  await db.deleteItem(id);
  return id;
});


const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loadItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    })
    .addCase(addItem.fulfilled, (state, action: PayloadAction<Item>) => {
      state.items.unshift(action.payload);
    })
    .addCase(editItem.fulfilled, (state, action: PayloadAction<Item>) => {
      state.items = state.items.map(i => (i.id === action.payload.id ? action.payload : i));
    })
    .addCase(removeItem.fulfilled, (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    });
    }
});


export default itemsSlice.reducer;