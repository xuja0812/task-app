// components/TaskList.tsx
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Task } from '../types/Task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
    tasks: Task[];
    onDeleteTask: (taskId: string) => void;
    onToggleComplete: (taskId: string) => void;
}

/**
 * Task list component.
 * Implements accessibility best practices.
 */
export function TaskList({ tasks, onDeleteTask, onToggleComplete }: TaskListProps) {
    {/* If there's no tasks, encourage the user to add one */}
    if (tasks.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text 
                    style={styles.emptyText}
                    accessibilityRole="text"
                    accessibilityLabel="No tasks available"
                >
                    No tasks yet. Add your first task above!
                </Text>
            </View>
        );
    }

    return (
        <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={true}
            accessibilityRole="list"
            accessibilityLabel={`Task list with ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`}
        >
            {/* Render each task with the same delete/complete functionality */}
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDeleteTask={onDeleteTask}
                    onToggleComplete={onToggleComplete}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    // Main container that's scrollable as the task list grows
    scrollView: {
        flex: 1,
    },
    // Content container with bottom padding to prevent last item from being cut off
    contentContainer: {
        paddingBottom: 20,
    },
    // Empty state container centered both horizontally and vertically
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    // Empty state text with muted color to signal inactivity
    emptyText: {
        fontSize: 16,
        color: '#656d76', 
        textAlign: 'center',
        fontStyle: 'italic',
        lineHeight: 24,
    },
});