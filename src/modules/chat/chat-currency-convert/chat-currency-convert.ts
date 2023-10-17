import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { typeConversionOptions } from "./chat-type-convertion";
import { HttpServer } from "../../../types";
import { steps } from "./bot-behaviour";
import BotConversation from "./bot";


export type TypeConversion = keyof typeof typeConversionOptions | keyof typeof steps;

export type RoomData = {
  userName: string;
  room: string;
  typeConversion: TypeConversion;
};

export type TypeIO = Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap
>;

export type TypeSocket =
  | Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
  | undefined;

export class ChatCurrencyConvert {
  io: TypeIO;
  constructor(app: HttpServer) {
    this.io = new Server(app, { cors: { origin: "*" } });
    this.defineInitialEvents();
  }

  defineInitialEvents() {
    this.io.on("connection", (socket) => {
      socket.on("join_room", (roomData: RoomData) => {
        this.createNewRoom(socket, roomData);
      });
    });
  }

  createNewRoom(socket: TypeSocket, roomData: RoomData) {
    const { room, typeConversion, userName } = roomData;
    socket?.join(room);
    new BotConversation({ socket, io: this.io }, { room, typeConversion ,userName});
  }
}
