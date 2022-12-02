import { FastifyInstance } from 'fastify'
import  { authRoutes } from './auth.routes'
import  { listRoutes } from './list.routes'
import  { itemRoutes } from './item.routes'
import  { userRoutes } from './user.routes'


export default (fastify: FastifyInstance) => {
  authRoutes(fastify)
  listRoutes(fastify)
  itemRoutes(fastify)
  userRoutes(fastify)
}