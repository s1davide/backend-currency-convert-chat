import  { Express } from "express";
import logChat from "../modules/chat/controllers/log-chat.controller";

const initilizeRoutes = (app: Express) => {

  app.use("/api", logChat);
};

export default initilizeRoutes;
