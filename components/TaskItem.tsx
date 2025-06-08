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
        <View style={[styles.container, task.completed && styles.containerCompleted]}>
            {/* Pressable is more flexible than TouchableOpacity */}
            <Pressable 
                style={styles.taskContent}
                onPress={() => onToggleComplete(task.id)}
            >
                <Text style={[
                    styles.taskText,
                    task.completed && styles.taskTextCompleted
                ]}>
                    {task.completed ? '✓' : '○'} {task.title}
                </Text>
                {task.description && (
                    <Text style={[
                        styles.descriptionText,
                        task.completed && styles.descriptionTextCompleted
                    ]}>{task.description}</Text>
                )}
                <Text style={[
                    styles.dateText,
                    task.completed && styles.dateTextCompleted
                ]}>
                    Created: {task.createdAt.toLocaleDateString()}
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
    containerCompleted: {
        opacity: 0.6,
        backgroundColor: '#f8f8f8',
    },
    taskContent: {
        flex: 1, 
        marginRight: 10, 
    },
    taskText: {
        flexWrap: 'wrap', 
    },
    taskTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#666',
    },
    deleteButton: {
        minWidth: 60, 
        alignItems: 'center',
    },
    deleteText: {
        color: '#FF0000', 
        fontWeight: 'bold',
    },
    descriptionText: {
        color: '#666',
        fontSize: 12,
        marginTop: 2,
        fontStyle: 'italic',
    },
    descriptionTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    dateText: {
        color: '#999',
        fontSize: 10,
        marginTop: 4,
    },
    dateTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#bbb',
    },
});