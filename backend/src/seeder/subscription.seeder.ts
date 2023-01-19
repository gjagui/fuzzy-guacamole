import { createConnection, getManager } from 'typeorm';
import { Subscription } from '../entity/subscription.entity';

createConnection().then(async connection => {
    const subscriptionRepository = getManager().getRepository(Subscription);

    const subscriptions = [
        { type: "sports", name: "Sports" },
        { type: "finance", name: "Finance" },
        { type: "movies", name: "Movies" },
    ];

    await subscriptionRepository.insert(subscriptions);

    process.exit(0);
});