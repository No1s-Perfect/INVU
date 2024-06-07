import { ITempPhotos } from "./ITempPhotos";

export interface IPhotoTempContext {
    tempPhotos: ITempPhotos[];
    addTempPhoto: (photo: ITempPhotos) => void;
    deleteTempPhoto: (id: number) => void;
    bootstrapTmpPhotos: (photos: ITempPhotos[]) => void;
}