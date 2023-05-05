import { IUserClassReturn } from "../types";

class UserInstance {
    /* constructor(db) {
        this.db = db;
    }

    db: { connect: () => Promise<void>; disconnect: () => Promise<void> }; */

    async createUser(objectUserInfo): Promise<IUserClassReturn> {
        return { codeResponse: 200, message: "The user has been created" };
    }
}

export default UserInstance;
