import { test } from 'tap'
import {faker} from '@faker-js/faker'
import { prisma } from '../../lib/prisma'
import bootstrap from '../../server'
import { genHash } from '../../plugins/authenticate'


test('Login user successfully', async (t) => {
  // start fastify
  const fastify = bootstrap()

  // create an user 
  const name = faker.name.firstName()
  const email = faker.internet.email()
  const password = faker.internet.password()


  const userResponse = await fastify.inject({
    method: 'POST',
    url: '/users',
    payload: {
      email,
      name,
      password,
    }
  })
  
  
  const signInResponse = await fastify.inject({
    method: 'POST',
    url: '/signin',
    payload: {
      email,
      password,
    }
  })
  
  t.teardown(async () => {
    fastify.close()
    await prisma.user.deleteMany({})
  })

  t.equal(signInResponse.statusCode, 200)
  t.equal(userResponse.statusCode, 201)
  t.type(signInResponse.json().token, 'string')

})