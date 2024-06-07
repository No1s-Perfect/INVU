import { useContext } from "react";
import { IPhotoTempContext } from "../interfaces";
import { TempPhotosContext } from "../Context";

export const useTmpPhoto = (): IPhotoTempContext => {
  const context = useContext(TempPhotosContext);
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};