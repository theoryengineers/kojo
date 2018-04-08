import * as React from 'react';
import FormContainer from 'app_modules/abstracts/Form.component';

interface SportsFields {
    teamName: string;
    playerNumber: number;
}

const initialValues = {
    teamName: 'dog',
    playerNumber: 0
};

class SportsForm extends FormContainer<SportsFields> {}

export default () => (
    <SportsForm
        initialValues={initialValues}
        // initialValues={{ teamName: [], playerNumber: 0 }}
        // FormComponent={({ fields: { teamName, playerNumber }, onChange }) => (
        //     <form>
        //         <input 
        //             type="text" 
        //             value={teamName} 
        //             onChange={(e) => onChange('teamName', e.target.value)} 
        //         />
        //         <input
        //             type="number" 
        //             value={playerNumber} 
        //             onChange={(e) => onChange('playerNumber', parseInt(e.target.value, 10))} 
        //         />
        //     </form>
        // )}
    />
);