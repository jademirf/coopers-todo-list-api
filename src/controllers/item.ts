
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'


const create = async (request: FastifyRequest, response: FastifyReply) => {
  const createListItemtBody = z.object({ 
    title: z.string().min(3),
    listId: z.string(),
    isDone: z.boolean(),
  })
  const {title, listId, isDone = true } = createListItemtBody.parse(request.body)
  

  try {
    const listItem = await prisma.listItem.create({
      data: {
        title,
        listId,
        isDone
      }
    })
    response.status(201).send(listItem)
  } catch (err) {
    console.log('🚀 ~ file: list.controller.ts ~ line 22 ~ create ~ err', err)
    response.status(400).send(err)
  }

}

const list = async (request: FastifyRequest, response: FastifyReply) => {
  const getListItemParams = z.object({
    listId: z.string(),
  })

  const {listId} = getListItemParams.parse(request.params)

  const listItems = await prisma.listItem.findMany({
    where: {
      listId
    },
    select: {
      title: true,
      isDone: true,
      id: true,
      listId: true,
    }
  })

  return listItems
}

const update = async (request: FastifyRequest, response: FastifyReply) => {
  const getListItemParams = z.object({
    id: z.string(),
  })

  const {id} = getListItemParams.parse(request.params)

  const updateListItemBody = z.object({
    title: z.string().min(3),
    listId: z.string(),
    isDone: z.boolean(),
  })
  const { title, listId, isDone = true } = updateListItemBody.parse(request.body)
  
  try {
    await prisma.listItem.update({
      where: {
        id
      },
      data: {
        title,
        listId,
        isDone
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