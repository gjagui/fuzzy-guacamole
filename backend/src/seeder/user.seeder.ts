import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "../persistence/datasource";

import { User } from "../entity/user.entity";

try {
    AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);

    const users = [
        {
            name: "Alpha",
            email: "alpha@alpha.com",
            phoneNumber: 11111111,
            notifications: [
                { id: 1 },
                { id: 2 },
                { id: 3 }
            ],
            subscriptions: [
                { id: 1 },
                { id: 2 },
                { id: 3 },
            ]
        },
        {
            name: "Beta",
            email: "beta@beta.com",
            phoneNumber: 22222222,
            notifications: [
                { id: 2 },
                { id: 3 }
            ],
            subscriptions: [
                { id: 2 },
                { id: 3 },
            ]
        },
        {
            name: "Gamma",
            email: "gamma@gamma.com",
            phoneNumber: 33333333,
            notifications: [
                { id: 3 }
            ],
            subscriptions: [
                { id: 3 },
            ]
        }
    ];

    (async () => await userRepository.save(users))();
}
catch (error) {
    console.log(error)
}