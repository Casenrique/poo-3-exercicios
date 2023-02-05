import { Request, Response } from "express"
import { DigimonDatabase } from "../database/DigimonDatabase"
import { Digimon } from "../models/Digimon"
import { DigimonDB } from "../types"



export class DigimonController {
    public getDigimons = async (req:Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined
            
            const digimonDatabase = new DigimonDatabase()
            const digimonsDB = await digimonDatabase.findDigimons(q)
    
            const digimons: Digimon[] = digimonsDB.map((digimonDB) => new Digimon(
                digimonDB.id,
                digimonDB.name,
                digimonDB.stage,
                digimonDB.attribute,
                digimonDB.created_at
            ))
    
            res.status(200).send(digimons)
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
    }

    public createDigimon = 
    async (req: Request, res: Response) => {
        try {
            const { id, name, stage, attribute } = req.body
    
            if(id[0] !== "d") {
                res.status(400)
                throw new Error("'id' deve começar com a letra 'd'.")            
            }
            if(typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
            if(id.length < 4) {
                res.status(400)
                throw new Error("'id' deve possuir 4 caracteres.")
            }
                    
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
            }
    
            if(name.length < 4) {
                res.status(400)
                throw new Error("'name' deve possuir pelo menos 4 caracteres.")
            }
    
            if(typeof stage !== "string") {
                res.status(400)
                throw new Error("'stage' deve ser string")
            }
            if(stage.length < 4) {
                res.status(400)
                throw new Error("'stage' deve possuir 4 caracteres.")
            } 
            if(typeof attribute !== "string") {
                res.status(400)
                throw new Error("'attribute' deve ser string")
            }
            if(attribute.length < 4) {
                res.status(400)
                throw new Error("'attribute' deve possuir 4 caracteres.")
            }
    
            const digimonDatabase = new DigimonDatabase()
            const digimonDBExists = await digimonDatabase.findDigimonById(id)
    
            if(digimonDBExists) {
                res.status(400)
                throw new Error("'id' já existe")            
            }
    
            const newDigimon = new Digimon(
                id,
                name, 
                stage, 
                attribute, 
                new Date().toISOString()
            )// yyyy-mm-ddThh:mm:sssZ
    
            const newDigimonDB: DigimonDB = {
                id: newDigimon.getId(),
                name: newDigimon.getName(),
                stage: newDigimon.getStage(),
                attribute: newDigimon.getAttribute(),
                created_at: newDigimon.getCreatedAt()
            }
    
            await digimonDatabase.insertDigimon(newDigimonDB)
    
            res.status(201).send(newDigimon)
    
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
    }

    public editDigimonById = async (req:Request, res: Response) => {
        try {
    
            const idToEdit = req.params.id
    
            // const id = req.body.id
            const name = req.body.name
            const stage = req.body.stage        
            const attribute = req.body.attribute        
    
            // if(id !== undefined) {
            //     if(id[0] !== "d") {
            //         res.status(400)
            //         throw new Error("'id' deve começar com a letra 'd'.")            
            //     }
            //     if(typeof id !== "string") {
            //         res.status(400)
            //         throw new Error("'id' deve ser string")
            //     }
            //     if(id.length < 4) {
            //         res.status(400)
            //         throw new Error("'id' deve possuir pelo menos 4 caracteres.")
            //     }
            // }
            
            if(name !== undefined) {
                if(typeof name !== "string") {
                    res.status(400)
                    throw new Error("'name' deve ser string")
                }
                if(name.length < 2) {
                    res.status(400)
                    throw new Error("'name' deve possuir pelo menos 2 caracteres.")
                }
                
            }
    
            if(stage !== undefined) {
                if(typeof attribute !== "string") {
                    res.status(400)
                    throw new Error("'attribute' deve ser string")
                }
                if(attribute.length < 2) {
                    res.status(400)
                    throw new Error("'attribute' deve possuir pelo menos 2 caracteres.")
                }
            }
            
            const digimonDatabase = new DigimonDatabase()
            const digimonDB = await digimonDatabase.findDigimonById(idToEdit)
    
            if(!digimonDB) {
                res.status(404)
                throw new Error("'id' de digimon não encontrado.")            
            }
            
            const digimonToEdit = new Digimon(
                digimonDB.id,
                digimonDB.name,
                digimonDB.stage,
                digimonDB.attribute,
                digimonDB.created_at
            )
    
            // const newId = id || digimonToEdit.getId()
            const newName = name || digimonToEdit.getName()
            const newStage = stage || digimonToEdit.getStage()
            const newAttribute = attribute || digimonToEdit.getAttribute()
            
            // digimonToEdit.setId(newId)
            digimonToEdit.setName(newName)
            digimonToEdit.setStage(newStage)
            digimonToEdit.setAttribute(newAttribute)
            
    
            await digimonDatabase.editDigimonById(idToEdit, newName, newStage, newAttribute)
            // await db("digimons").update({ id: newId }).where({ id: idToEdit })
            // await db("digimons").update({ name: newName }).where({ id: idToEdit })
            // await db("digimons").update({ stage: newstage }).where({ id: idToEdit })
                    
            // await db("digimons").update(digimonToEdit).where({ id: idToEdit })
    
            res.status(201).send({
                message: "Digimon editado com sucesso.",
                digimon: idToEdit
            })
    
    
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
  
        
    }

    public deleteDigimon = async (req: Request, res: Response) => {
        try {
    
            const idToDelete = req.params.id
    
            

            if(idToDelete[0] !== "d") {
                        res.status(400)
                        throw new Error("'id' deve começar com a letra 'd'.")            
                    }
                    if(typeof idToDelete !== "string") {
                        res.status(400)
                        throw new Error("'id' deve ser string")
                    }
                    if(idToDelete.length < 4) {
                        res.status(400)
                        throw new Error("'id' deve possuir pelo menos 4 caracteres.")
                    }
            
    
            const digimonDatabase = new DigimonDatabase()
            const digimonIdExists = await digimonDatabase.findDigimonById(idToDelete)
            
            if(!digimonIdExists) {
                res.status(404)
                throw new Error("'id' da digimon não encontrado.")            
            }
    
            
            await digimonDatabase.deleteDigimonById(idToDelete)
    
            res.status(200).send({ message: "Digimon apagado com sucesso." })
    
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
    }
    
}