import { createContext } from 'react';
import { IGlobalDataContext } from '../interfaces';

export const GlobalDataContext = createContext<IGlobalDataContext | null>(null);
