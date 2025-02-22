import mysql from "mysql2/promise";

// Database connection configuration using URL
const dbUrl = process.env.DATABASE_URL!;

// Create connection pool
const pool = mysql.createPool(dbUrl);

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
