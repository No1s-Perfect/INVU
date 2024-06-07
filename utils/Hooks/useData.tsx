import { useContext } from "react";
import { IGlobalDataContext } from "../interfaces";
import { GlobalDataContext } from "../Context";

export const useData = (): IGlobalDataContext => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};