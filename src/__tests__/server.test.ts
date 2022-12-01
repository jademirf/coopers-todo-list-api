import { test } from 'tap'
import bootstrap from '../server'

test('request the `/check` route', async (t) => {
  const fastify = bootstrap()

  t.teardown(() => {
    fastify.close()
  })

  const response = await fastify.inject({
    method: 'GET',
    url: '/check'
  })

  t.equal(response.statusCode, 200)
})