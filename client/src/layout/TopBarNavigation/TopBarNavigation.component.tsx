import * as React from 'react';
import { ResObjProjectsById } from 'app_modules/types';

interface Props {
    displayName?: string;
    projectslist?: Array<ResObjProjectsById>;
    handleLogOut?: () => void;
}

const TopBarNavigation: React.SFC<Props> = (props) => (
    <div className="topbarnav">
        <div>
            <select>
                {/* {props.projectslist!.map((x, i) => {
                    return <option key={i} value={x.project_name}>{x.project_name}</option>;
                })} */}
            </select>
            <span className="topbarnav__arrow">→</span>
            <select>
                <option>Sprint 1</option>
            </select>
        </div>
        <div>Howdy, {props.displayName}!</div>
        <div><a href="/" onClick={() => props.handleLogOut!()}><button>Sign Out</button></a></div>
    </div>
);

export default TopBarNavigation;