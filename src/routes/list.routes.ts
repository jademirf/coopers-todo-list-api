import { FastifyInstance } from 'fastify'
import * as List from '../controllers/list'
import { authenticate } from '../plugins/authenticate'

export async function listRoutes(fastify: FastifyInstance) {
  fastify.post('/lists', {
    onRequest: [authenticate],
  }, List.create)
  fastify.patch('/lists', {
    onRequest: [authenticate],
  }, List.update)
  fastify.get('/lists', {
    onRequest: [authenticate],
  }, List.list)
  fastify.get('/lists/:id', {
    onRequest: [authenticate],
  }, List.list)
}