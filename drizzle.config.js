/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:7F5LzeySIlEY@ep-cold-glade-a5g0j7dg.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require",
  },
};
