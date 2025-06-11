// components/TaskStats.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TaskStatsProps {
    totalTasks: number;
    completedTasks: number;
}

/**
 * Progress summary component displaying task completion statistics.
 * Features visual progress bar and comprehensive accessibility support.
 */
export function TaskStats({ totalTasks, completedTasks }: TaskStatsProps) {
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const pendingTasks = totalTasks - completedTasks;

    return (
        <View 
            style={styles.container}
            accessibilityRole="summary"
            accessibilityLabel={`Progress summary: ${completedTasks} of ${totalTasks} tasks completed, ${Math.round(progressPercentage)} percent complete`}
        >
            {/* Task count and completion percentage for quick overview */}
            <View style={styles.textContainer}>
                <Text 
                    style={styles.statsText}
                    accessibilityRole="text"
                >
                    {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'}
                    {/* Conditional completion count, only shown when there's completed tasks */}
                    {completedTasks > 0 && (
                        <Text 
                            style={styles.completedText}
                            accessibilityLabel={`, ${completedTasks} completed`}
                        >
                            , {completedTasks} completed
                        </Text>
                    )}
                </Text>
                <Text 
                    style={styles.percentageText}
                    accessibilityRole="text"
                    accessibilityLabel={`${Math.round(progressPercentage)} percent complete`}
                >
                    {Math.round(progressPercentage)}%
                </Text>
            </View>
            
            {/* Visual progress bar with accessibility attributes for screen readers */}
            <View 
                style={styles.progressBarContainer}
                accessibilityRole="progressbar"
                accessibilityValue={{
                    min: 0,
                    max: 100,
                    now: Math.round(progressPercentage),
                    text: `${Math.round(progressPercentage)}% complete`
                }}
                accessibilityLabel="Task completion progress"
            >
                <View style={styles.progressBarBackground}>
                    <View
                        style={[
                            styles.progressBarFill,
                            { width: `${Math.max(progressPercentage, 2)}%` } // Minimum 2% for visibility
                        ]}
                    />
                </View>
            </View>
            {/* Remaining tasks counter, only shown when there's pending tasks */}
            {pendingTasks > 0 && (
                <Text 
                    style={styles.pendingText}
                    accessibilityRole="text"
                    accessibilityLabel={`${pendingTasks} ${pendingTasks === 1 ? 'task' : 'tasks'} remaining`}
                >
                    {pendingTasks} {pendingTasks === 1 ? 'task' : 'tasks'} remaining
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    // Main container with shadow for visual elevation (inspired by MUI Paper component)
    container: {
        backgroundColor: '#ffffff', 
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        shadowColor: '#000000', 
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        minHeight: 125,
        paddingVertical: 16,
    },
    // Horizontal layout for main stats
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        minHeight: 22,
    },
    // Primary task count text with flexible width
    statsText: {
        fontSize: 16,
        color: '#24292f', 
        fontWeight: '500',
        flex: 1, 
        marginRight: 8,
    },
    // Highlighted completion count for positive reinforcement
    completedText: {
        color: '#0969da', 
        fontWeight: '600',
    },
    percentageText: {
        fontSize: 16,
        color: '#0969da', 
        fontWeight: '600',
        minWidth: 40, 
        textAlign: 'right',
    },
    progressBarContainer: {
        marginBottom: 8,
        paddingVertical: 4, 
    },
    // Progress bar track with rounded corners and overflow hidden
    progressBarBackground: {
        height: 8,
        backgroundColor: '#e1e4e8', 
        borderRadius: 4,
        overflow: 'hidden',
        minWidth: 1,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#0969da', 
        borderRadius: 4,
        minWidth: 1,
    },
    // Secondary text for remaining tasks, muted
    pendingText: {
        fontSize: 12,
        color: '#656d76',
        marginTop: 4,
        textAlign: 'center',
        lineHeight: 16, 
    },
});