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

export function TaskList({ tasks, onDeleteTask, onToggleComplete }: TaskListProps) {
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
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#656d76', // gray
        textAlign: 'center',
        fontStyle: 'italic',
        lineHeight: 24,
    },
});