class Backlog {
    constructor(parent) {
        this.db = parent.db;
        this.parent = parent;
    }
    testBacklogMethod = () => {
        console.log('testBacklogMethod from Log');
    }
}

export default Backlog;