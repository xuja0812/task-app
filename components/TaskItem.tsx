// components/TaskItem.tsx
import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onDeleteTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

export function TaskItem({ task, onDeleteTask, onToggleComplete }: TaskItemProps) {

  return (
    <>
    </>
  );
}
