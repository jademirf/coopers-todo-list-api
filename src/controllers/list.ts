
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
  const getListParams = z.object({
    id: z.string(),
  })

  const {id} = getListParams.parse(request.params)

  const updateListBody = z.object({
    title: z.string().min(3),
    userId: z.string(),
    isActive: z.boolean(),
  })
  const {title, userId, isActive = true } = updateListBody.parse(request.body)
  
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


const remove = async (request: FastifyRequest, response: FastifyReply) => {
  const getListParams = z.object({
    id: z.string(),
  })

  const {id} = getListParams.parse(request.params)
  
  try {
    await prisma.list.delete({
      where: {id}
    })
    response.status(204)
  } catch (err) {
    console.log("🚀 ~ file: list.ts:91 ~ remove ~ err", err)
    response.status(400).send(err)
  }

}

const show = async (request: FastifyRequest, response: FastifyReply) => {
  const getListParams = z.object({
    id: z.string(),
  })

  const {id} = getListParams.parse(request.params)
  
  try {
    const list = await prisma.list.findUnique({
      where: {id}
    })
    response.status(200).send(list)
  } catch (err) {
    console.log("🚀 ~ file: list.ts:91 ~ remove ~ err", err)
    response.status(400).send(err)
  }

}

export {
  create,
  list,
  remove,
  show,
  update,
}