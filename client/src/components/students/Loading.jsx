import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const Loading = () => {

  const {path}=useParams()
  const navigate=useNavigate()

  useEffect(()=>{
    if(path){
      const timer=setTimeout(()=>{
        navigate(`/${path}`)
      },5000)
      return ()=>clearTimeout(timer);
    }
  },[])
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0E1116]">
  <div className="flex flex-col items-center space-y-4">
    <div className="w-12 h-12 border-4 border-[#00C6FF] border-t-transparent rounded-full animate-spin"></div>
    <p className="text-[#B0BEC5] text-lg font-medium">Loading, please wait...</p>
  </div>
</div>

  );
};

export default Loading;
