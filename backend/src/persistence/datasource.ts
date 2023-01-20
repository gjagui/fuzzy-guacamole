import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    "type": "sqlite",
    "database": process.env.DATABASE_PATH,
    "entities": ["src/entity/*.ts"],
    "logging": "all",
    "synchronize": true
})