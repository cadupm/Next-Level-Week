import express from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'

const routes = express.Router()
// instanciando os componentes de class
const classesController = new ClassesController()
const connectionsController = new ConnectionsController()


// Metodos HTTP (web-services) para as rotas utilizando middlewares
routes.get('/classes', classesController.index) 
routes.post('/classes', classesController.create) 


routes.get('/connections', connectionsController.index)
routes.post('/connections', connectionsController.create)

export default routes