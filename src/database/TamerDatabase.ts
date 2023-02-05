import { TamerDB } from "../types"
import { BaseDatabase } from "./BaseDatabase"
import { DigimonDatabase } from "./DigimonDatabase"


export class TamerDatabase extends BaseDatabase {
    public static TABLE_TAMERS = "tamers"

    public async findTamers(q: string | undefined){
        
        let tamersDB

        if (q) {
            const result: TamerDB[] = await BaseDatabase
            .connection(DigimonDatabase.TABLE_DIGIMONS)
            .where("name", "LIKE", `%${q}%`)
            
            tamersDB = result
        } else {
            const result: TamerDB[] = await BaseDatabase
            .connection(DigimonDatabase.TABLE_DIGIMONS)
            tamersDB = result
        }
        return tamersDB
    }

    public async findTamersById(id: string | undefined){
        
       const [ tamerDBExists ]: TamerDB[] | undefined[] = await BaseDatabase
        .connection(TamerDatabase.TABLE_TAMERS)
        .where({ id })

        return tamerDBExists        
    }

    public async insertTamer(newTamerDB: TamerDB) {
        await BaseDatabase
        .connection(TamerDatabase.TABLE_TAMERS)
        .insert(newTamerDB)
    }

}