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
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#ffffff', // white
        borderRadius: 8,
        shadowColor: '#000000', // black
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    containerCompleted: {
        opacity: 0.7,
        backgroundColor: '#f8f9fa', // off white
    },
    taskContent: {
        flex: 1, 
        marginRight: 12, 
    },
    taskText: {
        flexWrap: 'wrap', 
        fontSize: 16,
        color: '#24292f', // dark gray
        fontWeight: '500',
    },
    taskTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#656d76', // lighter gray
    },
    deleteButton: {
        minWidth: 60,
        backgroundColor: '#da3633', // bright red
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteText: {
        color: '#ffffff', // white
        fontWeight: '600',
        fontSize: 12,
    },
    descriptionText: {
        color: '#656d76', // lighter gray
        fontSize: 14,
        marginTop: 4,
        fontStyle: 'italic',
        lineHeight: 20,
    },
    descriptionTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#8c959f', // light gray
    },
    dateText: {
        color: '#8c959f', // light gray
        fontSize: 12,
        marginTop: 6,
    },
    dateTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#a6a6a6', // lightest gray
    },
});