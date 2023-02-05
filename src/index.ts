import express, { Request, Response } from 'express'
import cors from 'cors'
import { DigimonDB, TamerDB } from './types'
import { DigimonDatabase } from './database/DigimonDatabase'
import { Digimon } from './models/Digimon'
import { DigimonController } from './controller/DigimonController'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

const digimonController = new DigimonController()

app.get("/digimons", digimonController.getDigimons)

app.post("/digimons", digimonController.createDigimon)

app.put("/digimons/:id", digimonController.editDigimonById)

app.delete("/digimons/:id", digimonController.deleteDigimon)