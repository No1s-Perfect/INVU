import { Image } from "react-native"
import { IBase64Img } from "../utils"

export const Base64Img = ({ uri, styles }: IBase64Img) => {

    return (
        <Image source={{ uri: `data:image/jpeg;base64,${uri}` }} style={styles}
            defaultSource={require('../assets/loading.png')}
        />
    )
}