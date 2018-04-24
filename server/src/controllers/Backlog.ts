class Backlog {
  db;
  parent;
  constructor(parent) {
      this.db = parent.db;
      this.parent = parent;
  }
  handleAddBacklog = (req, res) => {
    this.db('backlog')
  }
  handleUpdateBacklog = (req, res) => {
    this.db('backlog')
  }
  handleDeleteBacklog = (req, res) => {
    this.db('backlog')
  }
}

export default Backlog;