import { inject } from 'mobx-react';
import ProjectsPage from './Projects.component';
import { Stores, ProjectsStore } from 'app_modules/stores';

// tslint:disable-next-line:no-shadowed-variable
export default inject(({ ProjectStore }: Stores) => {
    const {
        projects,
        projectname,
        handleOnFieldChange,
        handleAddProject,
        handleEditProject,
        handleEditProjectButton,
        handleDeleteProject,
        handleGetProjectById,
        handleGetAllProjects,
        handleGetAllProjectsByUserId
    } = ProjectStore as ProjectsStore;
    return {
        projects,
        projectname,
        handleOnFieldChange,
        handleAddProject,
        handleEditProject,
        handleEditProjectButton,
        handleDeleteProject,
        handleGetProjectById,
        handleGetAllProjects,
        handleGetAllProjectsByUserId
    };
})(ProjectsPage);