import { app } from '@/app'
import { env } from './env'

app
  .listen({ port: env.PORT, host: '0.0.0.0' })
  .then(() => console.log('🚀 - Server is listening on port 3000'))
  .catch((err) => console.error(err.message))
