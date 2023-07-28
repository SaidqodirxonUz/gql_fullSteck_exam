import http from "http";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import config from "./shared/config/index.js";
import { schema } from "./graphql/schema.js";

const app = express();

app.use(express.json());
app.use(cors());

const httpServer = http.createServer(app);

// const typeDefs = `
// type Query {
//     ping: String
// }
// `;
// const resolvers = {
//   Query: {
//     ping: () => "Pong",
//   },
// };

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
app.use("/gql", expressMiddleware(server));

httpServer.listen(config.port, () => {
  console.log(`http://localhost:${config.port}`);
});
