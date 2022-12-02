import { FastifyRequest, FastifyReply } from "fastify"
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { verifyHash } from '../plugins/authenticate'
import bootstrap from "../server"

export const signIn = async (req: FastifyRequest, res: FastifyReply) => {
  const fastify = bootstrap()

  const authUserBody = z.object({ 
    email: z.string().min(5),
    password: z.string().min(6)
  })
  const {email, password} = authUserBody.parse(req.body)

  const user = await prisma.user.findUnique({where:{
    email,
  }})
  
  if(!user) {
    return res.status(400).send('user not found')
  }

  const isPasswordValid = await verifyHash(password, user.password)
  
  if(!isPasswordValid) {
    return res.status(401).send('Informmed user or password is wrong')
  }


  const token = req.jwt.sign({
    email
  }, fastify.secret)

  return res.status(200).send({email: user.email, token: token})
}