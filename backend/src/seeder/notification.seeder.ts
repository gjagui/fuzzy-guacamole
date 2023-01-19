import { createConnection, getManager } from "typeorm";
import { Notification } from "../entity/notification.entity";

createConnection().then(async connection => {
    const notificationRepository = getManager().getRepository(Notification);

    const notifications = [
        { type: "sms", name: "SMS" },
        { type: "email", name: "E-Mail" },
        { type: "pn", name: "Push Notification" }
    ];

    await notificationRepository.insert(notifications);

    process.exit(0);
});