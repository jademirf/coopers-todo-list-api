declare module 'fastify' {
  interface FastifyInstance {
    register(userRoutes: (fastify: FastifyInstance) => Promise<void>): unknown;
    post(arg0: string, arg1: any): unknown;
    config: { // this should be same as the confKey in options
      // specify your typing here
    };
  }
}