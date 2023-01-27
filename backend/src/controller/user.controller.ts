import { AppDataSource } from "../persistence/datasource";
import { User } from "../entity/user.entity";

export const getUsersBySubscriptionId = async (subscription_id: Number) => {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const users = await userRepository.find({
            relations: ["subscriptions", "notifications"],
            where:
            {
                subscriptions:
                    { id: Number(subscription_id) }
            }
        });

        return users;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}