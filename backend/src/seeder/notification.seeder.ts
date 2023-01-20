import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "../persistence/datasource";

import { Notification } from "../entity/notification.entity";

(async () => {
    try {
        await AppDataSource.initialize();

        const notificationRepository = AppDataSource.getRepository(Notification);

        const notifications = [
            { type: "sms", name: "SMS" },
            { type: "email", name: "E-Mail" },
            { type: "pn", name: "Push Notification" }
        ];

        await notificationRepository.insert(notifications);
    }
    catch (error) {
        console.log(error);
    }

    finally {
        process.exit(0);
    }
})();