import { Api } from './OurNewApi';
import 'whatwg-fetch';

// simon.cowell@gmail.com
// bacon
describe('OurApi', () => {   
    const OurApi = new Api();
    const User = {
        id: 0,
        email: 'justatest@chicken.com',
        password: 'somepass',
        displayname: 'justaname',
        fname: 'justafrname',
        lname: 'justalname',
    };
    const Project ={
        id: 0,
        name: 'someprojectname',
    };

    it('exists', () => {
        expect(OurApi).toBeDefined();
    });

    it('can create a user', async () => {
        expect.assertions(1);

        
        const response = await OurApi.register(User.fname, User.lname, User.displayname, User.email, User.password);
        User.id = response[0].user_id;

        expect(response[0]).toEqual(expect.objectContaining({
            "fname": expect.any(String),
            "lname": expect.any(String),
            "displayname": expect.any(String),
            "email": expect.any(String),
            "joined": expect.any(String),
            "user_id": expect.any(Number),
        }));

    });

    it('can get a list of users', async () => {
        const response = await OurApi.getAllUsers();
        expect(response.length).toBeGreaterThan(0);
    })

    it('can get a single user', async () => {
        // expect.assertions(1);
        const response = await OurApi.getUserById(User.id);
        expect(response.user_id).toEqual(User.id);
    })

    it('can authenticate a user', async () => {
        let response;
        try {
            expect.assertions(2);            
            response = await OurApi.authenticate(User.email, User.password);

            expect(response).toBeDefined();
            expect(response).toEqual(expect.objectContaining({
                "user_id": expect.any(Number),
                "fname": expect.any(String),
                "lname": expect.any(String),
                "displayname": expect.any(String),
                "joined": expect.any(String)
            }));
       
        } catch (e) {
            console.log(e);
        }
    });



    describe('Projects', () => {  
        it('can create a project', async() => {
            const response = await OurApi.addProject(User.id, Project.name);
            Project.id = response.project_id;
            expect(response).toBeDefined();
        });

        // it('can edit the project name', async() => {
        //     console.log('here is', Project.id);
        //     const response = await OurApi.editProject(Project.id, 'newprojectname');
        //     console.log(response);
        //     expect(response.project_name).toBe('newprojectname');
        // });

        it('can get project by id', async() => {
            const response = await OurApi.getProjectById(Project.id);
            expect(response.project_id).toBe(Project.id);

        });

    })

    describe('API Cleanup', () => {
        it('can delete a user', async() => {
            const response = await OurApi.removeUserById(User.id);      
            expect(response).toBeDefined();
        })
    })    

});