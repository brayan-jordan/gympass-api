import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({
    onlyCookie: true, // se true, o token só pode ser enviado pelo cookie ao inves de ser enviado pelo header Authorization
  })

  const { role } = request.user

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/', // quais rotas do dominio tem acesso ao cookie
      secure: true, // se true, o cookie só é enviado em conexões https
      sameSite: true, // se true, o cookie só é enviado em requisições do mesmo site
      httpOnly: true, // se true, o cookie só é acessível pelo servidor e não pelo client (front-end)
    })
    .send({ token })
}
