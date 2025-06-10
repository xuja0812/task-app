# Welcome to my task app! 👋

A simple to-do app that allows users to add tasks, check them off, and delete them.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Features

This task management app provides a simple and intuitive interface for organizing daily tasks. It's built with React Native's core components.

### Core Features
- **Add Tasks**: Create new tasks with titles and optional descriptions
- **Mark Complete**: Toggle tasks between completed and pending states
- **Delete Tasks**: Remove tasks you no longer need

### User Interface
- Clean, minimalist design using React Native's built-in components
- Responsive layout that works on both iOS and Android
- Visual indicators for completed vs. pending tasks
- Intuitive touch interactions for task management

## Third-Party Libraries

The app uses minimal external dependencies:

- **uuid** (`uuid`): Generates unique identifiers for each task to ensure proper state management and avoid conflicts
- **react-native-get-random-values**: Provides secure random number generation required by the uuid library in React Native environments

## Usage Instructions

1. **Adding a Task**: Tap the "Add Task" button below the text input fields to create a new task after adding a title. You can add both a title and description.

2. **Completing Tasks**: Tap on a task to mark it as done. Completed tasks will be crossed out and darker than pending ones.

3. **Deleting Tasks**: Tap the delete button to remove tasks permanently.
