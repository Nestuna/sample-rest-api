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
api.put('/', async (request, response) => {
  try {
    const { username, email  } = request.body
    await prisma.user.update({
      where: {
        email: email
      },
      data: {
        username: username
      }
    })
    return response.json({data : {message: `Username of ${email} modified`}})
  } catch(e) {
    console.error(`Failed modify use ${email}`)
    return response.json({data: {message: `Failed to modify username for ${email}`}})
  }
})

api.delete('/', async (request, response) => {
  try {
    const { email  } = request.body
    await prisma.user.delete({
      where: {
        email: email
      }
    })
    return response.json({data : {message: `${email} deleted`}})
  } catch(e) {
    console.error(`Failed modify use ${email}`)
    return response.json({data: {message: `${email} deleted`}})
  }
})

export default api
