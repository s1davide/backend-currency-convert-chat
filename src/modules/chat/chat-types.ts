export type Message = {
    title?: string;
    text: string;
    date: Date;
    sender: "user" | "server";
  };