import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EmpresaUsersSchema extends BaseSchema {
  protected tableName = 'empresa_users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('remember_me_token').nullable()
      table.string('token_empresa').notNullable().unique()
      table.string('nome_empresa').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
