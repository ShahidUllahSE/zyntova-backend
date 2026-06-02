import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env.js'
import routes from './routes/index.js'
import { notFoundHandler } from './middleware/notFound.middleware.js'
import { errorHandler } from './middleware/errorHandler.middleware.js'

export function createApp() {
  const app = express()

  app.use(helmet())
  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
      credentials: true,
    }),
  )
  app.use(express.json({ limit: '1mb' }))
  app.use(express.urlencoded({ extended: true }))

  app.get('/', (_req, res) => {
    res.json({
      success: true,
      data: {
        name: 'Zyntova API',
        version: '1.0.0',
        baseUrl: env.apiBaseUrl,
        apiBasePath: env.API_BASE_PATH,
        health: `${env.API_BASE_PATH}/health`,
        users: `${env.API_BASE_PATH}/users`,
      },
    })
  })

  app.use(env.API_BASE_PATH, routes)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
