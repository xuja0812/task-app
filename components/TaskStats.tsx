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
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.statsText}>
                    {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'}
                    {completedTasks > 0 && (
                        <Text style={styles.completedText}>
                            , {completedTasks} completed
                        </Text>
                    )}
                </Text>
                <Text style={styles.percentageText}>
                    {Math.round(progressPercentage)}%
                </Text>
            </View>
            <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                    <View 
                        style={[
                            styles.progressBarFill,
                            { width: `${progressPercentage}%` }
                        ]} 
                    />
                </View>
            </View>
            {pendingTasks > 0 && (
                <Text style={styles.pendingText}>
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
        minHeight: 100,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    statsText: {
        fontSize: 16,
        color: '#24292f', // dark gray
        fontWeight: '500',
    },
    completedText: {
        color: '#0969da', // light blue
        fontWeight: '600',
    },
    percentageText: {
        fontSize: 16,
        color: '#0969da', // light blue
        fontWeight: '600',
    },
    progressBarContainer: {
        marginBottom: 4,
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#e1e4e8', // light gray
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#0969da', // light blue
        borderRadius: 4,
        minWidth: 2, 
    },
    pendingText: {
        fontSize: 12,
        color: '#656d76', // gray
        marginTop: 4,
        textAlign: 'center',
    },
});