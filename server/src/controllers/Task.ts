class Task {
  db;
  parent;
  constructor(parent) {
      this.db = parent.db;
      this.parent = parent;
  }
  handleAddTask = (req, res) => {
    const { 
      description, 
      difficulty, 
      project_id,
      backlog_id,
      title,
      progress,
      users // not done with users
    } = req.body;
    this.db.transaction(trx => {
      trx('task')
        .insert({
          description,
          difficulty,
          project_id,
          created_on: new Date()
        },'*')
        .then( ([taskRes]) => {
          const {task_id, created_on} = taskRes;
          return trx('backlog_task')
          .insert({
            task_id,
            backlog_id,
            title,
            progress,
            last_updated: created_on
          },'*')
          .then( ([backlog_taskRes]) => {
            res.json(backlog_taskRes);
          })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json({
      message: 'unable to add task',
      err
    }))
  }
  handleUpdateTask = (req, res) => {
    const { taskId } = req.params;
    const { description, difficulty } = req.body;
    const changes = {
      description,
      difficulty,
      last_updated: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    }
    this.db('task')
      .where('task_id', '=', taskId)
      .update(changes, '*')
      .then( ([taskRes]) => {
        res.json(taskRes)
      })
      .catch(err => res.status(400).json('unable to update task'))
  }
  handleDeleteTask = (req, res) => {
    const {taskId} = req.params;
    this.db('task')
      .where('task_id', "=", taskId)
      .del()
  }
}

export default Task;