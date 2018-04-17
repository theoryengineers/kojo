class User {
    db;
    parent;
    constructor(parent) {
        this.db = parent.db;
        this.parent = parent;
    }
    testUsersMethod = () => {
        console.log('testUsersMethod from Log');
    }
    getAllUsers = (req, res) => {
        this.db('user_account')
        .select('*')
        .then(user_accounts => {
            console.log(user_accounts)
            res.json(user_accounts);
        })
        .catch(err => res.status(400).json('unable to get user_accounts'))
    }
    getUser = (req, res) => {
        const {userId} = req.params;
        console.log('userId', userId);
        this.db('user_account')
        .select('*')
        .where('user_account_id', userId)
        .then(user => {
            console.log(user)
            res.json(user);
        })
        .catch(err => res.status(400).json('unable to get user'))
    }
}

export default User;