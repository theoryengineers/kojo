class Project {
  db;
  parent;
  constructor(parent) {
    this.db = parent.db;
    this.parent = parent;
  }
  getAllProjects = (req, res) => {
    this.db('project')
      .then(projects => {
          res.json(projects);
      })
      .catch(err => res.status(400).json('unable to get projects'))
  }
  getProject = (req, res) => {
    const {userId} = req.params;
    this.db('project')
      .select('*')
      .innerJoin('user', 'project.user_id', 'user.user_id')
      .where('project.user_id', userId)
      .then(project => {
          res.json(project);
      })
      .catch(err => res.status(400).json('unable to get project'))
  }
  handleAddProject = (req, res) => {
    const {userId} = req.params;
    const {project_name} = req.body;
    this.db('project')
      .insert({
        user_id: userId,
        project_name,
        created_on: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
      },'*')
      .then( ([projectRes]) => {
          res.json(projectRes)
      })
      .catch(err => res.status(400).json({
        message: 'unable to add project',
        err
      }))
  }
  handleUpdateProject = (req, res) => {
    const {projectId} = req.params;
    const {project_name} = req.body;
    const changes = {
      project_name,
      last_updated: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    }
    this.db('project')
      .where('project_id', "=", projectId)
      .update(changes,'*')
      .then( ([projectRes]) => {
        res.json(projectRes);
      })
      .catch(err => res.status(400).json('unable to update project'))
  }
  handleDeleteProject = (req, res) => {
    const {projectId} = req.params;
    this.db('project')
      .where('project_id', "=", projectId)
      .del()
      // .catch(err => res.status(400).json({
      //   message: 'unable to delete project',
      //   err
      // }))
  }
}

export default Project;