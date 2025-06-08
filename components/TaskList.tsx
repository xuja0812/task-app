// components/TaskList.tsx
import React from 'react';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

export function TaskList({ tasks, onDeleteTask, onToggleComplete }: TaskListProps) {
  return(
    <>
    </>
  );
}