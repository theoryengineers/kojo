class Sprint {
    constructor(parent) {
        this.db = parent.db;
        this.parent = parent;
    }
    testLoginsMethod = () => {
        console.log('testSprintsMethod from Log');
    }
}

export default Sprint;