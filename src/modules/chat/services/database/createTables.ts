import { Pool } from "mysql2/typings/mysql/lib/Pool";

export const createTableSessions = (connection: Pool) => {
  connection.query(`
    CREATE TABLE IF NOT EXISTS sessions (
        id VARCHAR(50) PRIMARY KEY,
        date DATETIME,
        nombre_de_usuario VARCHAR(255)
    );
    `);
};

export const createTableMessages = (connection: Pool) => {
  connection.query(`
    CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(255) PRIMARY KEY,
        session_id VARCHAR(50),
        message TEXT,
        type_conversion  VARCHAR(50),
        convertion_selected VARCHAR(50),
        sender VARCHAR(255),        
        date DATETIME,
        FOREIGN KEY (session_id) REFERENCES sessions(id)
    );
 `);
};
