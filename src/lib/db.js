import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL); // must be defined at runtime
export default sql;