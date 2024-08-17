import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(
  "postgresql://neondb_owner:7F5LzeySIlEY@ep-cold-glade-a5g0j7dg.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require"
);
const db = drizzle(sql, { schema });
