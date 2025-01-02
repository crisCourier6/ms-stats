import { NextFunction, Request, Response } from "express"
import { StatController } from "./StatController"
import { UserHasStatController } from "./UserHasStatController"
import { Channel } from "amqplib"
import "dotenv/config"

export class MainController{

    private readonly statController = new StatController
    private readonly userHasStatController = new UserHasStatController

    // food diary

    // statAll() retorna todos los diarios alimenticios
    async statsAll(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.statController.all(req, res)  
    }
    // statOne() retorna el diario alimenticio con la id indicada
    async statsOne(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.statController.one(req, res)
    }
    // statSave() crea un diario nuevo con los datos provenientes en la request y lo retorna
    async statsSave(req: Request, res: Response, next: NextFunction, channel: Channel) {
       return this.statController.create(req, res)
    }
    // statUpdate() modifica los datos de un diario y retorna el resultado
    async statsUpdate(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.statController.update(req, res)
    }
    // statRemove() elimina el diario con el id indicado en los parámetros de la uri
    async statsRemove(req: Request, res: Response, next: NextFunction, channel: Channel){
        return this.statController.remove(req, res, next)
    }

    // diary entry

    // userHasStatAll() retorna todos los registros de diarios
    async userHasStatAll(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.userHasStatController.all(req,res)
    }

    // userHasStatOne() retorna el rol con la id indicada en los parámetros de la uri
    async userHasStatOne(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.userHasStatController.one(req, res)
    }
    // userHasStatCreate() crea un nuevo rol con los datos provenientes en la request y lo retorna
    async userHasStatCreate(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.userHasStatController.create(req, res)
    }
    // userHasStatUpdate() actualiza los datos del rol y lo retorna
    async userHasStatUpdate(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.userHasStatController.update(req, res)
    }

    // userHasStatRemoveById() elimina el rol con la id indicada en los parámetros de la URI
    async userHasStatRemoveById(req: Request, res: Response, next: NextFunction, channel: Channel) {
        return this.userHasStatController.remove(req, res, next)
    }
}