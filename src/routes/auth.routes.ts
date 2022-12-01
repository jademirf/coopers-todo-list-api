import { FastifyReply, FastifyRequest,  FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { verifyHash } from '../plugins/authenticate'

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/signin',(req: FastifyRequest, res: FastifyReply) => {
    async (fastify: FastifyInstance, request: FastifyRequest, response: FastifyReply) => {
      const authUserBody = z.object({ 
        login: z.string().min(5),
        password: z.string().min(6)
      })
      const {login, password} = authUserBody.parse(request.body)
      console.log('🚀 ~ file: auth.controller.ts ~ line 15 ~ signIn ~ password', password)
    
      const user = await prisma.user.findUnique({where:{
        login,
      }})
      if(!user) {
        return response.status(400).send('user not found')
      }
    
      const isPasswordValid = await verifyHash(password, user.password)
      
      if(!isPasswordValid) {
        return response.status(400).send('Informmed user or password is wrong')
      }
    
    
      const token = await fastify.jwt.sign({
        login
      }, fastify.config.JWT_SECRET_KEY, {
        sub: user.id,
        expiresIn: '3 days'
      })
    
      return response.send({login: user.login, token})
    }
  })
}