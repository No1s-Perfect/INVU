import { GlobalData } from "./IGlobalData";

export interface IGlobalDataContext {
    globalData: GlobalData[];
    deleteData: (id: number) => void;
    deleteDataImage: (id: number, imgId: number) => void;
    updateDataImage: (id: number, imgId: number, photoUri: string) => void;
    addData: (data: GlobalData) => void;
    bootstrapGlobalData: (globalData: GlobalData[]) => void;
}