// components/TaskList.tsx
import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Task } from '../types/Task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
    tasks: Task[];
    onDeleteTask: (taskId: string) => void;
    onToggleComplete: (taskId: string) => void;
}

export function TaskList({ tasks, onDeleteTask, onToggleComplete }: TaskListProps) {
    if (tasks.length === 0) {
        return <Text>No tasks</Text>;
    }

    return (
        <ScrollView>
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