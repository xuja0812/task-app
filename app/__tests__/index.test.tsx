// app/__tests__/index.test.tsx
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import Page from '../index';

let mockUuidCounter = 0;
jest.mock('uuid', () => ({
    v4: jest.fn(() => `mock-uuid-${++mockUuidCounter}`),
}));

jest.mock('../../components/TaskList', () => ({
    TaskList: ({ tasks, onDeleteTask, onToggleComplete }: any) => {
        const React = require('react');
        const { View, Text, Pressable } = require('react-native');
        
        if (tasks.length === 0) {
            return (
                <View testID="task-list-empty">
                    <Text>No tasks yet. Add your first task above!</Text>
                </View>
            );
        }
        
        return (
            <View testID="task-list">
                {tasks.map((task: any) => (
                    <View key={task.id} testID={`task-${task.id}`}>
                        <Text>{task.completed ? '✓' : '○'} {task.title}</Text>
                        <Pressable 
                            testID={`delete-${task.id}`}
                            onPress={() => onDeleteTask(task.id)}
                        >
                            <Text>Delete</Text>
                        </Pressable>
                        <Pressable 
                            testID={`toggle-${task.id}`}
                            onPress={() => onToggleComplete(task.id)}
                        >
                            <Text>Toggle</Text>
                        </Pressable>
                    </View>
                ))}
            </View>
        );
    }
}));

jest.mock('../../components/TaskStats', () => ({
    TaskStats: ({ totalTasks, completedTasks }: any) => {
        const React = require('react');
        const { View, Text } = require('react-native');
        
        return (
            <View testID="task-stats">
                <Text testID="total-tasks">{totalTasks} tasks</Text>
                <Text testID="completed-tasks">{completedTasks} completed</Text>
            </View>
        );
    }
}));

describe('Page Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUuidCounter = 0; 
    });
    test('DEBUG: Check button structure', () => {
        const { getByText } = render(<Page />);
        
        const addButton = getByText('Add Task').parent;
        console.log('Button props:', addButton.props);
        console.log('Button type:', addButton.type);
        console.log('Button children:', addButton.children);
        
        const buttonText = getByText('Add Task');
        console.log('Button text parent:', buttonText.parent.props);
        console.log('Button text parent type:', buttonText.parent.type);
    });
    test('disables the Add Task button when title is empty', () => {
        const { getByText, queryByText } = render(<Page />);
        
        const addButton = getByText('Add Task').parent;
        fireEvent.press(addButton);
        
        expect(queryByText('No tasks yet. Add your first task above!')).toBeTruthy();
    });
    
    test('enables the Add Task button when title has content', () => {
        const { getByPlaceholderText, getByText, queryByText } = render(<Page />);
        
        const titleInput = getByPlaceholderText('Enter task...');
        fireEvent.changeText(titleInput, 'New Task');
        
        const addButton = getByText('Add Task');
        fireEvent.press(addButton);
        
        expect(queryByText('○ New Task')).toBeTruthy();
    });
    test('renders the initial state correctly', () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(<Page />);

        expect(getByPlaceholderText('Enter task...')).toBeTruthy();
        expect(getByPlaceholderText('Enter description (optional)...')).toBeTruthy();
        expect(getByText('Add Task')).toBeTruthy();
        expect(getByTestId('task-stats')).toBeTruthy();
        expect(getByTestId('task-list-empty')).toBeTruthy();
    });
    test('adds a new task when Add Task button is pressed', async () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(<Page />);
        
        const titleInput = getByPlaceholderText('Enter task...');
        const descriptionInput = getByPlaceholderText('Enter description (optional)...');
        const addButton = getByText('Add Task');
        
        fireEvent.changeText(titleInput, 'New Task');
        fireEvent.changeText(descriptionInput, 'Task description');
        fireEvent.press(addButton);
        
        await waitFor(() => {
            expect(getByTestId('task-list')).toBeTruthy();
            expect(getByTestId('task-mock-uuid-1')).toBeTruthy();
            expect(getByText('○ New Task')).toBeTruthy();
        });
    });

    test('clears input fields after adding a task', async () => {
        const { getByPlaceholderText, getByText } = render(<Page />);
        
        const titleInput = getByPlaceholderText('Enter task...');
        const descriptionInput = getByPlaceholderText('Enter description (optional)...');
        const addButton = getByText('Add Task');
        
        fireEvent.changeText(titleInput, 'New Task');
        fireEvent.changeText(descriptionInput, 'Task description');
        fireEvent.press(addButton);
        
        await waitFor(() => {
            expect(titleInput.props.value).toBe('');
            expect(descriptionInput.props.value).toBe('');
        });
    });

    test('does not add a task when title is only whitespace', () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(<Page />);
        
        const titleInput = getByPlaceholderText('Enter task...');
        const addButton = getByText('Add Task');
        
        fireEvent.changeText(titleInput, '   ');
        fireEvent.press(addButton);
        
        expect(getByTestId('task-list-empty')).toBeTruthy();
    });

    test('adds a task when pressing Enter on title input', async () => {
        const { getByPlaceholderText, getByTestId } = render(<Page />);
        
        const titleInput = getByPlaceholderText('Enter task...');
        
        fireEvent.changeText(titleInput, 'New Task');
        fireEvent(titleInput, 'submitEditing');
        
        await waitFor(() => {
            expect(getByTestId('task-list')).toBeTruthy();
            expect(getByTestId('task-mock-uuid-1')).toBeTruthy();
        });
    });

    test('adds a task when pressing Enter on description input', async () => {
        const { getByPlaceholderText, getByTestId } = render(<Page />);
        
        const titleInput = getByPlaceholderText('Enter task...');
        const descriptionInput = getByPlaceholderText('Enter description (optional)...');
        
        fireEvent.changeText(titleInput, 'New Task');
        fireEvent.changeText(descriptionInput, 'Description');
        fireEvent(descriptionInput, 'submitEditing');
        
        await waitFor(() => {
            expect(getByTestId('task-list')).toBeTruthy();
            expect(getByTestId('task-mock-uuid-1')).toBeTruthy();
        });
    });

    test('deletes a task when delete is pressed', async () => {
        const { getByPlaceholderText, getByText, getByTestId, queryByTestId } = render(<Page />);
        
        const titleInput = getByPlaceholderText('Enter task...');
        const addButton = getByText('Add Task');
        
        fireEvent.changeText(titleInput, 'Task to delete');
        fireEvent.press(addButton);
        
        await waitFor(() => {
            expect(getByTestId('task-mock-uuid-1')).toBeTruthy();
        });
        
        const deleteButton = getByTestId('delete-mock-uuid-1');
        fireEvent.press(deleteButton);
        
        await waitFor(() => {
            expect(queryByTestId('task-mock-uuid-1')).toBeNull();
            expect(getByTestId('task-list-empty')).toBeTruthy();
        });
    });

    test('toggles task completion when toggle is pressed', async () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(<Page />);
        
        const titleInput = getByPlaceholderText('Enter task...');
        const addButton = getByText('Add Task');
        
        fireEvent.changeText(titleInput, 'Task to toggle');
        fireEvent.press(addButton);
        
        await waitFor(() => {
            expect(getByText('○ Task to toggle')).toBeTruthy();
        });
        
        const toggleButton = getByTestId('toggle-mock-uuid-1');
        fireEvent.press(toggleButton);
        
        await waitFor(() => {
            expect(getByText('✓ Task to toggle')).toBeTruthy();
        });
    });

    test('updates task stats correctly', async () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(<Page />);
        
        const titleInput = getByPlaceholderText('Enter task...');
        const addButton = getByText('Add Task');
        
        fireEvent.changeText(titleInput, 'Task 1');
        fireEvent.press(addButton);
        
        await waitFor(() => {
            expect(getByTestId('total-tasks')).toHaveTextContent('1 tasks');
            expect(getByTestId('completed-tasks')).toHaveTextContent('0 completed');
        });
        
        fireEvent.changeText(titleInput, 'Task 2');
        fireEvent.press(addButton);
        
        await waitFor(() => {
            expect(getByTestId('total-tasks')).toHaveTextContent('2 tasks');
            expect(getByTestId('completed-tasks')).toHaveTextContent('0 completed');
        });
        
        const toggleButton = getByTestId('toggle-mock-uuid-1');
        fireEvent.press(toggleButton);
        
        await waitFor(() => {
            expect(getByTestId('total-tasks')).toHaveTextContent('2 tasks');
            expect(getByTestId('completed-tasks')).toHaveTextContent('1 completed');
        });
    });

    test('handles multiple tasks correctly', async () => {
        const { getByPlaceholderText, getByText, getAllByText } = render(<Page />);
        
        const titleInput = getByPlaceholderText('Enter task...');
        const addButton = getByText('Add Task');
        
        fireEvent.changeText(titleInput, 'Task 1');
        fireEvent.press(addButton);
        
        fireEvent.changeText(titleInput, 'Task 2');
        fireEvent.press(addButton);
        
        fireEvent.changeText(titleInput, 'Task 3');
        fireEvent.press(addButton);
        
        await waitFor(() => {
            expect(getAllByText(/○ Task/)).toHaveLength(3);
        });
    });
});