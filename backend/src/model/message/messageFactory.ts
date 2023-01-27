import { User } from "../../entity/user.entity";

import { SMSMessage } from "./sms.model";
import { emailMessage } from "./email.model";
import { PNMessage } from "./pn.model";

export const messageFactory = (user: User, text: String, messageType: String,) => {
    switch (messageType) {
        case "sms":
            return new SMSMessage(user, text);

        case "email":
            return new emailMessage(user, text);

        case "pn":
            return new PNMessage(user, text);

        default:
            return null;
    }
}