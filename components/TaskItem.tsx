// components/TaskItem.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Task } from '../types/Task';

interface TaskItemProps {
    task: Task;
    onDeleteTask: (taskId: string) => void;
    onToggleComplete: (taskId: string) => void;
}

export function TaskItem({ task, onDeleteTask, onToggleComplete }: TaskItemProps) {
    return (
        <View style={styles.container}>
            {/* Pressable is more flexible than TouchableOpacity */}
            <Pressable 
                style={styles.taskContent}
                onPress={() => onToggleComplete(task.id)}
            >
                <Text style={styles.taskText}>
                    {task.completed ? '✓' : '○'} {task.title}
                </Text>
            </Pressable>
            <Pressable 
                style={styles.deleteButton}
                onPress={() => onDeleteTask(task.id)}
            >
                <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10,
        borderBottomWidth: 1, // Line to separate tasks
        borderBottomColor: '#000CCC',
    },
    taskContent: {
        flex: 1, 
        marginRight: 10, 
    },
    taskText: {
        flexWrap: 'wrap', 
    },
    deleteButton: {
        minWidth: 60, 
        alignItems: 'center',
    },
    deleteText: {
        color: '#FF0000', 
        fontWeight: 'bold',
    },
});