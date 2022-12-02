import { FastifyInstance } from 'fastify'
import * as User from '../controllers/user'

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', User.create)
  fastify.get('/users', User.list)
}