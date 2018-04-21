import * as React from 'react';

const initialState = {

};

type State = Readonly<typeof initialState>;

export default class ProjectsPage extends React.Component<{}, State> {
    readonly state: State = initialState;
    render() {
        // const { projectsArr } = this.props;
        return (
            <div className="projects">
                <div className="projects__table">
                    {/* {
                        projectsArr.map((x, i) => {
                            return <>
                                <div key={i}>{x.projectName}</div>
                                <div key={i}>{x.createdOn}</div>
                            </>;
                        })
                    } */}
                </div>
            </div>
        );
    }
}