import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "ashleylin",
  database: "security_lab"
});

export default pool;
