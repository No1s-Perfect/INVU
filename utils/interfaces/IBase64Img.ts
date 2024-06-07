import { StyleProp, ImageStyle } from "react-native"

export interface IBase64Img {
    styles?:StyleProp<ImageStyle>
    uri:string
}