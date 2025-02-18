import Button from '../components/Button';
import InputForm from '../components/InputForm'
import { FormContainer } from '../components/InputStyles';

const Signup: React.FC = () => {
  return (
    <FormContainer>
      <h2>Sign Up</h2>
      <InputForm label="Username" type="text" name="username" />
      <InputForm label="Email" type="email" name="email" />
      <InputForm label="Password" type="password" name="password" />
      <Button>Register</Button>
    </FormContainer>
  );
};


export default Signup