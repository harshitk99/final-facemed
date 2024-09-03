import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const ProfessionalDashboard = () => {
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useCamera, setUseCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCapturedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleScan = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/scan', { image: capturedImage });
      setResultData(response.data);
    } catch (error) {
      console.error('Error scanning image', error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-100 to-teal-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-md">
        <h2 className="text-3xl mb-6 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
          Medical Professional Dashboard
        </h2>

        <div className="mb-6">
          <button
            className="bg-gradient-to-r from-teal-500 to-teal-700 text-white w-full py-2 rounded-lg shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-800 transition duration-300 font-semibold"
            onClick={() => {
              setUseCamera(!useCamera);
              setCapturedImage(null);
            }}
          >
            {useCamera ? 'Switch to Upload' : 'Use Camera'}
          </button>
        </div>

        {useCamera ? (
          <div className="mb-6">
            {!capturedImage ? (
              <div className="relative">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  className="w-full h-auto mb-4 rounded-lg border border-teal-300"
                />
                <button
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-teal-700 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-800 transition duration-300 font-semibold"
                  onClick={handleCapture}
                >
                  Capture Photo
                </button>
              </div>
            ) : (
              <img src={capturedImage} alt="Captured" className="w-full h-auto mb-4 rounded-lg border border-teal-300" />
            )}
          </div>
        ) : (
          <input
            type="file"
            className="mb-6 w-full p-3 border border-teal-300 rounded-lg text-teal-700"
            onChange={handleFileChange}
            required
          />
        )}

        {capturedImage && !useCamera && (
          <div className="mb-6">
            <h3 className="text-lg mb-2 text-teal-800 font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
              Captured Image:
            </h3>
            <img src={capturedImage} alt="Captured" className="w-full h-auto mb-4 rounded-lg border border-teal-300" />
          </div>
        )}

        <button
          className="bg-gradient-to-r from-teal-500 to-teal-700 text-white w-full py-2 rounded-lg shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-800 transition duration-300 font-semibold"
          onClick={handleScan}
          disabled={loading}
        >
          {loading ? 'Scanning...' : 'Scan and Retrieve Data'}
        </button>

        {resultData && (
          <div className="mt-6">
            <h3 className="text-lg mb-2 text-teal-800 font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
              Patient Information:
            </h3>
            <p><strong>Name:</strong> {resultData.name}</p>
            <p><strong>Aadhaar Number:</strong> {resultData.aadharNumber}</p>
            <p><strong>Emergency Contact:</strong> {resultData.emergencyContact}</p>
            <p><strong>Blood Group:</strong> {resultData.bloodGroup}</p>
            <p><strong>Allergies:</strong> {resultData.allergies}</p>
            <p><strong>Past Surgery:</strong> {resultData.pastSurgery}</p>
            <p><strong>Other Medical Conditions:</strong> {resultData.otherMedicalConditions}</p>
          </div>
        )}

        <button
          className="bg-gradient-to-r from-red-500 to-red-700 text-white w-full py-2 mt-4 rounded-lg shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-800 transition duration-300 font-semibold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
