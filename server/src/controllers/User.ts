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
    this.db('user')
      .select('*')
      .then(users => {
          console.log(users)
          res.json(users);
      })
      .catch(err => res.status(400).json('unable to get users'))
  }
  getUser = (req, res) => {
    const {userId} = req.params;
    console.log('userId', userId);
    this.db('user')
      .select('*')
      .where('user_id', userId)
      .then(user => {
          console.log(user)
          res.json(user);
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