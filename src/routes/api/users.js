import { Router } from 'express'

const api = Router()

/** GET /api/users > Retrieve all users */
api.get('/', (_, response) => {
  response.json({ data: { users: [] } })
})

export default api
