import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm"
import { Stat } from "./Stat"

@Entity()
export class UserHasStat {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    userId: string

    @Column()
    statId: string

    @Column()
    value: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(()=>Stat, stat => stat.userHasStat, {onDelete: "CASCADE"})
    @JoinColumn({name: "statId"})
    stat: Stat
}