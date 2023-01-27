import express, { Router } from "express";

import { Subscriptions } from "../controller/subscription.controller";
import { Logs } from "../controller/log.controller";
import { Message } from "../controller/message.controller";

export const routers = (router: Router) => {
    router.get("/subscriptions", Subscriptions);
    router.get("/logs", Logs);
    router.post("/message", Message);
};