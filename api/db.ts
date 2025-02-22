import mysql from "mysql2/promise";

// Database connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "unbirthday_db",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Initialize database and tables
export const initDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS guests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        registeredAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    connection.release();
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

// Initialize the database when this module is imported
initDatabase().catch(console.error);

export default pool;
