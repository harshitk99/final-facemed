import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupProfessional = () => {
  const [formData, setFormData] = useState({
    name: '',
    doctorId: '',
    password: '',
    contact: '',
    affiliatedHospital: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/register-professional', formData);
      alert('Medical Professional registered successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed: ' + error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-100 to-teal-200">
      <form className="bg-white p-8 rounded-lg shadow-lg w-80 max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-center text-teal-800 font-bold">Signup as Professional</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="doctorId"
          placeholder="Doctor ID"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="affiliatedHospital"
          placeholder="Affiliated Hospital"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-teal-600 text-white w-full py-2 rounded-lg hover:bg-teal-700 transition duration-300"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupProfessional;
