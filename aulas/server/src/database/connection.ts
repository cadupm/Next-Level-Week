import knex from 'knex'
import path from 'path'


const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true, // precisamos usar pois o sqlite nao sabe o que jogar nos campos que nao foram preenchidos
})

export default db

// knex executa com JS e nao TS temos que criar na raiz do nosso projeto um arquivo knexfile.ts caso use TS ou knexfile.js caso use JS.
// knex tem cli: CLI: o que conseguimos utilizar na command line