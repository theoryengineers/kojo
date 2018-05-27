import { inject } from 'mobx-react';
import MembersList from './Content.component';
import { Stores, ProjectsStore } from 'app_modules/stores';

export default inject(({ ProjectStore }: Stores) => {
    const {
        handleGetProjectById
    } = ProjectStore as ProjectsStore;
    return {
        handleGetProjectById
    };
})(MembersList);