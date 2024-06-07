import { StyleSheet, FlatList, SafeAreaView } from "react-native"
import { SwipeableImage } from "./SwipeableImage "
import { IImageView } from "../utils"

export const ImageView = (props: IImageView) => {


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={props.data}
                viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
                onViewableItemsChanged={props.onViewableItemsChanged}
                snapToAlignment="start"
                decelerationRate="fast"
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    <SwipeableImage
                        id={item.id}
                        imageUri={item.uri}
                        onDelete={props.onDelete}
                        viewOnly={props.viewOnly}
                    />}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});