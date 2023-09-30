import fastify from "fastify";
import FastifyVite from "@fastify/vite";
import path from "node:path";

const server = fastify();

const PORT = process.env.PORT || 1234;

// Serve static files from the `dist` directory
server.register(FastifyVite, {
  root: path.join(__dirname, "dist"),
});

server.get("*", (_, reply) => {
  reply.send(path.join(__dirname, "dist/index.html"));
});

server.listen(() => console.log(`__SERVER_RUNNING__`, PORT));
