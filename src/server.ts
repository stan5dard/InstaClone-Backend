require('dotenv').config();
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import express from "express";
import {typeDefs, resolvers} from "./schema";
import client from "./client"
import { getUser } from "./users/users.utils";
import logger from "morgan"

const PORT = process.env.PORT;

async function startServer() {
    const server = new ApolloServer({
        resolvers,
        typeDefs,
        context: async ({ req }) => {
            return {
                loggedInUser: await getUser(req.headers.token),
                client: client
            }
        },
    });

    await server.start();

    const app = express();
    app.use(logger("tiny"))
    app.use("/static", express.static("uploads"))
    app.use(graphqlUploadExpress());
    server.applyMiddleware({app});
    await new Promise<void>(r => app.listen({port: PORT}, r));
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`)
}

startServer();

//server.listen(PORT).then(()=>console.log(`Server is running on http://localhost:${PORT}/`))
