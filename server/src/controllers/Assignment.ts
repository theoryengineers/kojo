class Assignment {
    constructor(parent) {
        this.db = parent.db;
        this.parent = parent;
    }
    testAssignmentMethod = () => {
        console.log('testAssignmentMethod from Log');
    }
}

export default Assignment;