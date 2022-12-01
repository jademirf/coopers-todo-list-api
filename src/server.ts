import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import routes from './routes'
import swagger from "@fastify/swagger";
import { withRefResolver } from "fastify-zod";
import { version } from "../package.json";


const schema = {
  type: 'object',
  required: [ 'PORT', 'JWT_SECRET_KEY' ],
  properties: {
    PORT: {
      type: 'string',
      default: 3000
    },
    JWT_SECRET_KEY: { type: 'string' }
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

  server.register(jwt, {
    secret: process.env.JWT_SECRET_KEY
  })

  server.get('/check', async () => {
    return { message: 'It works!'}
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
          description: "API for some products",
          version,
        },
      },
    })
  );

  // server.listen({ port: server.config.PORT || 3000, host: '0.0.0.0' }, (err: Error) => {
  //   if (err) {
  //     server.log.error(err)
  //     process.exit(1)
  //   }
  // })

  return server

}

export default bootstrap