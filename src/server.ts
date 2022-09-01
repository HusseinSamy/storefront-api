import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

const app: express.Application = express()
const PORT = 3000;

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(PORT, function () {
    console.log(`starting app on: ${PORT    }`)
})
