import { FastifyInstance } from 'fastify'
import * as Auth from '../controllers/auth'

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/signin', Auth.signIn)
}