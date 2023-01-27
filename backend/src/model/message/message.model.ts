import { User } from "../../entity/user.entity";

export abstract class AbstractMessage {
    user: User;
    text: String;

    constructor(user: User, text: String) {
        this.user = user;
        this.text = text;
    };

    abstract sendMessage(): boolean;
}