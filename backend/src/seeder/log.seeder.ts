import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "../persistence/datasource";

import { Log } from "../entity/log.entity";

(async () => {
    try {
        await AppDataSource.initialize();

        const logRepository = AppDataSource.getRepository(Log);

        const logs = [
            {
                user: { id: 1 },
                notification: { id: 1 },
                subscription: { id: 1 },
                text: "Alpha text 1",
                status: true
            },
            {
                user: { id: 1 },
                notification: { id: 2 },
                subscription: { id: 2 },
                text: "Alpha text 2",
                status: true
            },
            {
                user: { id: 1 },
                notification: { id: 3 },
                subscription: { id: 3 },
                text: "Alpha text 3",
                status: true
            },
            {
                user: { id: 2 },
                notification: { id: 2 },
                subscription: { id: 2 },
                text: "Beta text 1",
                status: true
            },
            {
                user: { id: 2 },
                notification: { id: 3 },
                subscription: { id: 3 },
                text: "Beta text 2",
                status: true
            },
            {
                user: { id: 3 },
                notification: { id: 3 },
                subscription: { id: 3 },
                text: "Gamma text 1",
                status: true
            }
        ];

        await logRepository.save(logs);
    }

    catch (error) {
        console.log(error);
    }

    finally {
        process.exit(0);
    }
})();
