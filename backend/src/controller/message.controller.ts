import { Request, Response } from "express";
import { AppDataSource } from "../persistence/datasource";

import { Message } from "../entity/message.entity";
import { User } from "../entity/user.entity";
import { Subscription } from "../entity/subscription.entity";
import { Notification } from "../entity/notification.entity";

export const Messages = async (req: Request, res: Response) => {
    try {
        if (isEmpty(req.params.id)) return res.status(400).send("Bad Request");

        const messageRepository = AppDataSource.getRepository(Message);

        const messages = await messageRepository.find({
            where: {
                user: {
                    id: Number(req.params.id)
                },
            },
            relations: ["user", "subscription", "notification"],
            order: { created_at: "DESC" }
        });

        return (messages.length === 0) ? res.status(404).send("Not Found") : res.send(messages);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export const SendMessages = async (req: Request, res: Response) => {
    try {
        if (isEmpty(req.body.user_id) || isEmpty(req.body.subscription_id) || isEmpty(req.body.text)) return res.status(400).send("Bad Request");

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            relations: ["subscriptions", "notifications"],
            where:
                { id: Number(req.body.user_id) }
        });

        if (!user || !user.hasSubscription(req.body.subscription_id)) return res.status(404).send("Not Found")

        const messages = await Promise.all(executeSendMessages(user, req.body.text, Number(req.body.subscription_id)));

        res.send(messages);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

const executeSendMessages = (user: User, text: string, subscription_id: Number) => {
    try {
        const messageRepository = AppDataSource.getRepository(Message);

        const messages = user.notifications.map(async (userNotification) => {

            const notification = new Notification();
            notification.id = userNotification.id;

            const subscription = new Subscription();
            subscription.id = Number(subscription_id);

            let message = new Message();

            message.text = text;
            message.user = user;
            message.notification = notification;
            message.subscription = subscription;

            return await messageRepository.save(message);
        });

        return messages;

    } catch (error) {
        throw error;
    }
}

const isEmpty = (value) => {
    return (typeof value === "string") ? (value.trim().length === 0) : !value;
}