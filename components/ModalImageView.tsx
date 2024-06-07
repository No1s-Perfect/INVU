import { useRef } from "react";
import { ImageView } from "./ImageView";
import { ViewToken } from "react-native";
import * as Haptics from 'expo-haptics';
import { ModalImageViewType } from "../utils";

export const ModalImageView: React.FC<ModalImageViewType> = ({ route }) => {
    const tempPhotos = route.params?.data?.map?.(photo => ({ ...photo, uri: photo.photoUri }))
    const ref = useRef(0)

    const handleDelete = (id: number) => {

    };


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
            viewOnly
        />
    )
}