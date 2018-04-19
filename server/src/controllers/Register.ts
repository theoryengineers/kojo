class Register {
    db;
    parent;
    constructor(parent) {
        this.db = parent.db;
        this.parent = parent;
    }
    testRegisterMethod = () => {
        console.log('testRegisterMethod from Log');
    }
    handleRegister = (bcrypt) => (req, res) => {
        const {email, username, name, password} = req.body;

        const usernameCheck = /^[a-zA-Z0-9]*$/i.test(username);
        const emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
        
        if (!emailCheck || !usernameCheck || !name || !password) {
            return res.status(400).json('incorrect form submission');
        }
        const hash = bcrypt.hashSync(password)

        this.db.transaction(trx => {
            trx('login').insert({
                hash,
                email,
                username
            }, 'email')
            .then( ([loginEmail]) => {
                // console.log(loginEmail);
                return trx('user_account')
                    .insert({
                        email: loginEmail,
                        name,
                        username,
                        created_on: new Date()
                    }, '*')
                    .then( ([user_account]) => {
                        // console.log(user_account);
                        res.json(user_account);
                        const {user_account_id, created_on} = user_account;
                        return trx('project')
                            .insert({
                                user_account_id,
                                project_name: 'initial project',
                                created_on,
                            })
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .catch(err => res.status(400).json({
            message: 'unable to register',
            err
        }))
    }
}

export default Register;