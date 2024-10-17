import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { UserHasStat } from "./UserHasStat"

@Entity()
export class Stat {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    unit: string

    @Column({default: "number"})
    valueType: string // "number" o "string"

    @Column("float", {default: 0})
    minValue: number

    @Column("float", {default: 1000})
    maxValue: number

    @Column({default: 2})
    decimals: number

    @OneToMany(() => UserHasStat, userHasStat => userHasStat.stat)
    userHasStat: UserHasStat[]

}
