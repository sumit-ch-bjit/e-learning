require('dotenv').config()
import express, { Application, NextFunction, Request, Response } from 'express'
export const app: Application = express()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import configRoutes from './routes'
import connectDB from './config/db'


app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }))

app.use(cookieParser())

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

configRoutes(app)



// testing api
// app.get('/test', (req: Request, res: Response, next: NextFunction) => {
//     res.send('Welcome to Express & TypeScript Server');
// })
// app.get('/favico.ico', (req, res) => {
//     res.sendStatus(404);
// });

// app.all('*', (req: Request, res: Response, next: NextFunction) => {
//     const err = new Error(`Route ${req.originalUrl} Not Found`) as any
//     err.statusCode = 404
//     next(err)
// })