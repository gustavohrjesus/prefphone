import 'dotenv/config'

import express, { json } from 'express'
import cors from 'cors'

import routesPublic from './routes/public.routes.js'
import routesPrivat from './routes/private.routes.js'

const app = express()
app.use( express.json() )
app.use( cors() )
const port = 3000

app.use( '/', routesPublic )        // acesso livre
app.use( '/', routesPrivat )


//? ---- TESTANDO SERVER - BEGIN ------
app.get('/', (req, res) => {
    res.send(`PrefPhone Server is UP!!!`)
})
//? ---- TESTANDO SERVER - END --------

//? ---- RODANDO SERVER - BEGIN ------
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${ port }`)
})
//? ---- RODANDO SERVER - END --------

