class Project {
  db;
  parent;
  constructor(parent) {
    this.db = parent.db;
    this.parent = parent;
  }
  handleAddProject = (req, res) => {
    const {userId} = req.params;
    const { project_name } = req.body;
    this.db.transaction(trx => {
      trx('project')
        .insert({
          user_id: userId,
          project_name,
          created_on: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
        },'*')
        .then( ([projectRes]) => {
          const {project_id, created_on} = projectRes;
          return trx('backlog')
          .insert({
            project_id,
            title: `${project_name} Backlog`,
            is_sprint: false,
            created_on
          },'*')
          .then( ([backlogRes]) => {
            res.json(Object.assign(projectRes, {backlog: backlogRes}))
          })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json({
      message: 'unable to add project',
      err
    }))
  }
  handleGetAllProjectsByUserId = (req, res) => {
    const {userId} = req.params;
    this.db('project')
      .select('*')
      .innerJoin('user', 'project.user_id', 'user.user_id')
      .where('project.user_id', userId)
      .then(projectRes => {
          res.json(projectRes);
      })
      .catch(err => res.status(400).json('unable to get projects for user'))
  }
  handleGetProjectById = (req, res) => {
    const {projectId} = req.params;
    this.db('project')
      .select('*')
      // .innerJoin('user', 'project.user_id', 'user.user_id')
      .where('project.project_id', projectId)
      .then(projectRes => {
          res.json(projectRes);
      })
      .catch(err => res.status(400).json('unable to get project for user'))
  }
  handleGetAllProjects = (req, res) => {
    this.db('project')
      .then(projectRes => {
          res.json(projectRes);
      })
      .catch(err => res.status(400).json('unable to get all projects'))
  }
  // getProject = (req, res) => {
  //   const {userId} = req.params;
  //   this.db('project')
  //     .select('*')
  //     .innerJoin('user', 'project.user_id', 'user.user_id')
  //     .where('project.user_id', userId)
  //     .then(project => {
  //         res.json(project);
  //     })
  //     .catch(err => res.status(400).json('unable to get project'))
  // }
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