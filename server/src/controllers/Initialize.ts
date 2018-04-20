class Initialize {
    db;
    parent;
    constructor(parent) {
        this.db = parent.db;
        this.parent = parent;
    }
    testInitializeMethod = () => {
        console.log('testInitializeMethod from Log');
    }
    // hasTable = (tableName) => {
    //     return this.db.schema.hasTable('backlog')
    // }
    createUserTableIfDoesntExist = () => {
        return this.db.schema.hasTable('user')
        .then( exists => {
            console.log('exists', exists);
            if (!exists) {
                return this.db.schema.createTable('user', (t) => {
                    t.increments('users_id').primary();
                    t.string('first_name', 100);
                    t.string('last_name', 100);
                    t.text('bio');
                    t.timestamps();
                })
                .then(() => {  //After creating 
                    return this.db('user').insert({
                        first_name: 'Admin',
                        last_name: 'Admin',
                        bio: 'Something about me',
                        created_at: new Date(),
                        updated_at: new Date(),
                    })
                })
            }
        })
        .catch(err => console.log(err))
    }
    dropTableIfExists = (tableName) => {
        return this.db.schema.dropTableIfExists(tableName)
        .then()
        .catch(err=>console.log(err))
    }
}

export default Initialize;