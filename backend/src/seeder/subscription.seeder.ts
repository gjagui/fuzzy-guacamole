import { createConnection, getManager } from 'typeorm';
import { Subscription } from '../entity/subscription.entity';

createConnection().then(async connection => {
    const subscriptionRepository = getManager().getRepository(Subscription);

    const subscriptions = [
        { type: "sports", description: "Sports" },
        { type: "finance", description: "Finance" },
        { type: "movies", description: "Movies" },
    ];

    await subscriptionRepository.insert(subscriptions);

    process.exit(0);
});