import { createConnection, getManager } from "typeorm";
import { Notification } from "../entity/notification.entity";

createConnection().then(async connection => {
    const notificationRepository = getManager().getRepository(Notification);

    const notifications = [
        { type: "sms", description: "SMS" },
        { type: "email", description: "E-Mail" },
        { type: "pn", description: "Push Notification" }
    ];

    await notificationRepository.insert(notifications);

    process.exit(0);
});