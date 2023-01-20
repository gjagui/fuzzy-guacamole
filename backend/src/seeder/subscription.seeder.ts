import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "../persistence/datasource";

import { Subscription } from "../entity/subscription.entity";

(async () => {
    try {
        await AppDataSource.initialize();

        const subscriptionRepository = AppDataSource.getRepository(Subscription);

        const subscriptions = [
            { type: "sports", name: "Sports" },
            { type: "finance", name: "Finance" },
            { type: "movies", name: "Movies" },
        ];

        await subscriptionRepository.insert(subscriptions);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        process.exit(0);
    }
})();