import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import cors from '@fastify/cors'
import routes from './routes'
import swagger from "@fastify/swagger";
import { withRefResolver } from "fastify-zod";
import { version } from "../package.json";
import { JWT, SignOptions } from '@fastify/jwt';


const schema = {
  type: 'object',
  required: [ 'PORT', 'JWT_SECRET_KEY' ],
  properties: {
    PORT: {
      type: 'number',
      default: 3000,
    },
    JWT_SECRET_KEY: { type: 'string' }
  }
}

declare module 'fastify' {
  export interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
    secret: SignOptions;
  }
}

function bootstrap() {
  const server = Fastify({
    logger: {
      level: 'info',
      transport: {
        target: 'pino-pretty'
      }
    }
  })
  
  server.register(fastifyEnv, {
    dotenv: true, // will read .env in root folder
    confKey: 'config',
    schema: schema,
  })

  server.register(cors, {
    origin: true,
  })

  
  server.get('/check', async () => {
    return { message: 'It works!' }
  })

  server.addHook('preHandler', (request, reply, next) => {
    request.jwt = server.jwt
    return next()
  })

  routes(server)

  server.register(
    swagger,
    withRefResolver({
      routePrefix: "/docs",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Fastify API",
          description: "Todo list API",
          version,
        },
      },
    })
  );

  return server

}

export default bootstrap