class Login {
    db;
    parent;
    constructor(parent) {
        this.db = parent.db;
        this.parent = parent;
    }
    testLoginsMethod = () => {
        console.log('testLoginsMethod from Log');
    }
    handleLogin = (bcrypt) => (req, res) => {
        const { usernameOrEmail, password } = req.body;
      
        const usernameCheck = /^[a-zA-Z0-9]*$/i.test(usernameOrEmail);
        const emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(usernameOrEmail);
        const loginMethod = usernameCheck 
          ? 'username' 
          : emailCheck 
            ? 'email'
            : ''
        if (!loginMethod || !password) {
          return res.status(400).json('incorrect form submission');
        }
        this.db.select(loginMethod, 'hash').from('login')
          .where(loginMethod, '=', usernameOrEmail)
          .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
              return this.db.select('*').from('user_account')
                .where(loginMethod, '=', usernameOrEmail)
                .then( ([user]) => {
                  res.json(user)
                })
                .catch(err => res.status(400).json('unable to get user'))
            } else {
              res.status(400).json('wrong credentials!!')
            }
          })
          .catch(err => res.status(400).json('wrong credentials!'))
      }
}

export default Login;