import { HttpServer } from "../types";
import { ChatCurrencyConvert } from "../modules/chat/chat-currency-convert/chat-currency-convert";


export const initializeSocketIO = (app: HttpServer) => {
     new ChatCurrencyConvert(app);
  
};
