class Register {
  db;
  parent;
  constructor(parent) {
    this.db = parent.db;
    this.parent = parent;
  }
  handleRegister = (bcrypt) => (req, res) => {
    const { email, username, name, password } = req.body;

    const usernameCheck = /^[a-zA-Z0-9]*$/i.test(username);
    const emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    if (!emailCheck || !usernameCheck || !name || !password) {
      return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password)

    this.db.transaction(trx => {
      trx('login').insert({ //add to login table
        hash,
        email,
        username,
      }, 'email')
        .then(([loginEmail]) => {
          return trx('user') //add to user table
          .insert({
            email: loginEmail,
            name,
            username,
            created_on: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
          }, '*')
          .then(([userRes]) => { 
            const { user_id, created_on } = userRes;
            return trx('project') //add to project table
            .insert({
              user_id,
              project_name: 'initial project',
              created_on,
            },'*')
            .then( ([projectRes]) => {
              const {project_id, created_on} = projectRes;
              return trx('backlog') //add to backlog table
              .insert({
                project_id,
                title: "Initial Backlog",
                is_sprint: false,
                last_updated: created_on
              },'*')
              .then( ([backlogRes]) => {
                res.json(Object.assign(userRes, {project: projectRes}, {backlog: backlogRes}))
              })
            }) // End backlog
          }) // End project
        }) // End user
        .then(trx.commit)
        .catch(trx.rollback);
    }) // login
    .catch(err => res.status(400).json({
      message: 'unable to register',
      err
    }))
  }
}

export default Register;