import http from "http";

export type HttpServer= http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>