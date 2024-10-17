import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { UserHasStat } from "../entity/UserHasStat"
import { Stat } from "../entity/Stat"
import axios from "axios"

export class UserHasStatController {

    private userHasStatRepository = AppDataSource.getRepository(UserHasStat)
    private statRepository = AppDataSource.getRepository(Stat)

    async all(req:Request, res:Response) {
        const {u, s} = req.query
        const withStat = req.query.ws === "true"
        const relations = []

        if (withStat){
            relations.push("stat")
        }

        if (u && s){
            return this.userHasStatRepository.find({where: {userId: u, statId: s}, relations: relations, order: {createdAt: "ASC"}})
        }
        else if (u){
            return this.userHasStatRepository.find({where: {userId: u}, relations: relations, order: {createdAt: "ASC"}})
        }
        else if (s){
            return this.userHasStatRepository.find({where: {statId: s}, relations: relations, order: {createdAt: "ASC"}})
        }
        return this.userHasStatRepository.find({relations, order: {createdAt: "ASC"}})
    }

    async one(req:Request, res:Response) {
        const {id} = req.params
        const userHasStat = await this.userHasStatRepository.findOne({
            where: { id: id}
        })

        if (!userHasStat) {
            res.status(404)
            return {message:"Registro no encontrado"}
        }
        return userHasStat
    }

    async create(request: Request, response: Response) {
        const { userId, statId, value} = request.body;
        const newUserHasStat = Object.assign(new UserHasStat(), {
            userId,
            statId,
            value
        })
        return this.userHasStatRepository.save(newUserHasStat)
        
    }
    async update(request: Request, response: Response) {
        const {id} = request.params
        if (!id){
            response.status(400)
            return {message: "Error: Parámetro inválido"}
        }
        const updatedUserHasStat = await this.userHasStatRepository.update(id, request.body)
        if (updatedUserHasStat.affected===1){
            return this.userHasStatRepository.findOne({where:{id:id}})
        }
        response.status(500)
        return {message: "Error al actualizar entrada"}
        
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const {id} = request.params

        if (!id){
            response.status(400)
            return {message: "Error: Parámetro inválido"}
        }

        let userHasStatToRemove = await this.userHasStatRepository.findOneBy({ id: id })
        
        if (!userHasStatToRemove) {
             response.status(404)
            return {message: "Error: entrada no existe"}
        }
        return this.userHasStatRepository.remove(userHasStatToRemove)
    }

    async deleteByUser(userId:string) {
        return this.userHasStatRepository.delete({userId})
    }
}