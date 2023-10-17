import { Express } from "express";
import swaggerUi from "swagger-ui-express";

const swagger = {
    openapi: "3.0.3",
    info: {
      title: "Backend currency convert app",
      description: "This is the backend for currency convert app",
      version: "0.0.1",
      contact: {
        email: "sdavide1010@gmai.com",
      },
    },
    servers: [
    //   {
    //     // url: "http://localhost:3005/api",
    //     description: "Server",
    //   },
    ],
    paths: {
      "/": {
        get: {
          description: "Welcome to the API REST ",
          summary: "Welcome to the API REST ",
          parameters: [
            {
              in: "header",
              name: "accept-language",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Return a welcome",
            },
          },
        },
      },
    },
    components: {},
    tags: [],
  };

export const configureSwagger = (app: Express) => app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));
