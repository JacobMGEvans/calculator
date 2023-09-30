import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "node:path";
const server = fastify();
const PORT = process.env.PORT || 1234;
server.register(fastifyStatic, {
  root: path.join(__dirname, "dist")
});
server.get("*", (_, reply) => {
  reply.send(path.join(__dirname, "dist/index.html"));
});
server.listen(() => console.log(`__SERVER_RUNNING__`, PORT));
