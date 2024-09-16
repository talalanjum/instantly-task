export default async function routes(fastify, options, done) {
  fastify.get("/ping", async (request, reply) => {
    return "pong\n";
  });

  fastify.get("/email", async (request, reply) => {
    const { search } = request.query;
    const query = fastify.db("emails");

    if (search) {
      query.where(function () {
        this.where("to", "like", `%${search}%`)
          .orWhere("cc", "like", `%${search}%`)
          .orWhere("bcc", "like", `%${search}%`)
          .orWhere("subject", "like", `%${search}%`)
          .orWhere("body", "like", `%${search}%`);
      });
    }

    const emails = await query;
    reply.send(emails);
  });

  fastify.post("/email", async (request, reply) => {
    const { to, cc, bcc, subject, body } = request.body;
    try {
      const [id] = await fastify.db("emails").insert({
        to,
        cc,
        bcc,
        subject,
        body,
      });

      const newEmail = await fastify.db("emails").where({ id }).first();
      reply.send(newEmail);
    } catch (error) {
      console.error("Failed to insert email:", error);
      reply.status(500).send({ error: "Failed to send email" });
    }
  });

  done();
}
