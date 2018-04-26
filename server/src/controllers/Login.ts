class Login {
  db;
  parent;
  constructor(parent) {
    this.db = parent.db;
    this.parent = parent;
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
    this.db.select(loginMethod, 'hash')
      .from('login')
      .where(loginMethod, '=', usernameOrEmail)
      .then(data => {
        bcrypt.compare(password, data[0].hash)
          .then(isValid => {
            if (isValid) {
              return this.db.select('*').from('user')
                .where(loginMethod, '=', usernameOrEmail)
                .then((user) => {
                  res.json(user[0])
                })
            } else {
              res.status(400).json('wrong credentials!!')
            }
          })
      })
      .catch(err => res.status(400).json('No user exists'))
  }
}

export default Login;