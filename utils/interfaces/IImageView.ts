import { ViewToken } from "react-native";

export interface IImageView {
    onDelete: (id: number) => void;
    onViewableItemsChanged: ((info: {
        viewableItems: ViewToken[];
        changed: ViewToken[];
    }) => void)
    data: any[]
    viewOnly?: boolean
} 