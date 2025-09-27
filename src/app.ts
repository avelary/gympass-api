import { fastify } from 'fastify'
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import scalarApiReference from '@scalar/fastify-api-reference'
import { setupErrorHandling } from './shared/middleware/error-handling'
import { registerRoutes } from './shared/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './shared/env'
import fastifyCookie from '@fastify/cookie'


const PORT = Number(env.PORT) || 3333

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(cors, { origin: "*"})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'gynpass',
      version: '1.0.0',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  transform: jsonSchemaTransform,
})

app.register(scalarApiReference, {
  routePrefix: "/docs",
  configuration: {
    layout: "sidebar", // opcional: "sidebar", "stacked", etc.
    theme: "mars",    // opcional: "light" ou "dark"
  },
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET, 
  cookie: { cookieName: 'refreshToken', signed: false},
  sign: {expiresIn: '10m'} 
})

app.register(fastifyCookie)

registerRoutes(app)
setupErrorHandling(app)

export { app }