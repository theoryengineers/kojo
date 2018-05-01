class Backlog {
  db;
  parent;
  constructor(parent) {
      this.db = parent.db;
      this.parent = parent;
  }
  handleGetAllSprintsByProjectId = (req, res) => {
    const {projectId: project_id} = req.params;
    this.db('backlog')
    .select('*')
    .where({
      project_id,
      is_sprint: true
    })
    .then( sprintsRes => {
      res.json(sprintsRes);
    })
    .catch(err => res.status(400).json('unable to get tasks'))
  }
  handleAddSprintBacklog = (req, res) => {
    const {projectId: project_id} = req.params;
    const {title} = req.body;
    this.db('backlog')
      .insert({
        project_id,
        title,
        is_sprint: true,
        created_on: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
      },'*')
      .then( ([backlogRes]) => {
          res.json(backlogRes)
      })
      .catch(err => res.status(400).json({
        message: 'unable to add sprint backlog',
        err
      }))
  }
  handleUpdateBacklog = (req, res) => {
    const {backlogId} = req.params;
    const {title} = req.body;
    const changes = {
      title,
      last_updated: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    }
    this.db('backlog')
      .where('backlog_id', "=", backlogId)
      .update(changes,'*')
      .then( ([backlogtRes]) => {
        res.json(backlogtRes);
      })
      .catch(err => res.status(400).json('unable to update backlog'))
  }
  handleDeleteSprintBacklog = (req, res) => {
    const {backlogId} = req.params;
    this.db('backlog')
      .where('backlog_id', "=", backlogId)
      .del()
  }
}

export default Backlog;