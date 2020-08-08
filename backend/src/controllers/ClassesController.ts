import { Request, Response } from 'express'
import db from '../database/connection'
import convertToHourToMinutes from '../utils/convertToHourToMinutes'

interface ScheduleItem {
  week_day: number
  from: string
  to: string
}

export default class ClassesController {
  async create(req: Request, res: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body

    const trx = await db.transaction()

    try {
      const insertedUsersIDs = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      })

      const user_id = insertedUsersIDs[0]

      const insertClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id
      })

      const class_id = insertClassesIds[0]

      const classScheuled = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertToHourToMinutes(scheduleItem.from),
          to: convertToHourToMinutes(scheduleItem.to)
        }
      })

      await trx('class_schedule').insert(classScheuled)

      await trx.commit()

      return res.status(201).send()
    } catch (error) {
      console.log('routes :: post :: classes ', error)
      await trx.rollback()
      return res.status(400).json({
        error: 'unextex erorr'
      })
    }
  }

  async index(req: Request, res: Response) {
    const filters = req.query

    const subject = filters.subject as string
    const week_day = filters.week_day as string
    const time = filters.time as string

    if (!subject || !week_day || !time) {
      return res.status(400).json({
        error: 'Missing Filter to search classes'
      })
    }

    const timeinMinutes = convertToHourToMinutes(time)

    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` =??', [Number(week_day)])
          .whereRaw('`class_schedule` . `from` <= ??', [timeinMinutes])
          .whereRaw('`class_schedule` . `to` > ??', [timeinMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])

    return res.json(classes)
  }

  async show(req: Request, res: Response) {
    const classes = await db('classes')
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])
    return res.json(classes)
  }
}
