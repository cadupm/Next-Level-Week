import Knex from 'knex'

// quais alterações vão ser feitas no banco
export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary() // primary nao tem como ser nulo ai nem precisa
        
        table.integer('week_day').notNullable()
        table.integer('from').notNullable()
        table.integer('to').notNullable()

        // criando um relacionamento pois vai salvar qual o usuário que irá dar esta aula
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE') // caso altere o id do proffy na tabela usuario, vai dar update nessa tabela
            .onDelete('CASCADE') // caso o prof for deletado, todas as aulas sao deletadas
            
    })

}

// voltar a alteração do campo e retornar a tabela antiga
export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule')

}