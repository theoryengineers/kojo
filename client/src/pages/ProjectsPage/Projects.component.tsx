import * as React from 'react';
import { ProjectStore } from 'app_modules/stores/ProjectStore';
import { observer } from 'mobx-react';
import DevTools, { configureDevtool } from 'mobx-react-devtools';

configureDevtool({
    logEnabled: true,
    updatesEnabled: true,
    graphEnabled: false
});

const initialState = {

};

type State = Readonly<typeof initialState>;

interface Props {
    projects?: ProjectStore[];
    projectname?: string;
    handleAddProject?: () => void;
    handleEditProject?: () => void;
    handleEditProjectButton?: (id: number, name: string) => void;
    handleDeleteProject?: () => void;
    handleGetProjectById?: () => void;
    handleGetAllProjects?: () => void;
    handleGetAllProjectsByUserId?: () => void;
    handleOnFieldChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

@observer
export default class ProjectsPage extends React.Component<Props, State> {
    readonly state: State = initialState;

    componentDidMount() {
        this.props.handleGetAllProjectsByUserId!();
    }

    render() {
        return (
            <div className="projects">
                <AddProject
                    handleAddProject={this.props.handleAddProject}
                    handleEditProject={this.props.handleEditProject}
                    handleOnFieldChange={this.props.handleOnFieldChange}
                    projectname={this.props.projectname}
                />
                <table>
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Created On</th>
                        </tr>
                    </thead>
                    <tbody className="projects__table">
                        {
                            this.props.projects!.sort((a, b) => a.projectid - b.projectid).map(x => {
                                return <Rows
                                    key={x.projectid}
                                    project={x}
                                    handleDeleteProject={this.props.handleDeleteProject}
                                    handleEditProjectButton={this.props.handleEditProjectButton}
                                />;
                            })
                        }
                    </tbody>
                </table>
                <DevTools />
            </div>
        );
    }
}

interface AddProjectProps {
    handleAddProject?: () => void;
    handleEditProject?: () => void;
    handleOnFieldChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    projectname?: string;
}

const AddProject = (props: AddProjectProps) => {
    return (
        <div>
            <input
                name="projectname"
                onChange={(e) => props.handleOnFieldChange!(e)}
                value={props.projectname}
            />
            <button onClick={() => props.handleAddProject!()}>Add</button>
            <button onClick={() => props.handleEditProject!()}>Save</button>
        </div>
    );
};

interface RowProps {
    project?: ProjectStore;
    handleDeleteProject?: (projectid: number) => void;
    handleEditProjectButton?: (id: number, name: string) => void;
}

@observer
class Rows extends React.Component<RowProps, {}> {
    render() {
        const { project, handleDeleteProject, handleEditProjectButton } = this.props;
        return (
            <tr>
                <td>{project!.projectname}</td>
                <td>{project!.createdon}</td>
                <td><button onClick={() => handleDeleteProject!(project!.projectid)}>X</button></td>
                <td><button
                    onClick={() => handleEditProjectButton!(project!.projectid, project!.projectname)}
                >
                    E
                </button></td>
            </tr>
        );
    }
}