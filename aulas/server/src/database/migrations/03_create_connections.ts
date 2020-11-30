import Knex from 'knex'

// quais alterações vão ser feitas no banco
export async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary() // primary nao tem como ser nulo ai nem precisa

        // criando um relacionamento pois vai salvar qual o usuário que irá dar esta aula feita a conexão
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE') // caso altere o id do proffy na tabela usuario, vai dar update nessa tabela
            .onDelete('CASCADE') // caso o prof for deletado, todas as aulas sao deletadas

        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP')) // função CURRENT_TIMESTAMP pega o horario atual e salva no created_at
            .notNullable()
            
    })

}

// voltar a alteração do campo e retornar a tabela antiga
export async function down(knex: Knex) {
    return knex.schema.dropTable('connections')

}