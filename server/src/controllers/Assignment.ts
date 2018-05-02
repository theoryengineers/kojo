class Assignment {
  db;
  parent;
  constructor(parent) {
      this.db = parent.db;
      this.parent = parent;
  }
  handleAddAssignment = (req, res) => {
    const {backlog_task_id, user_id, description} = req.body;
    this.db('assignment')
      .insert({
        user_id,
        backlog_task_id,
        description
      },'*')
      .then( ([assignmentRes]) => {
        console.log('assignmentRes', assignmentRes)
         res.json(assignmentRes)
      })
      .catch(err => res.status(400).json({
        message: 'unable to add assignment',
        err
      }))
  }
  handleUpdateAssignment = (req, res) => {
    const {assignmentId} = req.params;
    const {backlog_task_id, user_id, description} = req.body;
    const changes = {
      user_id,
      backlog_task_id,
      description
    }
    this.db('assignment')
      .where('assignment_id', "=", assignmentId)
      .update(changes,'*')
      .then( ([assignmentRes]) => {
        res.json(assignmentRes);
      })
      .catch(err => res.status(400).json('unable to update assignment'))
  }
  handleDeleteAssignment = (req, res) => {
    const {assignmentId} = req.params;
    this.db('assignment')
      .where('assignment_Id', "=", assignmentId)
      .del()
  }
}

export default Assignment;