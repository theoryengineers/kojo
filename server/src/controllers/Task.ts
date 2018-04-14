class Task {
    constructor(parent) {
        this.db = parent.db;
        this.parent = parent;
    }
    testLoginsMethod = () => {
        console.log('testTasksMethod from Log');
    }
}

export default Task;