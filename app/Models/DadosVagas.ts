import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DadosVagas extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public empresaId: number

  @column()
  public nomeEmpresa: string

  @column()
  public nomeVaga: string

  @column()
  public descVaga: string

  @column()
  public palavrasChaves: JSON

  @column()
  public email: string

  @column()
  public cidade: string

  @column()
  public estado: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
