import {Request, Response, NextFunction} from 'express'

import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
    week_day: number
    from: string
    to: string
}

export default class ClassController {

    async index(req: Request, res: Response, next: NextFunction) {
        const filters = req.query

        const subject = filters.subject as string
        const week_day = filters.week_day as string
        const time = filters.time as string
        
        if(!week_day || !subject || !time) {
            return res.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time)
        // console.log(timeInMinutes)

        // query pro banco de dados
        const classes = await db('classes')
            // verificação dos horarios de funcionamento fazendo uma subquery
            // como se fosse um filtro
            .whereExists(function() { // não serve uma arrow function pois ela amarra o this e nao cria um novo escopo
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`') // quando utilizamos whereExists é aconselhavel a usar o whereRaw ao inves do where
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject) // setei a tipagem pra string se nao da error de tipagem
            .join('users', 'classes.user_id', '=', 'users.id') // integrar os dados dos usuarios que dao suas aulas
            .select(['classes.*', 'users.*']) // trazer todos os dados das classes e dos usarios que dao essas aulas

        return res.status(200).json(classes)

    }



    async create (req: Request, res: Response, next: NextFunction) {
        const { name,
                avatar,
                whatsapp,
                bio,
                subject,
                cost,
                schedule } = req.body
    
        // preferivel usar o esquema de TRANSACTION pelo fato do banco trabalhar ao mesmo tempo
        // fazer todas as operações do banco ao mesmo tempo e se uma delas falhar, desfazer todas
        // as que já tiverem sido feitas..
        
        const trx = await db.transaction()
        
        
        try {
            const insertedUsersIds = await trx('users').insert({ // db é uma funcao que recebe como parametro a tabela em que ...
                // short sintaxe
                name, 
                avatar, 
                whatsapp,
                bio
                })
        
            // a query que fizemos no db 'users' retorna uma lista com os users_id entao necessitaremos
            // deste dado para montarmos nossa table('classes) e por isso armazenaremos em uma constante
            // que ira retornar por padrao uma lista e pegaremos apenas o primeiro
            const user_id = insertedUsersIds[0]
        
            const insertedClassesId = await trx('classes').insert({
                subject,
                cost,
                user_id
            })
            
            // a query que fizemos no db ('classes') retorna uma lista com os class_id entao necessitaremos
            // deste dado para montarmos nossa table('class_schedule') e por isso armazenaremos em uma constante
            // que ira retornar por padrao uma lista e pegaremos apenas o primeiro
            const class_id = insertedClassesId[0]
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
        
            }) 
        
            await trx('class_schedule').insert(classSchedule)
        
            await trx.commit() // apenas nesse momento que ele insere tudo no mesmo tempo no banco de dados 
        
        
            return res.status(201).send('Created with success.')
    
        } catch(err) {
            await trx.rollback() // caso der algum erro, faz o rollback
    
            return res.status(400).json({
                error: 'Unexpected error while creating new class.'
    
            })
        }
    }
}
