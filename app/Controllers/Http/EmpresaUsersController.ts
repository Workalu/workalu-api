import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EmpresaUser from 'App/Models/EmpresaUser'

export default class EmpresaUsersController {
  public async store({ request, response }: HttpContextContract) {
    const nomeEmpresa = request.input('nomeEmpresa')

    const tokenEmpresa = Math.random().toString(36)

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

  public async update({ request, response, auth }: HttpContextContract) {}

  public async destroy({ request, response, auth }: HttpContextContract) {}
}
