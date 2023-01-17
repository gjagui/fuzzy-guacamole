import { createConnection, getManager } from "typeorm";

import { User } from "../entity/user.entity";
import { Notification } from "../entity/notification.entity";
import { Subscription } from "../entity/subscription.entity";

createConnection().then(async connection => {
    const userRepository = getManager().getRepository(User);

    const users = [
        {
            name: "Alpha",
            email: "alpha@alpha.com",
            phoneNumber: 11111111,
            notifications: [
                { id: 1, type: "sms", description: "SMS" },
                { id: 2, type: "email", description: "E-Mail" },
                { id: 3, type: "pn", description: "Push Notification" }
            ],
            subscriptions: [
                { id: 1, type: "sports", description: "Sports" },
                { id: 2, type: "finance", description: "Finance" },
                { id: 3, type: "movies", description: "Movies" },
            ]
        },
        {
            name: "Beta",
            email: "beta@beta.com",
            phoneNumber: 22222222,
            notifications: [
                { id: 2, type: "email", description: "E-Mail" },
                { id: 3, type: "pn", description: "Push Notification" }
            ],
            subscriptions: [
                { id: 2, type: "finance", description: "Finance" },
                { id: 3, type: "movies", description: "Movies" },
            ]
        },
        {
            name: "Gamma",
            email: "gamma@gamma.com",
            phoneNumber: 33333333,
            notifications: [
                { id: 3, type: "pn", description: "Push Notification" }
            ],
            subscriptions: [
                { id: 3, type: "movies", description: "Movies" },
            ]
        }
    ];

    await userRepository.save(users);

    process.exit(0);
});