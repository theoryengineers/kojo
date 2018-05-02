class User {
  db;
  parent;
  constructor(parent) {
      this.db = parent.db;
      this.parent = parent;
  }
  handleGetAllUsers = (req, res) => {
    this.db('user')
      .select('*')
      .then(userRes => {
          res.json(userRes);
      })
      .catch(err => res.status(400).json('unable to get users'))
  }
  handleGetUser = (req, res) => {
    const {userId} = req.params;
    this.db('user')
      .select('*')
      .where('user_id', userId)
      .then(userRes => {
          res.json(userRes);
      })
      .catch(err => res.status(400).json('unable to get user'))
  }
  handleUpdateUser = (req, res) => {
    const {userId} = req.params;
    const {name, email} = req.body;
    const changes = {
      name,
      email,
      last_updated: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    }
    this.db('user')
      .where('user_id', "=", userId)
      .update(changes, '*')
      .then(([updateRes]) => {
        console.log(updateRes)
        res.json(updateRes)
      })
      .catch(err => res.status(400).json('unable to update user'))
  }
}

export default User;