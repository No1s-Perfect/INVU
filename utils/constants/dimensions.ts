import { Dimensions } from 'react-native'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const DIMENSIONS = {
    WIDTH: screenWidth,
    HEIGHT: screenHeight
}