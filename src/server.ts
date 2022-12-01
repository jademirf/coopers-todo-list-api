import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import routes from './routes'
import { FastifyInstance } from 'fastify'


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

async function bootstrap() {
  const fastify = Fastify({
    logger: {
      level: 'info',
      transport: {
        target: 'pino-pretty'
      }
    }
  })
  
  await fastify.register(fastifyEnv, {
    dotenv: true, // will read .env in root folder
    confKey: 'config',
    schema: schema,
  })

  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(jwt, {
    secret: fastify.config.JWT_SECRET_KEY
  })

  fastify.get('/', async () => {
    return { message: 'It works!'}
  })

  routes(fastify)

  fastify.listen({ port: fastify.config.PORT || 3000, host: '0.0.0.0' }, (err: Error) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })

}

bootstrap()

export default bootstrap