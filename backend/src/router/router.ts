import express, { Router } from "express";

import { Users } from "../../controller/user.controller";
import { Messages, SendMessages } from "../../controller/message.controller";

export const routers = (router: Router) => {

    router.get("/users", Users);

    router.get("/user/:id/message", Messages);
    router.post("/message", SendMessages);
};