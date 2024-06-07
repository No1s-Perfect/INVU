import { Image, View, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { IAnimatedGIF } from '../utils';


export const AnimatedGIF = ({title, url, unicode}: IAnimatedGIF) => {

    const animatedValue = useRef(new Animated.Value(1)).current;
    useEffect(() => {

        const pumpAnimation = Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: 1.2,
                duration: 500,
                useNativeDriver: false,
                easing: Easing.ease,
            }),
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
                easing: Easing.ease,
            }),
        ]);

        const loopAnimation = Animated.loop(pumpAnimation);
        loopAnimation.start();
        return () => loopAnimation.stop();
    }, [animatedValue]);

    return (

        <View style={{ display: 'flex', alignItems: 'center' }}>
            <Animated.Text style={[{ transform: [{ scale: animatedValue }] }]}>{title}{unicode}</Animated.Text>
            <Image source={url as any}
            style={{
                width: 200,
                height: 200,
                resizeMode: 'cover'
            }} />
        </View>

    )
}