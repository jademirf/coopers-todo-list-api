import { FastifyRequest } from 'fastify'
import bcrypt from 'bcrypt'

export async function authenticate(request: FastifyRequest) {
  await request.jwtVerify()
}

export async function genHash(password: string) {
  const hashed =  bcrypt.hash(password, 12)

  return hashed
}

export async function verifyHash(password: string, hash: string) {
  const result =  bcrypt.compare(password, hash)

  return result
}