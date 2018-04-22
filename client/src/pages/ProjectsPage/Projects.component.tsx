import * as React from 'react';
import { ResObjProjectsById } from 'app_modules/types';

const initialState = {

};

interface Props {
    handleProjectsById: () => void;
    projectslist: Array<ResObjProjectsById>;
}

type State = Readonly<typeof initialState>;

export default class ProjectsPage extends React.Component<Props, State> {
    readonly state: State = initialState;

    componentDidMount() {
        this.props.handleProjectsById();
    }

    render() {
        const { projectslist } = this.props;
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
                            projectslist.map((x, i) => {
                                return <tr key={i}>
                                    <td>{x.project_name}</td>
                                    <td>{x.created_on}</td>
                                </tr>;
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}