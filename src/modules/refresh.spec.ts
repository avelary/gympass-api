import { app } from "@/app"
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest"


describe('Refresh Token (e2e)', () => {

  beforeAll( async () => {
    await app.ready()
  })

  afterAll( async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe', 
      email: 'johndoe@examplo.com', 
      password: '123456'
    })

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({email: 'johndoe@examplo.com', password: '123456'})
 
      const cookies = authResponse.get('Set-Cookie')

      const cookieHeader = Array.isArray(cookies)
      ? cookies.join('; ') // junta os cookies num único header
      : cookies ?? '' // fallback se for undefined

      const response = await request(app.server)
        .patch('/token/refresh')
        .set('Cookie', cookieHeader).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({token: expect.any(String)})
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })
})