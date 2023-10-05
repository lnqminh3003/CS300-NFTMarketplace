import * as dotenv from "dotenv";

dotenv.config();

const port = process.env["PORT"]!;
const dbUri = process.env["DB_URI"]!;

export { port, dbUri };
