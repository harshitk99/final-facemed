import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const SignupUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    aadharNumber: '',
    password: '',
    emergencyContact: '',
    bloodGroup: '',
    allergies: '',
    pastSurgery: '',
    otherMedicalConditions: '',
    photo: null,
  });
  const [useCamera, setUseCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        setFormData((prevData) => ({
          ...prevData,
          photo: new File([blob], 'captured.png', { type: 'image/png' }),
        }));
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
    setCapturedImage(null); // Clear captured image if file is uploaded
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();
      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }

      await axios.post('http://localhost:3000/upload', formDataObj);
      alert('User registered successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed: ' + error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-100 to-teal-200">
      <form className="bg-white p-8 rounded-lg shadow-lg w-80 max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-center text-teal-800 font-bold">Signup as User</h2>
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
          name="aadharNumber"
          placeholder="Aadhaar Number"
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
          name="emergencyContact"
          placeholder="Emergency Contact"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="allergies"
          placeholder="Allergies"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
        />
        <input
          type="text"
          name="pastSurgery"
          placeholder="Past Surgery"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
        />
        <input
          type="text"
          name="otherMedicalConditions"
          placeholder="Other Medical Conditions"
          className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
          onChange={handleChange}
        />

        <div className="mb-4">
          <button
            type="button"
            className="bg-teal-600 text-white w-full py-2 rounded-lg hover:bg-teal-700 transition duration-300"
            onClick={() => {
              setUseCamera((prev) => !prev);
              setCapturedImage(null);
              setFormData((prevData) => ({
                ...prevData,
                photo: null,
              }));
            }}
          >
            {useCamera ? 'Switch to Upload' : 'Use Camera'}
          </button>
        </div>

        {useCamera ? (
          <div className="mb-4">
            {!capturedImage ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                className="w-full h-auto mb-4"
              />
            ) : (
              <img src={capturedImage} alt="Captured" className="w-full h-auto mb-4" />
            )}
            {!capturedImage && (
              <button
                type="button"
                className="bg-teal-600 text-white w-full py-2 rounded-lg hover:bg-teal-700 transition duration-300"
                onClick={handleCapture}
              >
                Capture Photo
              </button>
            )}
          </div>
        ) : (
          <input
            type="file"
            className="mb-4 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
            onChange={handleFileChange}
            required
          />
        )}

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

export default SignupUser;
