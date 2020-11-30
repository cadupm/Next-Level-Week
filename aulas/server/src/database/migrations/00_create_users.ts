import Knex from 'knex'

// quais alterações vão ser feitas no banco
export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary() // primary nao tem como ser nulo ai nem precisa usar o .notNullable()
        table.string('name').notNullable()
        table.string('avatar').notNullable()
        table.string('whatsapp').notNullable()
        table.string('bio').notNullable()
    })

}

// voltar a alteração do campo e retornar a tabela antiga
export async function down(knex: Knex) {
    return knex.schema.dropTable('users')

}