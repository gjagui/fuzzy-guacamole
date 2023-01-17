import { Request, Response } from "express";
import { getManager } from "typeorm";

import { Message } from "../src/entity/message.entity";
import { User } from "../src/entity/user.entity";
import { Subscription } from "../src/entity/subscription.entity";
import { Notification } from "../src/entity/notification.entity";

export const Messages = async (req: Request, res: Response) => {
    try {
        const messageRepository = getManager().getRepository(Message);

        const messages = await messageRepository.find({
            where: {
                user: {
                    id: Number(req.params.id)
                },
            },
            relations: ["user", "subscription", "notification"]
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
        const messageRepository = getManager().getRepository(Message);

        let message = new Message();

        const user = new User();
        user.id = req.body.user_id;

        const subscription = new Subscription();
        subscription.id = req.body.subscription_id;

        const notification = new Notification();
        notification.id = req.body.notification_id;

        message = { ...message, user, subscription, notification };

        const savedMessage = await messageRepository.save(message);

        res.send(savedMessage);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}