// utils/dateFormatting.ts

export function formatTaskDate(createdAt: Date): string {
    const now = new Date();
    if (!createdAt || isNaN(createdAt.getTime())) {
        return 'Invalid date';
    }
    if (createdAt > now) {
        return 'Future date';
    }
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const taskDateOnly = new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate());
    const diffInMs = nowDate.getTime() - taskDateOnly.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 3600 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays === 7) return '1 week ago';
    
    return createdAt.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: createdAt.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
}