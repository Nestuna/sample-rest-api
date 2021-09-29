import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()
const prisma = new PrismaClient()

/** GET /api/users > Retrieve all users */
api.get('/', async (_, response) => {
  response.json({ data: { users: await prisma.user.findMany() } })
})

/** POST /api/users > Create an user */
api.post('/', async (request, response) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: request.body.email,
        username: request.body.username
      }
    })
    return response.json({data: {message: `User ${newUser.email} created`}})
  } catch(e) {
    console.error(`Failed to create user : ${e}`)
    return response.json({data: {message: 'Failed to create user'}})
  }
})

/** PUT /api/users/ > modify user */
api.put('/:id', async (request, response) => {
  const { username } = request.body
  const { id } = request.params
  try {
    await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        username: username
      }
    })
    return response.json({data : {message: `Username of ${id} modified`}})
  } catch(e) {
    console.error(`Failed modify user ${id}`)
    return response.json({data: {message: `Failed to modify username for ${id}`}})
  }
})

api.delete('/:id', async (request, response) => {
  const { id  } = request.params
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) }
    })
    return response.json({data : {message: `user ${id} deleted`}})
  } catch(e) {
    console.error(`Failed user ${id}`)
    return response.json({data: {message: `user ${id} deleted`}})
  }
})

export default api
