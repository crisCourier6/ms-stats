import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import * as amqp from "amqplib/callback_api"
import { Channel } from "amqplib"
import "dotenv/config"
import { UserHasStatController } from "./controller/UserHasStatController"

AppDataSource.initialize().then(async () => {
    amqp.connect('amqps://zqjaujdb:XeTIDvKuWz8bHL5DHdJ9iq6e4CqkfqTh@gull.rmq.cloudamqp.com/zqjaujdb', (error0, connection) => {
        if(error0){
            throw error0
        }

        connection.createChannel(async (error1, channel)=>{
            if (error1){
                throw error1
            }

            const userHasStatController = new UserHasStatController
            
            channel.assertExchange("Stats", "topic", {durable: false})

            channel.assertExchange("Accounts", "topic", {durable: false})

            channel.assertQueue("Stats_Accounts", {durable: false})
            channel.bindQueue("Stats_Accounts", "Accounts", "user.*")
            
            // create express app
            const app = express()
            app.use(bodyParser.json())

            // register express routes from defined application routes
            Routes.forEach(route => {
                (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
                    const result = (new (route.controller as any))[route.action](req, res, next)
                    if (result instanceof Promise) {
                        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

                    } else if (result !== null && result !== undefined) {
                        res.json(result)
                    }
                })
            })

            channel.consume("Stats_Accounts", async (msg)=>{
                let action = msg.fields.routingKey.split(".")[1]
                let entity = msg.fields.routingKey.split(".")[0]
                if (entity==="user"){
                    
                    if (action=="remove"){
                        let content = JSON.parse(msg.content.toString())
                        const deleted = await userHasStatController.deleteByUser(content)
                        console.log(deleted)
                    }
                }
            }, {noAck: true})

            // setup express app here
            // ...

            // start express server
            app.listen(process.env.PORT)

            console.log(`Express server has started on port ${process.env.PORT}. Open http://localhost:${process.env.PORT}/stats to see results`)
            
            process.on("beforeExit", ()=>{
                console.log("closing")
                connection.close()
            })
        })
    })
}).catch(error => console.log(error))

