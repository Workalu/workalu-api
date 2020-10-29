import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EmpresaUser from 'App/Models/EmpresaUser'

export default class EmpresaUsersController {
  public async store({ request, response }: HttpContextContract) {
    const nomeEmpresa = request.input('nomeEmpresa')

    const tokenEmpresa = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 10)

    const user = await EmpresaUser.create({ tokenEmpresa: tokenEmpresa, nomeEmpresa: nomeEmpresa })

    if (!user) {
      return response.json({ error: 'Não foi possível criar o usuário' })
    }
    return response.json(user.tokenEmpresa)
  }

  public async login({ request, auth }: HttpContextContract) {
    const tokenEmpresa = request.input('tokenEmpresa')

    const idEmpresa: any = await EmpresaUser.findBy('tokenEmpresa', tokenEmpresa)

    const token = await auth.use('api').login(idEmpresa)

    return token.toJSON()
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    const authenticate = await auth.use('api').check()

    if (!authenticate) {
      return response.json({
        error: 'Não foi possível atualizar o dado, porque você não está autenticado',
      })
    }

    const { tokenEmpresa } = params

    if (!tokenEmpresa) {
      return response.json({ error: 'Token da sua empresa não existente ou não foi passado.' })
    }
    const nome = request.input('nomeEmpresa')
    const userEmpresa = await EmpresaUser.query()
      .where('tokenEmpresa', tokenEmpresa)
      .update({ nome_empresa: nome })

    if (!userEmpresa) {
      return response.json({ error: 'Não foi possível atualizar o nome da empresa.' })
    }

    return response.json({ message: 'Atualizado com sucesso o nome da empresa.' })
  }

  public async destroy({ request, response, params, auth }: HttpContextContract) {
    const authenticate = await auth.use('api').check()

    if (!authenticate) {
      return response.json({
        error: 'Não foi possível deletar a empresa, porque você não está autenticado',
      })
    }

    const { tokenEmpresa } = params

    if (!tokenEmpresa) {
      return response.json({ error: 'Token da sua empresa não existente ou não foi passado.' })
    }

    const resp = await EmpresaUser.query().where('tokenEmpresa', tokenEmpresa).delete()

    if (!resp) {
      return response.json({ error: 'Não foi possível excluir! Tivemos um problema.' })
    }

    return response.json({ message: 'Excluido com sucesso!' })
  }
}
