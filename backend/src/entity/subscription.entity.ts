import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    type: string;

    @Column()
    name: string;
}