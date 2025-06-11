// components/TaskItem.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Task } from '../types/Task';
import { formatTaskDate } from '../utils/dateFormatting';

interface TaskItemProps {
    task: Task;
    onDeleteTask: (taskId: string) => void;
    onToggleComplete: (taskId: string) => void;
}

/**
 * Individual task item component with completion and delete functionality.
 * Implements accessibility best practices.
 */
export function TaskItem({ task, onDeleteTask, onToggleComplete }: TaskItemProps) {
    return (
        <View style={[styles.container, task.completed && styles.containerCompleted]}>
            {/* Main task container: acts as a checkbox for completion */}
            <Pressable 
                style={styles.taskContent}
                onPress={() => onToggleComplete(task.id)}
                accessibilityRole="checkbox"
                accessibilityLabel={`${task.completed ? 'Mark incomplete' : 'Mark complete'}: ${task.title}`}
                accessibilityState={{ checked: task.completed }}
            >
                {/* Task title with completion indicator */}
                <Text style={[
                    styles.taskText,
                    task.completed && styles.taskTextCompleted
                ]}>
                    {task.completed ? '✓' : '○'} {task.title}
                </Text>
                {/* Optional description that's only rendered when provided by user */}
                {task.description && (
                    <Text style={[
                        styles.descriptionText,
                        task.completed && styles.descriptionTextCompleted
                    ]}>{task.description}</Text>
                )}
                {/* Timestamp for tracking */}
                <Text style={[
                    styles.dateText,
                    task.completed && styles.dateTextCompleted
                ]}>
                    Created: {formatTaskDate(task.createdAt)}
                </Text>
            </Pressable>
            {/* Delete button that's separated from the main task to prevent accidental deletions */}
            <Pressable 
                style={styles.deleteButton}
                onPress={() => onDeleteTask(task.id)}
                accessibilityRole="button"
                accessibilityLabel={`Delete ${task.title}`}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
                <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    // Task container with card-like appearance (inspired by MUI Paper component)
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#ffffff', 
        borderRadius: 8,
        shadowColor: '#000000', 
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    // Completed task container with reduced opacity and background change for visual feedback
    containerCompleted: {
        opacity: 0.7,
        backgroundColor: '#f8f9fa', 
    },
    // Main content area, flexible to fill available space
    taskContent: {
        flex: 1, 
        marginRight: 12, 
        minHeight: 44,
    },
    taskText: {
        flexWrap: 'wrap', 
        fontSize: 16,
        color: '#24292f',
        fontWeight: '500',
        lineHeight: 22,
    },
    // Completed text styling, includes strikethrough + muted color
    taskTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#656d76', 
    },
    // Delete button, red to indicate deletion
    deleteButton: {
        minWidth: 60,
        minHeight: 44, // Maintains minimum height for target consistency
        backgroundColor: '#da3633', 
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteText: {
        color: '#ffffff', 
        fontWeight: '600',
        fontSize: 12,
    },
    // Secondary text styling, smaller than primary text
    descriptionText: {
        color: '#656d76',
        fontSize: 14,
        marginTop: 4,
        fontStyle: 'italic',
        lineHeight: 20,
    },
    descriptionTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#8c959f', 
    },
    // Tertiary text styling, smaller than secondary text
    dateText: {
        color: '#8c959f', 
        fontSize: 12,
        marginTop: 6,
    },
    dateTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#a6a6a6', 
    },
});