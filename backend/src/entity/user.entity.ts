import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

import { Subscription } from "./subscription.entity";
import { Notification } from "./notification.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        "unique": true
    })
    email: string;

    @Column()
    phoneNumber: number;

    @ManyToMany(() => Subscription)
    @JoinTable({
        name: 'user_subscription',
        joinColumn: { name: 'subscription_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
    })
    subscriptions: Subscription[];

    @ManyToMany(() => Notification)
    @JoinTable({
        name: 'user_notification',
        joinColumn: { name: 'notification_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
    })
    notifications: Notification[];
}