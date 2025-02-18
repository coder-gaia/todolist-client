import React, { useState } from 'react'
import { FormContainer } from '../components/InputStyles';
import InputForm from '../components/InputForm';
import { BaseButton } from '../components/ButtonStyles';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert('All fields must be filled in.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        alert('User logged in successfully!');
        navigate('/success');
      } else {
        alert('There was an error. Try again.');
      }
    } catch (error) {
      console.error('Error in login: ', error);
      alert('Unexpected error. Check your connection.');
    }
  }

    return (
        <FormContainer>
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <InputForm label="Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputForm label="Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <BaseButton type='submit'>Login</BaseButton>
          </form>
        </FormContainer>
      );
}

export default Login