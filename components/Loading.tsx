import { View, ActivityIndicator } from "react-native"

export const Loading = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="black" />
        </View>
    )
}