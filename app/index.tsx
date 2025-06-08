// app/index.tsx
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { TaskList } from '../components/TaskList';
import { Task } from '../types/Task';

export default function Page() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    const addTask = () => {
        if (!newTaskTitle.trim()) return;
        const newTask: Task = {
            id: uuidv4(),
            title: newTaskTitle.trim(),
            description: newTaskDescription.trim() || undefined,
            completed: false,
            createdAt: new Date(),
        };

        setTasks([newTask, ...tasks]);
        setNewTaskTitle('');
        setNewTaskDescription('');
    };

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const toggleTaskComplete = (taskId: string) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter task..."
                value={newTaskTitle}
                onChangeText={setNewTaskTitle}
                onSubmitEditing={addTask}
                returnKeyType="done"
            />
            <TextInput
                style={styles.input}
                placeholder="Enter description (optional)..."
                value={newTaskDescription}
                onChangeText={setNewTaskDescription}
                onSubmitEditing={addTask}
                returnKeyType="done"
            />
            <Pressable style={styles.button} onPress={addTask}>
                <Text>Add Task</Text>
            </Pressable>
            <TaskList
                tasks={tasks}
                onDeleteTask={deleteTask}
                onToggleComplete={toggleTaskComplete}
            />
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000CCC', // navy
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007AFF', // light blue
        padding: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
});