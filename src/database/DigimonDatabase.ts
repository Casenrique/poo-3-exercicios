import { uptime } from "process"
import { Digimon } from "../models/Digimon"
import { DigimonDB } from "../types"
import { BaseDatabase } from "./BaseDatabase"


export class DigimonDatabase extends BaseDatabase {
    
    public static TABLE_DIGIMONS = "digimons"

    dadosConnection = BaseDatabase.connection //acesso ao knex pois está protectec
    
    public async findDigimons(q: string | undefined) {

        let digimonsDB

        if (q) {
            const result: DigimonDB[] = await BaseDatabase
                .connection(DigimonDatabase.TABLE_DIGIMONS)
                .where("name", "LIKE", `%${q}%`)
                .orWhere("stage", "LIKE", `%${q}%`)
                .orWhere("attribute", "LIKE", `%${q}%`)
            digimonsDB = result
        } else {
            const result: DigimonDB[] = await BaseDatabase
            .connection(DigimonDatabase.TABLE_DIGIMONS)
            digimonsDB = result
        }
        return digimonsDB

    }

    public async findDigimonById(id: string | undefined) {
        const [ digimonDBExists ]: DigimonDB[] | undefined[] = await BaseDatabase
            .connection(DigimonDatabase.TABLE_DIGIMONS)
            .where({ id })
        return digimonDBExists
    }

    public async insertDigimon(newDigimonDB: DigimonDB): Promise<void>{
        await BaseDatabase
            .connection(DigimonDatabase.TABLE_DIGIMONS)
            .insert(newDigimonDB)
    }

    public async editDigimonById(idToEdit: string, newName: string, newStage: string, newAttribute: string ) {
        await BaseDatabase
            .connection(DigimonDatabase.TABLE_DIGIMONS)
            .update({ 
                name: newName, 
                stage: newStage, 
                attribute: newAttribute 
            }).where({ id: idToEdit })
    }

    public async deleteDigimonById(idToDelete: string){
        await BaseDatabase
            .connection(DigimonDatabase.TABLE_DIGIMONS)
            .del()
            .where({ id: idToDelete })
    }

}