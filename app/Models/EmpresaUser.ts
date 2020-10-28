import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import DadosVagas from './DadosVagas'

export default class EmpresaUser extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => DadosVagas, {
    localKey: 'uuid',
    foreignKey: 'empresaId',
  })
  public posts: HasMany<typeof DadosVagas>

  @column()
  public tokenEmpresa: string

  @column()
  public nomeEmpresa: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
