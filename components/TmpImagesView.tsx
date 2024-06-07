import { ViewToken } from "react-native"
import { useTmpPhoto } from "../utils/Hooks/useTmpPhoto"
import { useEffect, useRef } from "react"
import { TempImagesProps } from "../utils"
import * as Haptics from 'expo-haptics';
import { ImageView } from "./ImageView"

export const TmpImagesView: React.FC<TempImagesProps> = (props) => {
    const { tempPhotos, deleteTempPhoto } = useTmpPhoto()
    const ref = useRef(0)
    const handleDelete = (id: number) => {
        deleteTempPhoto(id)
    };

    useEffect(() => {
        if (tempPhotos.length === 0) {
            props.navigation.navigate('FormScreen')
        }
    }, [tempPhotos])

    const triggerHapticFeedback = () => {

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    };

    const onViewableItemsChanged = ({ changed }: {
        viewableItems: ViewToken[];
        changed: ViewToken[];
    }) => {
        if (Number(changed[0].key) !== ref.current) {
            ref.current = Number(changed[0].key)
            triggerHapticFeedback()
        }
    }
    return (
        <ImageView
            data={tempPhotos}
            onDelete={handleDelete}
            onViewableItemsChanged={onViewableItemsChanged}
        />
    )
}
