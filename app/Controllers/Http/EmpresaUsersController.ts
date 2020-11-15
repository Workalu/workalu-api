import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EmpresaUser from 'App/Models/EmpresaUser'

export default class EmpresaUsersController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const nomeEmpresa = request.input('nomeEmpresa')

      if (nomeEmpresa.length <= 0) {
        return response.status(400).json({ error: 'nome da empresa está vazio!' })
      }
      const tokenEmpresa = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 12)

      const user = await EmpresaUser.create({
        tokenEmpresa: tokenEmpresa,
        nomeEmpresa: nomeEmpresa,
      })

      if (!user) {
        return response.json({ error: 'Não foi possível criar o usuário' })
      }
      return response.status(201).json(user.tokenEmpresa)
    } catch (err) {
      return response.status(500).json({ error: err.message })
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const tokenEmpresa = request.input('tokenEmpresa')

      const idEmpresa: any = await EmpresaUser.findBy('tokenEmpresa', tokenEmpresa)

      const token = await auth.use('api').login(idEmpresa)

      return token.toJSON()
    } catch (err) {
      return response.status(500).json({ error: err.message })
    }
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    try {
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

      if (nome === '') {
        return response.status(400).json({ error: 'Nome da empresa está vazio' })
      }
      const userEmpresa = await EmpresaUser.query()
        .where('tokenEmpresa', tokenEmpresa)
        .update({ nome_empresa: nome })

      if (!userEmpresa) {
        return response.status(400).json({
          error: 'Não foi possível atualizar o nome da empresa. Usuário inválido ou inexistente',
        })
      }

      return response.json({ message: 'Atualizado com sucesso o nome da empresa.' })
    } catch (err) {
      return response.status(500).json({ error: err })
    }
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    try {
      const authenticate = await auth.use('api').check()

      if (!authenticate) {
        return response.json({
          error: 'Não foi possível deletar a empresa, porque você não está autenticado',
        })
      }

      const { tokenEmpresa } = params

      if (!tokenEmpresa) {
        return response
          .status(404)
          .json({ error: 'Token da sua empresa não existente ou não foi passado.' })
      }

      const resp = await EmpresaUser.query().where('tokenEmpresa', tokenEmpresa).delete()

      if (!resp) {
        return response
          .status(400)
          .json({ error: 'Não foi possível excluir! Usuário não encontrado' })
      }

      return response.status(200).json({ message: 'Excluido com sucesso!' })
    } catch (err) {
      return response.status(500).json({ error: err })
    }
  }
}
