import express, { Request, Response } from 'express';
import cors from 'cors';

// import { routers } from './routers';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

createConnection().then(connection => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    // routers(app);

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    });
});