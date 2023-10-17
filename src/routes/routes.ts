import  { Express } from "express";
import logChat from "../modules/chat/controllers/log-chat.controller";

const initilizeRoutes = (app: Express) => {
  app.use("/", (req,res)=> {
    res.send("aaa")
  });  
  app.use("/api", logChat);
};

export default initilizeRoutes;
