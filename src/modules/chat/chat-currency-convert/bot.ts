import {
  RoomData,
  TypeConversion,
  TypeIO,
  TypeSocket,
} from "./chat-currency-convert";
import { steps } from "./bot-behaviour";
import { convertCurrency } from "../services/convert.currency";
import { typeConversionOptions } from "./chat-type-convertion";
import { Message } from "../chat-types";
import { v4 as uuidv4 } from "uuid";
import { SessionsService } from "../services/session-log-chat.service";
import { MessagesService } from "../services/messages-log-chat.service";



type SocketData = {
  io: TypeIO;
  socket: TypeSocket;
};

export default class BotConversation {
  id: string;
  io: TypeIO;
  socket: TypeSocket;
  typeConversion: TypeConversion;
  room: string;
  step = 0;
  option = "";
  finished = false;
  sessionsService: SessionsService;
  messagesService: MessagesService
  constructor(socketData: SocketData, infoConversation: RoomData) {
    this.io = socketData.io;
    this.socket = socketData.socket;
    this.room = infoConversation.room;
    this.typeConversion = infoConversation.typeConversion;
    
    this.id = uuidv4();
    this.sessionsService = new SessionsService();
    this.messagesService = new MessagesService();

    this.sessionsService.registerSession({
      id: this.id,
      date: new Date(),
      userName: infoConversation.userName,
    });

    this.sendMessageConversation();
    this.initializeEventListenClient();
  }

  sendMessageConversation() {
    const date = new Date();
    this.io.to(this.room)?.emit("server_message", {
      date: date,
      text: steps[this.typeConversion][this.step].message,
      title: typeConversionOptions[this.typeConversion],
      sender: "server",
    });
    
    this.messagesService.registerMessage({
        id:uuidv4(),
        sessionId: this.id,
        date:new Date(),
        typeConversion:typeConversionOptions[this.typeConversion],
        convertionSelected: this.option==="1"? "Pesos a Dolares":"Dolares a Pesos",
        message:steps[this.typeConversion][this.step].message as string,
        sender: "Servidor"
      })
  }

  sendMessageIncorrectOption() {
    const date = new Date();
    this.io.to(this.room)?.emit("server_message", {
      date: date,
      text: "Opción no válida",
      title: typeConversionOptions[this.typeConversion],
      sender: "server",
    });
    if(this.step>0) {this.messagesService.registerMessage({
        id:uuidv4(),
        sessionId: this.id,
        date:new Date(),
        typeConversion:typeConversionOptions[this.typeConversion],
        convertionSelected: this.option==="1"? "Pesos a Dolares":"Dolares a Pesos",
        message:"Opción no válida",
        sender: "Servidor"
      })}
    this.sendMessageConversation();
  }

  initializeEventListenClient() {
    this.socket?.on("client_message", (message: Message) => {
      this.reviewReceivedMessage(message);
    });
  }

  reviewReceivedMessage(message: Message) {
    const correctValue = steps[this.typeConversion][this.step]?.expected?.(
      message.text
    );

    if (this.finished) return;

    if (correctValue) {
      if (this.step === 0) this.option = message.text;
      this.step += 1;
     
      this.messagesService.registerMessage({
        id:uuidv4(),
        sessionId: this.id,
        date:new Date(),
        typeConversion:typeConversionOptions[this.typeConversion],
        convertionSelected: this.option==="1"? "Pesos a Dolares":"Dolares a Pesos",
        message:message.text,
        sender: "Usuario"
      })

      if (this.step === steps[this.typeConversion].length - 1) {
        this.sendMessageWithResults(message.text);
      } else {
        this.sendMessageConversation();
      }
    } else {
      this.sendMessageIncorrectOption();
    }
  }

  async sendMessageWithResults(value: string) {
    const date = new Date();
    const message = steps[this.typeConversion][this.step].message as (
      p: string
    ) => string;

    const finalMessage = await this.consultAndReplaceValues(
      value,
      message(this.option)
    );

    this.io.to(this.room)?.emit("server_message", {
      date: date,
      text: finalMessage,
      title: typeConversionOptions[this.typeConversion],
      sender: "server",
    });

    this.messagesService.registerMessage({
        id:uuidv4(),
        sessionId: this.id,
        date:new Date(),
        typeConversion:typeConversionOptions[this.typeConversion],
        convertionSelected: this.option==="1"? "Pesos a Dolares":"Dolares a Pesos",
        message:finalMessage,
        sender: "Servidor"
      })

    this.finished = true;

    setTimeout(() => {
      this.resetProccess();
    }, 1000);
  }

  async consultAndReplaceValues(value: string, template: string) {
    const convertedValue = await convertCurrency(
      this.option,
      value,
      steps[this.typeConversion][this.step]?.currency as string[]
    );
    let finalTemplate = template;
    const format = { style: "currency", currency: "USD" };
    const valueFormatted = new Intl.NumberFormat("en-US", format).format(
      parseFloat(value)
    );
    const convertedValueFormatted = new Intl.NumberFormat(
      "en-US",
      format
    ).format(parseFloat(convertedValue));
    finalTemplate = template.replace("{value1}", valueFormatted);
    finalTemplate = finalTemplate.replace("{value2}", convertedValueFormatted);

    return finalTemplate;
  }

  resetProccess() {
    this.option = "";
    this.step = 0;
    this.finished = false;
    this.sendMessageConversation();
  }
}
