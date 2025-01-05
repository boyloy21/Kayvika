import mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "kayvika",
    password: "Admin1234",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});