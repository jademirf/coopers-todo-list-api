import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { verifyHash } from '../plugins/authenticate'

export const signIn = async (req: FastifyRequest, res: FastifyReply) => {
  async (fastify: FastifyInstance, request: FastifyRequest, response: FastifyReply) => {
    const authUserBody = z.object({ 
      email: z.string().min(5),
      password: z.string().min(6)
    })
    const {email, password} = authUserBody.parse(request.body)
    console.log('🚀 ~ file: auth.controller.ts ~ line 15 ~ signIn ~ password', password)
  
    const user = await prisma.user.findUnique({where:{
      email,
    }})
    if(!user) {
      return response.status(400).send('user not found')
    }
  
    const isPasswordValid = await verifyHash(password, user.password)
    
    if(!isPasswordValid) {
      return response.status(400).send('Informmed user or password is wrong')
    }
  
  
    const token = fastify.jwt.sign({
      email
    }, fastify.secret)
  
    return response.send({email: user.email, token})
  }
}