import * as React from 'react';
import { ProjectStore } from 'app_modules/stores/ProjectStore';

const initialState = {

};

interface Props {
    projects?: ProjectStore[];
    handleAddProject?: (e: React.MouseEvent<HTMLElement>) => void;
    handleEditProject?: () => void;
    handleDeleteProject?: () => void;
    handleGetProjectById?: () => void;
    handleGetAllProjects?: () => void;
    handleGetAllProjectsByUserId?: () => void;
}

type State = Readonly<typeof initialState>;

export default class ProjectsPage extends React.Component<Props, State> {
    readonly state: State = initialState;
    componentDidMount() {
        this.props.handleGetAllProjectsByUserId!();
    }
    render() {
        console.log(this.props.projects!.forEach(x => x));
        return (
            <div className="projects">
                <table>
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Created On</th>
                        </tr>
                    </thead>
                    <tbody className="projects__table">
                        {
                            this.props.projects!.map((x) => {
                                return <tr key={x.projectid}>
                                    <td>{x.projectname}</td>
                                    <td>{x.createdon}</td>
                                </tr>;
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}