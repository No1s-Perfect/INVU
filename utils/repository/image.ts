import { ImgData } from "../interfaces/ImgData";
import { imageDb } from "./connections";

export const createImages = () =>
  imageDb.execSync(
    "CREATE TABLE IF NOT EXISTS image (id INTEGER PRIMARY KEY AUTOINCREMENT, expenseId INTEGER, photoUri TEXT, FOREIGN KEY (expenseId) REFERENCES documents(id));"
  );

export const truncateImages = () => {
  imageDb.execSync("DELETE FROM image;");
};

export const getPhotoUrisByExpenseId = async (expenseId: number) => {
  const statment = await imageDb.prepareAsync(
    "SELECT * FROM image WHERE expenseId = $expenseId"
  );
  const result = await statment.executeAsync<any>({ $expenseId: expenseId });
  const rows = await result.getAllAsync();
  return rows.map((item) => ({
    id: item.id,
    photoUri: item.photoUri,
  }));
};

export const insertImages = async (
  photoUri: string[],
  insertId: number
): Promise<ImgData[]> => {
  await Promise.all(
    photoUri.map((uri) =>
      imageDb.runAsync(
        "INSERT INTO image (expenseId, photoUri) VALUES (?, ?)",
        insertId,
        uri
      )
    )
  );
  return photoUri.map((photoUri) => ({ id: insertId, photoUri } as ImgData));
};
