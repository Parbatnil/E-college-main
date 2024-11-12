import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import Navbar from '../../Navbar';

const App = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (credentials) => {
    setShowLogin(false);
    // Handle login here
  };

  const handleSignUp = (data) => {
    console.log('Sign up attempt:', data);
    // Handle sign-up here
  };

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      {showLogin ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <SignUp handleSignUp={handleSignUp} />
      )}
      {/* <button
        onClick={() => setShowLogin(!showLogin)}
        className="mb-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {showLogin ? 'Go to Sign Up' : 'Go to Login'}
      </button> */}
    </div>
    </div>
  );
};

export default App;
