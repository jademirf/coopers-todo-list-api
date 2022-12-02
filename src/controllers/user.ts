
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { genHash } from '../plugins/authenticate'


const create = async (request: FastifyRequest, response: FastifyReply) => {
  const createUserBody = z.object({ 
    name: z.string().min(3),
    email: z.string().min(3),
    password: z.string().min(6),
  })
  const {name, email, password} = createUserBody.parse(request.body)
  
  const hashedPassword = await genHash(password)
 
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    response.status(201).send(user)
  } catch (err) {
    console.log('🚀 ~ file: user.controller.ts ~ line 22 ~ create ~ err', err)
    response.status(400).send(err)
  }

}

const list = async (request: FastifyRequest, response: FastifyReply) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      lists: true,
    }
  })

  return users
}

const show = async (request: FastifyRequest, response: FastifyReply) => {
  const getUserParams = z.object({
    id: z.string(),
  })

  const {id} = getUserParams.parse(request.params)

  const user = await prisma.user.findUnique({
    where: {id}
  })

  response.send(user)
}

export {
  create,
  list,
  show,
}