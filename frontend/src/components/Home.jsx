import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  const handleUseItClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-teal-100 to-teal-200">
      <header className="flex items-center justify-between p-6 bg-white shadow-md">
        <div className="text-2xl font-bold text-teal-800">FaceMed</div>
        <nav className="space-x-4">
          {/* Navigation items if needed */}
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 p-4 text-center">
        <motion.h1
          className="text-4xl font-bold text-teal-800 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Your Medical History at Your Fingertips
        </motion.h1>
        <motion.p
          className="text-lg text-teal-600 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          Scan your face and instantly access your medical records.
        </motion.p>
        <motion.button
          className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-teal-700 transition duration-300"
          onClick={handleUseItClick}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          Use It
        </motion.button>
      </main>
    </div>
  );
};

export default Home;
