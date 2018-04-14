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
    getProjects = (req, res) => {
        this.db('project')
        .select('*')
        .then(projects => {
            console.log(projects)
            res.json(projects);
        })
        .catch(err => res.status(400).json('unable to get projects'))
    }
}

export default Project;