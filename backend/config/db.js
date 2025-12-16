import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "security_user",
  host: "localhost",
  database: "securitylab_db",
  password: "A231250211",
  port: 5432,
});

export default pool;
