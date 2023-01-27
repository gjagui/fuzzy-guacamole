import { AbstractMessage } from "./message.model";
import { User } from "../../entity/user.entity";

export class PNMessage extends AbstractMessage {
    constructor(user: User, text: String) {
        super(user, text)
    };

    sendMessage(): boolean {
        console.log({ user: this.user, text: this.text, type: "pn" });
        return ((Math.floor(Math.random() * 10) + 1) > 1);
    };
}