import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DadosVagas from 'App/Models/DadosVagas'

export default class DadosVagasesController {
  public async index({}: HttpContextContract) {
    return await DadosVagas.all()
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const user = await auth.authenticate()

      if (!user) {
        return response.json({ message: 'usuário não autenticado!' })
      }

      const {
        nomeEmpresa,
        nomeVaga,
        descVaga,
        categoria,
        palavraChaves,
        email,
        cidade,
        estado,
      } = request.all()

      const dados = await DadosVagas.create({
        nomeEmpresa: nomeEmpresa,
        nomeVaga: nomeVaga,
        descVaga: descVaga,
        categoria: categoria,
        palavrasChaves: palavraChaves,
        email: email,
        cidade: cidade,
        estado: estado,
        empresaId: user.id,
      })

      if (!dados) {
        return response.json({ message: 'Não foi possível cadastrar a vaga! Erro interno.' })
      }

      return response.json(dados)
    } catch (err) {
      return response.json({ error: err })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const { id } = params

      const dados = await DadosVagas.find(id)

      return response.json({ dados })
    } catch (err) {
      return response.json({ error: err })
    }
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    try {
      const user = await auth.authenticate()

      const { id } = params

      const dados = await DadosVagas.find(id)
      const { nomeVaga, descVaga } = request.all()
      if (dados?.empresaId !== user.id) {
        return response.json({
          message: 'Não é possível editar a vaga! Usuário não corresponde com do criador da vaga.',
        })
      }

      dados.nomeVaga = nomeVaga
      dados.descVaga = descVaga

      dados.save()

      return response.json(dados)
    } catch (err) {
      return response.json({ error: err })
    }
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    try {
      const user = await auth.authenticate()

      const { id } = params

      const dados = await DadosVagas.find(id)
      if (dados?.empresaId !== user.id) {
        return response.json({
          message: 'Não é possível excluir a vaga! Usuário não corresponde com do criador da vaga.',
        })
      }

      dados.delete()

      return response.json({ message: 'Deletado com sucesso!' })
    } catch (err) {
      return response.json({ error: err })
    }
  }
}
