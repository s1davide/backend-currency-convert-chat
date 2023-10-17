import express from "express";
import { v4 as uuidv4 } from 'uuid';


const logChat = express.Router();

logChat.post("/get-uuid",(req,res)=>{    
    const sessionId= uuidv4();
   
    res.send(sessionId)
});

export default logChat;
