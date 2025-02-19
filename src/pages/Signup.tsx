import InputForm from '../components/InputForm';
import { FormContainer } from '../components/InputStyles';
import { StyledLink, BaseButton } from '../components/ButtonStyles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from './Login';

const Signup: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim() || !email.trim() || !password.trim()) {
      alert('All fields must be filled in.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${URL}api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userName, email, password }),
      });

      if (res.ok) {
        alert('User registered successfully!');
        navigate('/login');
      } else {
        alert('There was an error. Try again.');
      }
    } catch (error) {
      console.error('Error in registration: ', error);
      alert('Unexpected error. Check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <InputForm 
          label="Username" 
          type="text" 
          name="username" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
        />
        <InputForm 
          label="Email" 
          type="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <InputForm 
          label="Password" 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <BaseButton type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Register'}
        </BaseButton>
      </form>
      <div>
        <h5>
          Already have an account? <StyledLink to="/login">Login</StyledLink>
        </h5>
      </div>
    </FormContainer>
  );
};

export default Signup;
