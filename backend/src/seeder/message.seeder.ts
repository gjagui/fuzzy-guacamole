import { createConnection, getManager } from "typeorm";

import { Message } from "../entity/message.entity";
import { User } from "../entity/user.entity";
import { Notification } from "../entity/notification.entity";
import { Subscription } from "../entity/subscription.entity";

createConnection().then(async connection => {
    const messageRepository = getManager().getRepository(Message);

    const messages = [
        {
            user: { id: 1 },
            notification: { id: 1 },
            subscription: { id: 1 },
            text: "Alpha text 1"
        },
        {
            user: { id: 1 },
            notification: { id: 2 },
            subscription: { id: 2 },
            text: "Alpha text 2"
        },
        {
            user: { id: 1 },
            notification: { id: 3 },
            subscription: { id: 3 },
            text: "Alpha text 3"
        },
        {
            user: { id: 2 },
            notification: { id: 2 },
            subscription: { id: 2 },
            text: "Beta text 1"
        },
        {
            user: { id: 2 },
            notification: { id: 3 },
            subscription: { id: 3 },
            text: "Beta text 2"
        },
        {
            user: { id: 3 },
            notification: { id: 3 },
            subscription: { id: 3 },
            text: "Gamma text 1"
        }
    ];

    await messageRepository.save(messages);

    process.exit(0);
});