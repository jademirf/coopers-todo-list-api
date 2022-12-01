import { FastifyInstance } from 'fastify'
import  { authRoutes } from './auth.routes'

export default (fastify: FastifyInstance) => {
  authRoutes(fastify)
}