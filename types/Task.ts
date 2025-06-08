// types/Task.ts
export interface Task {
    // id could be a number, but string is more flexible
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
}