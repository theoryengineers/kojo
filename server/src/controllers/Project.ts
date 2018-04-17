class Project {
    db;
    parent;
    constructor(parent) {
        this.db = parent.db;
        this.parent = parent;
    }
    testProjectMethod = () => {
        console.log('testProjectMethod from Log');
    }
    getAllProjects = (req, res) => {
        this.db('project')
        .select('*')
        .then(projects => {
            console.log(projects)
            res.json(projects);
        })
        .catch(err => res.status(400).json('unable to get projects'))
    }
    getProject = (req, res) => {
        const {userId} = req.params;
        console.log('userId', userId);
        this.db('project')
        .select('*')
        .innerJoin('user_account', 'project.user_account_id', 'user_account.user_account_id')
        .where('project.user_account_id', userId)
        .then(project => {
            console.log(project)
            res.json(project);
        })
        .catch(err => res.status(400).json('unable to get project'))
    }
}

export default Project;