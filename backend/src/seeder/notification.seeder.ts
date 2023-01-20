import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "../persistence/datasource";

import { Notification } from "../entity/notification.entity";

try {
    AppDataSource.initialize();

    const notificationRepository = AppDataSource.getRepository(Notification);

    const notifications = [
        { type: "sms", name: "SMS" },
        { type: "email", name: "E-Mail" },
        { type: "pn", name: "Push Notification" }
    ];

    (async () => await notificationRepository.insert(notifications))();

    process.exit(0);
}
catch (error) {
    console.log(error);
}