# Task Manager App

A simple **React Native** app built with **Expo**, **TypeScript**, **SQLite**, and **Redux Toolkit**, for managing tasks. The app includes a **Splash Screen**, **List Screen**, and **Form Screen** (create & edit tasks). It works on **iOS** and **Android**.

---

## Features

- Create, read, update, and delete tasks (CRUD)
- Local database using **SQLite**
- State management with **Redux Toolkit**
- Floating Action Button (FAB) for adding tasks
- Delete button with confirmation
- Supports both **iOS** and **Android**

---

## Screens

1. **Splash Screen**
   - Shows app logo / name
   - Can implement auto navigation to List Screen

2. **List Screen**
   - Displays all tasks in a FlatList
   - Edit task by tapping on an item
   - Delete task with a modern button
   - Floating button to add new tasks

3. **Form Screen**
   - Add a new task or edit existing task
   - Fields: `Title` (required) and `Description` (optional)
   - Validation for empty title
   - Saves data to SQLite and updates Redux store

---

## Tech Stack

- **React Native** (with Expo)
- **TypeScript**
- **Redux Toolkit**
- **SQLite** (`expo-sqlite`)
- **React Navigation** (Native Stack)

---

## Installation

1. Clone the repo:

```bash
git clone https://github.com/RiyanAldian/taskManager.git
cd taskManager
```
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. tart Expo:

```bash
npx expo start
```

4. Open the app on your device or emulator (iOS / Android)

```bash
src/
├─ components/          # Reusable UI components (e.g., ThemedButton)
├─ db/                  # SQLite database helper
├─ navigation/          # AppNavigator (React Navigation)
├─ screens/             # SplashScreen, ListScreen, FormScreen
├─ store/               # Redux slice and store configuration
├─ types/               # TypeScript interfaces (Item)
```

## Redux State
The app uses Redux Toolkit to manage task state:
  items       → array of task objects
Actions:
  loadItems   → fetch tasks from SQLite
  addItem     → insert new task
  editItem    → update existing task
  removeItem  → delete task


## SQLite Schema

```bash
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

```

## Notes

Always initialize the database on app start (initDatabase())

Ensure route params are valid when editing tasks

Use FAB for better UX on mobile

For Android, avoid emojis in buttons (use icon library if needed)
