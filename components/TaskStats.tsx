// components/TaskStats.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TaskStatsProps {
    totalTasks: number;
    completedTasks: number;
}

export function TaskStats({ totalTasks, completedTasks }: TaskStatsProps) {
    if (totalTasks === 0) {
        return null;
    }

    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const pendingTasks = totalTasks - completedTasks;

    return (
        <View 
            style={styles.container}
            accessibilityRole="summary"
            accessibilityLabel={`Progress summary: ${completedTasks} of ${totalTasks} tasks completed, ${Math.round(progressPercentage)} percent complete`}
        >
            <View style={styles.textContainer}>
                <Text 
                    style={styles.statsText}
                    accessibilityRole="text"
                >
                    {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'}
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
    container: {
        backgroundColor: '#ffffff', // white
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        shadowColor: '#000000', // black
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
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        minHeight: 22,
    },
    statsText: {
        fontSize: 16,
        color: '#24292f', // dark gray
        fontWeight: '500',
        flex: 1, 
        marginRight: 8,
    },
    completedText: {
        color: '#0969da', // light blue
        fontWeight: '600',
    },
    percentageText: {
        fontSize: 16,
        color: '#0969da', // light blue
        fontWeight: '600',
        minWidth: 40, 
        textAlign: 'right',
    },
    progressBarContainer: {
        marginBottom: 8,
        paddingVertical: 4, 
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#e1e4e8', // light gray
        borderRadius: 4,
        overflow: 'hidden',
        minWidth: 1,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#0969da', // light blue
        borderRadius: 4,
        minWidth: 1,
    },
    pendingText: {
        fontSize: 12,
        color: '#656d76', // gray
        marginTop: 4,
        textAlign: 'center',
        lineHeight: 16, 
    },
});