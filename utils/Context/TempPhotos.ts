import { createContext } from 'react';
import { IPhotoTempContext } from '../interfaces';

export const TempPhotosContext = createContext<IPhotoTempContext | null>(null);