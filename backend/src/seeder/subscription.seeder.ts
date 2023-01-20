import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "../persistence/datasource";

import { Subscription } from "../entity/subscription.entity";

try {
    AppDataSource.initialize();

    const subscriptionRepository = AppDataSource.getRepository(Subscription);

    const subscriptions = [
        { type: "sports", name: "Sports" },
        { type: "finance", name: "Finance" },
        { type: "movies", name: "Movies" },
    ];

    (async () => await subscriptionRepository.insert(subscriptions))();

    process.exit(0);
}
catch (error) {
    console.log(error);
}
