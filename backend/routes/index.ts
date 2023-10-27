import { Application, Request, Response } from "express";
import auth from './user/authRoutes'
import course from './courses/courseRoutes'

const constructorMethod = (app: Application) => {
    app.use('/api/auth', auth)
    app.use('/api/courses', course)
}


export default constructorMethod;