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
  fastify.get('/items/list/:listId', {
    onRequest: [authenticate],
  }, Item.list)
  fastify.get('/items/:id', {
    onRequest: [authenticate],
  }, Item.list)
  fastify.delete('/items/:id', {
    onRequest: [authenticate],
  }, Item.list)
  fastify.delete('/items/list/:listId', {
    onRequest: [authenticate],
  }, Item.deleteAll)
}