import dotenv from 'dotenv'
dotenv.config()

import { app } from '@/app'
import { env } from './shared/env'

const PORT = Number(env.PORT) || 3333

app.
  listen({ port: PORT, host: '0.0.0.0'})
  .then(() => {
    console.log(`🌍 Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação: http://localhost:${PORT}/docs`);
  })
  .catch((err) => {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  })
