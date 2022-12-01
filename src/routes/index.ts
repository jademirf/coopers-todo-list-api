import { FastifyInstance } from 'fastify'
import  { authRoutes } from './auth.routes'
import  { userRoutes } from './user.routes'


export default (fastify: FastifyInstance) => {
  authRoutes(fastify)
  userRoutes(fastify)
}