// ESM
import Fastify from "fastify";
import routes from "./src/routes/index.js";
import knex_config from "./knexfile.js";
import cors from "@fastify/cors";
import knex from "knex";

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true,
});

const db = knex(knex_config.development);

fastify.register(cors, {
  origin: "*",
});

fastify.register(routes);

fastify.decorate("db", db);

fastify.listen({ port: process.env.PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is now listening on ${address}`);
});
