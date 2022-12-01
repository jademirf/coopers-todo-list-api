import '@fastify/jwt'

export module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string;
      name: string;
    }
  }
}