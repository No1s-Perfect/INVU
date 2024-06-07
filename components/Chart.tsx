import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SavedVsTotal } from './SavedVsTotal';

const Chart: React.FC = () => {
    return (
        <View style={styles.container}>
            <SavedVsTotal />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
});

export default Chart;
