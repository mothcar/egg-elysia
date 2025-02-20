import { Elysia, t } from 'elysia'
import {
  createUser,
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  loginUser,
  updateUser,
} from '~/controllers'
import { admin, auth } from '~/middlewares'

const userRoutes = (app: Elysia) => {
  app.group('/api/v1/users', (app) =>
    // Create a new user
    
    app
      .post('/', createUser, {
        body: t.Object({
          name: t.String(),
          email: t.String(),
          password: t.String(),
          isAdmin: t.Optional(t.Boolean()),
        }),
        type: 'json',
      })

      // Login a user
      .post('/login', loginUser, {
        body: t.Object({
          email: t.String(),
          password: t.String(),
        }),
        type: 'json',
      })

      // Get all users
      .get('/', getUsers, {
        beforeHandle: (c) => admin(c),
      })

      // Get a single user
      .get('/:id', getUser, {
        beforeHandle: (c) => auth(c),
      })

      // Get user profile
      .get('/profile', getUserProfile, {
        beforeHandle: (c) => auth(c),
      })

      // Update a single user
      .put('/:id', updateUser, {
        beforeHandle: (c) => admin(c),
      })

      // Delete a single user
      .delete('/:id', deleteUser, {
        beforeHandle: (c) => admin(c),
      })
  )
}

export default userRoutes as any
