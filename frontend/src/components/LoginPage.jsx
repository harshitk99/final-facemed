import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [role, setRole] = useState('user');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        password,
        role,
        [role === 'professional' ? 'doctorId' : 'aadharNumber']: identifier,
      });

      localStorage.setItem('token', response.data.token);

      if (role === 'user') {
        navigate('/dashboard');
      } else {
        navigate('/professional-dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed: ' + error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-100 to-teal-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 max-w-sm">
        <h2 className="text-2xl mb-6 text-center text-teal-800 font-bold">Login</h2>
        <select 
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="professional">Medical Professional</option>
        </select>
        <input
          type="text"
          placeholder={role === 'user' ? 'Aadhaar Number' : 'Doctor ID'}
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-teal-600 text-white w-full py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="mt-6 flex justify-between">
          <button
            className="text-teal-600 hover:text-teal-800"
            onClick={() => navigate('/signup-user')}
          >
            Signup as User
          </button>
          <button
            className="text-teal-600 hover:text-teal-800"
            onClick={() => navigate('/signup-professional')}
          >
            Signup as Professional
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
