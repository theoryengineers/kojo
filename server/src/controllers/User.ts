class User {
    constructor(parent) {
        this.db = parent.db;
        this.parent = parent;
    }
    testUsersMethod = () => {
        console.log('testUsersMethod from Log');
    }
}

export default User;