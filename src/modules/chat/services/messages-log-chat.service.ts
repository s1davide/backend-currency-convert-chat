import { Pool } from "mysql2/typings/mysql/lib/Pool";
import { MysqlDatabase } from "./database/connect";

type DataMessage = {
  id: string;
  sessionId: string;
  message: string;
  typeConversion: string;
  convertionSelected: string;
  sender: string;
  date: Date;
};

export class MessagesService {
  connection: Pool;
  constructor() {
    this.connection = new MysqlDatabase().connection;
  }

  registerMessage(data: DataMessage) {
    const dateConverted = data.date
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    this.connection.query(
      `
    INSERT INTO messages (id, session_id, message, type_conversion, convertion_selected, sender, date) 
        VALUES ('${data.id}', '${data.sessionId}', '${data.message.replace(
        new RegExp(`[']`, "g"),
        ""
      )}', '${data.typeConversion}', '${data.convertionSelected}', '${
        data.sender
      }', '${dateConverted}');
    `,
      (err) => {
        if (err !== null) console.error(err);
      }
    );
  }
  getAllMessages() {
    this.connection.query(`SELECT * FROM messages;`);
  }
}
