import { Card } from "@rneui/themed";
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useTotalAMountPaid } from "../utils/Hooks";
import { chartConfig, getTotalPayedStats } from "../utils/constants";

export const SavedVsTotal = () => {
    const { totalAmountPaid } = useTotalAMountPaid()
    const data = getTotalPayedStats(totalAmountPaid)
    return (
        <Card>
            <Card.Title>Saved vs Total</Card.Title>
            <Card.Divider />
            <View style={styles.card}>
                <PieChart
                    data={data}
                    width={300}
                    height={200}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    hasLegend
                />
            </View>
        </Card>
    )
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff', // Change background color as needed
        borderRadius: 10, // Adjust desired corner radius
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
});