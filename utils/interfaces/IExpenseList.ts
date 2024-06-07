import { ImgData } from "./ImgData";

export interface IExpenseList {
    search: string;
    handleLongPress: (imgData: ImgData[]) => void;

} 