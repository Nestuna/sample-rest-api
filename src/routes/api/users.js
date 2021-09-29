import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()

/** GET /api/users > Retrieve all users */
api.get('/', (_, response) => {
  const prisma = new PrismaClient()

  response.json({ data: { users: prisma.user.findMany() } })
})

export default api
