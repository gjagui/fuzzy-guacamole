import { Request, Response } from "express";
import { AppDataSource } from "../persistence/datasource";

import { Log } from "../entity/log.entity";
import { User } from "../entity/user.entity";
import { Subscription } from "../entity/subscription.entity";
import { Notification } from "../entity/notification.entity";


export const Logs = async (req: Request, res: Response) => {
    try {
        const logRepository = AppDataSource.getRepository(Log);

        const logs = await logRepository.find({
            relations: ["user", "subscription", "notification"],
            order: {
                created_at: "DESC",
                user: { name: "ASC" },
                notification: { type: "ASC" }
            }
        });

        return (logs?.length === 0) ? res.status(404).send("Not Found") : res.send(logs);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export const logSentUserMessage = async (user: User, text: string, notification_id: number, subscription_id: number, status: boolean) => {
    return await saveLogSentUserMessage(user, text, notification_id, subscription_id, status);
}

const saveLogSentUserMessage = async (user: User, text: string, notification_id: number, subscription_id: number, status: boolean) => {
    try {
        const logRepository = AppDataSource.getRepository(Log);

        const notification = new Notification();
        notification.id = Number(notification_id);

        const subscription = new Subscription();
        subscription.id = Number(subscription_id);

        let log = new Log();

        log.text = text;
        log.user = user;
        log.notification = notification;
        log.subscription = subscription;
        log.status = status;

        return await logRepository.save(log);
    }
    catch (error) {
        throw error;
    }
}