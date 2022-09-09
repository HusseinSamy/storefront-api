import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import router from './routes';

const app: express.Application = express()
const PORT = 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', router)
app.listen(PORT, function () {
    console.log(`starting app on: ${PORT}`)
})
