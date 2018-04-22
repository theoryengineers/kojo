import * as bcrypt from 'bcryptjs';

class Initialize {
    db;
    parent;
    constructor(parent) {
        this.db = parent.db;
        this.parent = parent;
    }

    initDatabase = () => {
        return this.dropAllTables()
        .then(() => Promise.all[this.createLoginTable(), this.createUserTable(), this.createProjectTable()])
        //.then(() => then register admin user)
    }
    createUserTable = () => {
        return this.db.schema.hasTable('user')
        .then( exists => {
            console.log('user exists?', exists);
            if (!exists) {
                return this.db.schema.createTable('user', (t) => {
                    t.increments('user_id').primary();
                    t.string('name', 100);
                    t.string('username', 100);
                    t.string('email', 100);
                    t.text('bio');
                    t.timestamps();
                })
                // .then(() => {  //After creating 
                //     return this.db('user').insert({
                //         first_name: 'Admin',
                //         last_name: 'Admin',
                //         bio: 'Something about me',
                //         created_at: new Date(),
                //         updated_at: new Date(),
                //     })
                // })
            }
        })
        .catch(err => console.log(err))
    }
    createLoginTable = () => {
        return this.db.schema.hasTable('login')
        .then( exists => {
            console.log('login exists?', exists);
            if (!exists) {
                return this.db.schema.createTable('login', (t) => {
                    t.increments('login_id').primary();
                    t.string('username', 100);
                    t.string('email', 100);
                    t.string('hash');
                    t.timestamps();
                })
            }
        })
        .catch(err => console.log(err))
    }
    createProjectTable = () => {
        return this.db.schema.hasTable('project')
        .then( exists => {
            console.log('project exists?', exists);
            if (!exists) {
                return this.db.schema.createTable('project', (t) => {
                    t.increments('project_id').primary();
                    t.integer('user_id').unsigned();
                    // t.foreign('user_id').references('user_id').inTable('user');
                    t.string('project_name', 100);
                    t.timestamp('created_at');
                })
            }
        })
        .catch(err => console.log(err))
    }
    dropTableIfExists = (tableName) => {
        return this.db.schema.dropTableIfExists(tableName)
        .then(res => console.log(`Table "${tableName}" dropped`))
    }
    dropAllTables = () => {
        const tables = ['project', 'login', 'user'].map(table => {
            this.dropTableIfExists(table);
        });
        return Promise.all(tables)
            .catch(err=>console.log(err))
    }
}

export default Initialize;