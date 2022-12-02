import {faker} from '@faker-js/faker'
import { test } from 'tap'
import { prisma } from '../../lib/prisma'
import bootstrap from '../../server'
import * as UserController from '../../controllers/user'

test('Test if user is created successfully', async (t) => {
  t.plan(3)

  const name = faker.name.firstName()
  const email = faker.internet.email()
  const password = faker.internet.password()

  const fastify = bootstrap()


  t.teardown(async ()=> {
    fastify.close()
    await prisma.user.deleteMany({})
  })


  const response = await fastify.inject({
    method: 'POST',
    url: 'users',
    payload: {
      email,
      name,
      password,
    }
  })

  const user = response.json()
  
  t.equal(response.statusCode, 201)
  t.equal(user.name, name)
  t.equal(user.email, email)

  
})