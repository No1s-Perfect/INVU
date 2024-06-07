export interface ISwipeableImage {
    imageUri: string
    onDelete: (id: number) => void
    id: number
    viewOnly?: boolean
}