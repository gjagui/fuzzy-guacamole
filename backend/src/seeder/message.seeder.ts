import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "../persistence/datasource";

import { Message } from "../entity/message.entity";

(async () => {
    try {
        await AppDataSource.initialize();

        const messageRepository = AppDataSource.getRepository(Message);

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
    }

    catch (error) {
        console.log(error);
    }

    finally {
        process.exit(0);
    }
})();
