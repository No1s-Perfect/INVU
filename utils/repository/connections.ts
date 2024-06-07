import * as SQLite from "expo-sqlite";
export const db = SQLite.openDatabaseSync("documents.db");
export const imageDb = SQLite.openDatabaseSync("image.db");
