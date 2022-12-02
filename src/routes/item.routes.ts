import { FastifyInstance } from 'fastify'
import * as Item from '../controllers/item'
import { authenticate } from '../plugins/authenticate'

export async function itemRoutes(fastify: FastifyInstance) {
  fastify.post('/items', {
    onRequest: [authenticate],
  }, Item.create)
  fastify.patch('/items/:id', {
    onRequest: [authenticate],
  }, Item.update)
  fastify.get('/items/lists/:listId', {
    onRequest: [authenticate],
  }, Item.list)
  fastify.delete('/items/:id', {
    onRequest: [authenticate],
  }, Item.deleteOne)
  fastify.delete('/items/lists/:listId', {
    onRequest: [authenticate],
  }, Item.deleteAll)
}