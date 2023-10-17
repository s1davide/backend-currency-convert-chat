import { Pool } from "mysql2/typings/mysql/lib/Pool";
import { MysqlDatabase } from "./database/connect";

type DataSession={
  id:string, date:Date,userName:string
}

export class SessionsService {
  connection: Pool;
  constructor() {
    this.connection= (new MysqlDatabase()).connection;
  }
  
  registerSession(data:DataSession){
    const dateConverted=data.date.toISOString().slice(0, 19).replace("T", " ")
    this.connection.query(`
    INSERT INTO sessions (id, nombre_de_usuario, date) 
        VALUES ('${data.id}', '${data.userName}','${dateConverted}');
    `, (err)=>{
      
      if (err !== null) console.error(err);
    })
  }

  getAllSessions(){
    this.connection.query(`SELECT * FROM sessions;`)
  }
}
