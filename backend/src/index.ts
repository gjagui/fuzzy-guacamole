import express, { Request, Response } from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./persistence/datasource";
import { routers } from "./router/router";

(async () => {
    try {
        await AppDataSource.initialize();

        const app = express();

        app.use(express.json());
        app.use(cors());

        routers(app);

        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
})();