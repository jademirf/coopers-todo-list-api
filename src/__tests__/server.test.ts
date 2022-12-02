import { test } from 'tap'
import bootstrap from '../server'

test('request the `/check` route', async (t) => {
  t.plan(2)
  const fastify = bootstrap()

  t.teardown(() => {
    fastify.close()
  })

  const response = await fastify.inject({
    method: 'GET',
    url: '/check'
  })

  t.equal(response.statusCode, 200)
  t.same(response.json(), { message: 'It works!' })
})