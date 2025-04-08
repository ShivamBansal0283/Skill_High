import React, { FormEvent } from 'react';

interface LoginFormProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  errorMessage: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLogin: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  errorMessage,
  onSubmit,
  isLogin,
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 mx-auto">
      <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">
        {isLogin ? 'Login' : 'Register'}
      </h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {errorMessage && <p className="text-center text-red-600">{errorMessage}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;