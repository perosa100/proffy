"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./database/connection"));
const convertToHourToMinutes_1 = __importDefault(require("./utils/convertToHourToMinutes"));
const routes = express_1.default.Router();
routes.post('/classes', async (req, res) => {
    try {
        const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;
        const insertedUsersIDs = await connection_1.default('users').insert({
            name,
            avatar,
            whatsapp,
            bio
        });
        const user_id = insertedUsersIDs[0];
        console.log('routes :: post :: classes :: user_id ', user_id);
        await connection_1.default('classes').insert({
            subject,
            cost,
            user_id
        });
        const classScheuled = schedule.map((scheduleItem) => {
            return {
                week_day: scheduleItem.week_day,
                from: convertToHourToMinutes_1.default(scheduleItem.from),
                to: convertToHourToMinutes_1.default(scheduleItem.to)
            };
        });
        await connection_1.default('class_schedule').insert(classScheuled);
        return res.send();
    }
    catch (error) {
        console.log('routes :: post :: classes ', error);
    }
});
routes.get('/classes', (req, res) => {
    //  return res.json(users)
});
exports.default = routes;
