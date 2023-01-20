import { Request, Response } from "express";
import { AppDataSource } from "../persistence/datasource";
import { User } from "../entity/user.entity";

export const Users = async (req: Request, res: Response) => {
    try {
        const repository = AppDataSource.getRepository(User);

        const users = await repository.find({ relations: ["notifications", "subscriptions"] });

        res.send(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}