import { Request, Response } from "express";
import { AppDataSource } from "../persistence/datasource";
import { Subscription } from "../entity/subscription.entity";

export const Subscriptions = async (req: Request, res: Response) => {
    try {
        const subscriptionRepository = AppDataSource.getRepository(Subscription);

        const subscriptions = await subscriptionRepository.find();

        res.send(subscriptions);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}