import { inject } from 'mobx-react';
import MembersList from './MembersList.component';
import { Stores, ProjectsStore } from 'app_modules/stores';

export default inject(({ ProjectStore }: Stores) => {
    const {
        handleAddProjAssignButton,
        handleAddProjectAssignment
    } = ProjectStore as ProjectsStore;
    return {
        handleAddProjAssignButton,
        handleAddProjectAssignment
    };
})(MembersList);