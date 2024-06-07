//import { SQLError } from "expo-sqlite";
import { GlobalData } from "../interfaces";
import { db } from "./connections";
import { getPhotoUrisByExpenseId } from "./image";
export const createDocs = () => {
  db.execSync(
    "CREATE TABLE IF NOT EXISTS documents (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, date TEXT);"
  );
};

export const truncateDocs = () => {
  db.execSync("DELETE FROM documents;");
};

export const dropTable = () => {
  db.execSync("DROP TABLE IF EXISTS documents;");
};

export const createSingleDoc = (
  amount: number,
  date: string,
  cb: (insertId: number) => Promise<void>,
  cbError: (error: any) => void
) => {
  const statment = db.prepareSync(
    "INSERT INTO documents (amount, date) VALUES ($amount, $date);"
  );
  const result = statment.executeSync({ $amount: amount, $date: date });
  cb(result.lastInsertRowId).then().catch(cbError);
  statment.finalizeSync();
};

export const retrieveAllExpenses = async () => {
  const result = await db.getAllAsync<any>("SELECT * FROM documents;");
  const fetchedExpenses: GlobalData[] = [];

  for (let i = 0; i < result.length; i++) {
    try {
      const { id, amount, date } = result[i];
      const photoUri = await getPhotoUrisByExpenseId(id);
      fetchedExpenses.push({ id, amount, date, photoUri });
    } catch (e) {}
  }
  return fetchedExpenses;
};

export const isThisMonthCovered = async () => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const statment = await db.prepareAsync(
    "SELECT * FROM documents WHERE date LIKE $value;"
  );
  const result = await statment.executeAsync({
    $value: `%${currentYear}/${
      currentMonth < 10 ? "0" + currentMonth : currentMonth
    }%`,
  });
  const monthPayed = await result.getFirstAsync();
  return monthPayed !== null;
};

export const getTotalAmountPayed = async () => {
  const rows = await db.getAllAsync<any>("SELECT amount FROM documents;");
  return rows.reduce(
    (acc: number, curr: { amount: number }) => acc + curr.amount,
    0
  );
};
