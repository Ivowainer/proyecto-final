class UserInstance {
    constructor(db) {
        this.db = db;
    }

    db: { connect: () => Promise<void>; disconnect: () => Promise<void> };

    async createUser(objectUserInfo) {
        console.log(objectUserInfo);
    }
}

export default UserInstance;
