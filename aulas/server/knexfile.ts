import path from 'path'

// Knex: permite que escrevamos as querys em JS ao inves de consultar o BD em SQL dando uma melhor developer experience
// Sqlite3: conexão entre o bd SQL e o node 


module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    },
    // migrations: controlam o versionamento do banco de dados
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
}