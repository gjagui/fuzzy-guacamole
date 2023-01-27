import { Request, Response } from "express";

import { getUsersBySubscriptionId } from "./user.controller";
import { logSentUserMessage } from "./log.controller";

import { messageFactory } from "../model/message/messageFactory";

import { User } from "../entity/user.entity";
import { Notification } from "../entity/notification.entity";

export const Message = async (req: Request, res: Response) => {
    try {
        if (isEmpty(req.body.subscription_id) || isEmpty(req.body.text)) return res.status(400).send("Bad Request");

        const users = await getUsersBySubscriptionId(Number(req.body.subscription_id));

        if (users?.length === 0) return res.status(404).send("Not Found");

        await sendAndLogUsersMessages(users, req.body.text, req.body.subscription_id);

        res.send("Messages have been sent");
    }

    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

const sendAndLogUsersMessages = async (users: User[], text: string, subscription_id: number) => {
    try {
        await Promise.all(users.map(async (user) => {

            const promises = user.notifications.map(async (notification) => {
                const status = sendUserMessage(user, notification, text);
                await logSentUserMessage(user, text, notification.id, subscription_id, status);
                return;
            });

            await Promise.all(promises);

            return;
        }));

        return;
    }

    catch (error) {
        throw error;
    }
}

const sendUserMessage = (user: User, notification: Notification, text: String): boolean => {
    try {
        const message = messageFactory(user, text, notification.type);

        if (message === null) throw new Error("Message type is not defined");

        return message.sendMessage();
    }

    catch (error) {
        throw error;
    }
}

const isEmpty = (value) => {
    return (typeof value === "string") ? (value.trim().length === 0) : !value;
}