// express: microframework poucas funcionalidades prontas
const port = 3333
import express from 'express' // singleton
import cors from 'cors'
import routes from './routes'
const app = express() 

// Middleware

// por padrao o express nao entende o formato json
app.use(cors())
app.use(express.json())
app.use(routes)

// Rota: http://localhost:3333/users
// Resource (recurso) : /users
// Metodos HTTP: get, post, put, delete

// Corpo (Request Body => req.body): Dados para criação ou atualização de um registro
// Route Params: No método POST ou DELETE, o route params serve para identificar qual recurso eu quero att. ou deletar (/:id)
// Query Params: /users?page=2&sort=name . Serve para paginação, filtros e ordenação.

// Metodos HTTP (web-services) para as rotas utilizando middlewares
/* app.get('/', (req, res, next) => {
    return res.json({ message: 'Hello World'})
}) */

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}.`)
})


