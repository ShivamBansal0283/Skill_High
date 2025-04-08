import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import apiSet from '../auth/axiosConfig';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiSet.post('/admin/login', { username, password });
    
      // if (res.data.token) {
      //   localStorage.setItem('token', res.data.token);
      //   navigate('/dashboard');
      // }
      if(res.data.token){
        localStorage.setItem('token', res.data.token); // Store token in localStorage
        window.location.reload();
        navigate('/dashboard'); // Redirect to the dashboard page
      }
      else {
        setErrorMessage('No token returned');
      }
    } catch (error: any) {
      setErrorMessage('Invalid username or password');
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await apiSet.post('/admin/register', { username, password });
      alert('Registration successful!');
      setIsLogin(true);
    } catch (error: any) {
      setErrorMessage('Error registering user: ' + error.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex gap-10 max-w-screen-xl w-full px-4">
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          errorMessage={errorMessage}
          onSubmit={isLogin ? handleLogin : handleRegister}
          isLogin={isLogin}
        />

        {!isLogin && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg w-full sm:w-80 mx-auto">
            <h3 className="text-center text-lg font-semibold text-gray-700 mb-4">Registration Rules:</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="p-3 bg-gray-200 rounded-md">Username must be between 4 and 20 characters long</div>
              <div className="p-3 bg-gray-200 rounded-md">Username must only contain letters and numbers</div>
              <div className="p-3 bg-gray-200 rounded-md">Password must be at least 8 characters long</div>
              <div className="p-3 bg-gray-200 rounded-md">Password must contain at least one uppercase letter</div>
              <div className="p-3 bg-gray-200 rounded-md">Password must contain at least one lowercase letter</div>
              <div className="p-3 bg-gray-200 rounded-md">Password must contain at least one number</div>
              <div className="p-3 bg-gray-200 rounded-md">Password must contain at least one special character (e.g., @, $, %, *, etc.)</div>
              <div className="p-3 bg-gray-200 rounded-md">Password cannot contain the word "password"</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;