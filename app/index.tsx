// app/index.tsx
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { TaskList } from '../components/TaskList';
import { TaskStats } from '../components/TaskStats';
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

    const isButtonDisabled = !newTaskTitle.trim();
    const completedTasksCount = tasks.filter(task => task.completed).length;

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
            <Pressable 
                style={[
                    styles.button,
                    isButtonDisabled && styles.buttonDisabled
                ]} 
                onPress={addTask}
                disabled={isButtonDisabled}
            >
                <Text style={styles.buttonText}>Add Task</Text>
            </Pressable>
            <TaskStats 
                totalTasks={tasks.length}
                completedTasks={completedTasksCount}
            />
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
        backgroundColor: '#f8f9fa', // off white
    },
    input: {
        borderWidth: 1,
        borderColor: '#d0d7de', // navy
        backgroundColor: '#ffffff', // white
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        fontSize: 16,
        shadowColor: '#000000', // black
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    button: {
        backgroundColor: '#0969da', // light blue (slightly darker)
        padding: 14,
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 8,
        shadowColor: '#000000', // black
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        minHeight: 48,
        justifyContent: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#8c959f', // gray
        shadowOpacity: 0,
        elevation: 0,
    },
    buttonText: {
        color: '#ffffff', // white
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    }
});