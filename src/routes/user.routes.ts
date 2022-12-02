import { FastifyInstance } from 'fastify'
import * as User from '../controllers/user'
import { authenticate } from '../plugins/authenticate'

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', User.create)
  fastify.get('/users', User.list)
  fastify.get('/users/:id', {
    onRequest: [authenticate],
  }, User.list)
}