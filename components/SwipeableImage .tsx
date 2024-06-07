import React, { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { ISwipeableImage } from '../utils';
import { Base64Img } from './Base64Img';
import { DIMENSIONS, SWIPE } from '../utils/constants';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { StyleSheet } from 'react-native'
const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
};

const padding = 20;
export const SwipeableImage = ({ imageUri, onDelete, id, viewOnly = false }: ISwipeableImage) => {
    const [isDeleted, setDeleted] = useState(false);


    const onSwipe = (gestureName: string) => {
        if (viewOnly) return;
        if (gestureName === SWIPE.LEFT) {
            setDeleted(true)
            setTimeout(() => {
                onDelete(id);
            }, 500)
        }
    };

    const opacity = useAnimatedStyle(() => {
        return {
            opacity: withTiming(isDeleted ? 0 : 1, { duration: 500, easing: Easing.linear }),
            transform: [
                {
                    translateX: withTiming(isDeleted ? -100 : 0, { duration: 500, easing: Easing.linear }),
                },
            ]
        };
    });
    return (
        <Animated.View style={[styles.container, opacity]}>
            <GestureRecognizer
                onSwipe={onSwipe}
                config={config}

            >
                <Base64Img uri={imageUri} styles={styles.image} />
            </GestureRecognizer>
        </Animated.View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 20,
    },
    image: {
        resizeMode: 'cover',
        margin: padding,
        borderColor: 'black',
        borderWidth: 2,
        height: DIMENSIONS.HEIGHT,
        width: DIMENSIONS.WIDTH - 2 * padding,
        flex: 1,
        borderRadius: 10
    }
});