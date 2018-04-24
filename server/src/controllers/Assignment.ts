class Assignment {
  db;
  parent;
  constructor(parent) {
      this.db = parent.db;
      this.parent = parent;
  }
  testAssignmentMethod = () => {
      console.log('testAssignmentMethod from Log');
  }
  handleAddAssignment = (req, res) => {
    this.db('assignment')
  }
  handleUpdateAssignment = (req, res) => {
    this.db('assignment')
  }
  handleDeleteAssignment = (req, res) => {
    this.db('assignment')
  }
}

export default Assignment;