import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Stat } from "../entity/Stat"
import axios from "axios"

export class StatController {

    private statRepository = AppDataSource.getRepository(Stat)

    async all(req:Request, res:Response) {
        const { u } = req.query;

        // If 'u' is provided, filter the results
        if (u) {
            const stats = await this.statRepository.createQueryBuilder("stat")
                .leftJoinAndSelect(
                    "stat.userHasStat", 
                    "userHasStat", 
                    "userHasStat.userId = :userId", 
                    { userId: u }
                )
                .orderBy("stat.name", "ASC")
                .getMany();
    
            return stats;
        }

        // If 'u' is not provided, return all stats
        const stats = await this.statRepository.find({ relations: ["userHasStat"], order: {name: "ASC"} });
        return stats
    }

    async one(req:Request, res: Response) {
        const {id} = req.params
        if (!id) {
            res.status(400)
            return {message: "Error: id inválida"}
        }
        const stat = await this.statRepository.findOne({
            where: { id: id }
        })

        if (!stat) {
            res.status(404)
            return {message: "Error: Medida no existe"}
        }
        return stat
    }

    async create(request: Request, response: Response) {
        const { name, description, unit, minValue, maxValue, decimals } = request.body;
       
           
        const newStat = Object.assign(new Stat(), {
            name,
            description, 
            unit,
            minValue,
            maxValue,
            decimals
        })

        const createdStat = await this.statRepository.save(newStat)
        return this.statRepository.findOne({where: {id: createdStat.id}})
        
    }
    async update(request: Request, response:Response) {
        const {id} = request.params
        if (!id){
            response.status(400)
            return { message: "Error: Parámetro inválido"}
        }
        const updatedStat = await this.statRepository.update(id, request.body)
        if (updatedStat.affected===1){
            return this.statRepository.findOne({where: {id:id}})
        }
        response.status(500)
        return { message: "Error al actualizar medida"}
        
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        if (!id){
            response.status(400)
            return {message: "Error: id inválida"}
        }

        let statToRemove = await this.statRepository.findOneBy({ id: id })
        
        if (!statToRemove) {
            response.status(404)
            return {message: "Error: Medida no encontrada"}
        }
        return this.statRepository.remove(statToRemove)
    }
}