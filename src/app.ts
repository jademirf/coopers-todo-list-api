import jwt from '@fastify/jwt'

import bootstrap from "./server";

const server = bootstrap();

async function main() {
  let PORT = 3002 
  PORT = process.env.PORT ? parseInt(process.env.PORT) : 3002

  try {
    server.listen({
      port: PORT,
    });

    console.log(`Server ready at http://localhost:${PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();