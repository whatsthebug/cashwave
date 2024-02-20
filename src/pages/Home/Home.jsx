import React, { useEffect } from 'react';
import Logo from '../../image/Home.png';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Create a separate CSS file for styling

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }, [navigate]);

  return (
    <div className='w-full h-[100vh] bg-blue fixed'>
      <div className="flex flex-col w-full h-full md:justify-center justify-start items-center relative">
        <img src={Logo} className='w-[300px] md:w-[750px] top-1/4 absolute fade-in' alt="cashwave" />
      </div>
      <div className='flex w-full justify-center items-center md:bottom-[40px] bottom-[200px] absolute text-white'>
      © 2023 Copyright Storelink
      </div>
    </div>
  );
};

export default Home;
