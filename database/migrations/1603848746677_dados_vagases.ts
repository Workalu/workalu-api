import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DadosVagases extends BaseSchema {
  protected tableName = 'dados_vagases'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table
        .integer('empresa_id')
        .references('id')
        .inTable('empresa_users')
        .notNullable()
        .onDelete('CASCADE')
      table.string('nome_empresa', 80).notNullable()
      table.string('nome_vaga', 80).notNullable()
      table.string('desc_vaga', 3500).notNullable()
      table.string('categoria', 80).notNullable()
      table.json('palavras_chaves')
      table.string('email', 80).notNullable()
      table.string('cidade', 80).notNullable()
      table.string('estado', 2).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
