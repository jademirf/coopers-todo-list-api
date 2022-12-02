
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'


const create = async (request: FastifyRequest, response: FastifyReply) => {
  const createListBody = z.object({ 
    title: z.string().min(3),
    userId: z.string(),
    isActive: z.boolean(),
  })
  const {title, userId, isActive = true } = createListBody.parse(request.body)
  

  try {
    const list = await prisma.list.create({
      data: {
        title,
        ownerId: userId,
        isActive
      }
    })
    response.status(201).send(list)
  } catch (err) {
    console.log('🚀 ~ file: list.controller.ts ~ line 22 ~ create ~ err', err)
    response.status(400).send(err)
  }

}

const list = async (request: FastifyRequest, response: FastifyReply) => {
  const lists = await prisma.list.findMany({
    select: {
      title: true,
      items: true,
      id: true
    }
  })

  return lists
}

const update = async (request: FastifyRequest, response: FastifyReply) => {
  const updateListBody = z.object({ 
    id: z.string(),
    title: z.string().min(3),
    userId: z.string(),
    isActive: z.boolean(),
  })
  const {id, title, userId, isActive = true } = updateListBody.parse(request.body)
  
  try {
    await prisma.list.update({
      where: {
        id
      },
      data: {
        title,
        ownerId: userId,
        isActive
      }
    })
    response.status(204)
  } catch (err) {
    console.log("🚀 ~ file: list.ts:62 ~ update ~ err", err)
    response.status(400).send(err)
  }

}

export {
  create,
  list,
  update,
}