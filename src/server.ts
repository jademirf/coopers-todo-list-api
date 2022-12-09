import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import cors from '@fastify/cors'
import routes from './routes'
import { JWT, SignOptions } from '@fastify/jwt';
import jwt from '@fastify/jwt'



const schema = {
  type: 'object',
  required: [ 'PORT', 'JWT_SECRET_KEY' ],
  properties: {
    PORT: {
      type: 'number',
      default: 3333,
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
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'klsjadloipuo234-12k3l12oiu342ll'

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

  server.register(jwt, {
    secret: JWT_SECRET_KEY
  })

  server.addHook('preHandler', (request, reply, next) => {
    request.jwt = server.jwt
    return next()
  })

  routes(server)

  return server

}

export default bootstrap