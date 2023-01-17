import express, { Router } from "express";

import { Users } from "../../controller/user.controller";

export const routers = (router: Router) => {
    router.get("/users", Users);
};