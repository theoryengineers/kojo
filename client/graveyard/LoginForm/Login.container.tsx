import FormContainer from 'app_modules/abstracts/Form.component';

interface LoginFields {
    teamName: string;
    playerNumber: number;
}

export default class LoginContainer extends FormContainer<LoginFields> {}