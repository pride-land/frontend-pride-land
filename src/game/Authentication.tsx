import React, { useState, useEffect } from 'react';
import { logIn, signUp } from './auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { signInWithPopup } from "firebase/auth";
import { provider } from "../firebase.ts";
import { FcGoogle } from "react-icons/fc";

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpUser, setSignUpUser] = useState(true);
  const [open, setOpen] = useState(true)
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (signUpUser) {
      await signUp(email, password);
    } else {
      await logIn(email, password);
    }
  };

//   Signing in with Google using Popup
  const signInWithGooglePopup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      return response;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };
  console.log(user)
  return (
   <>
  <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
    <DialogBackdrop
      transition
      className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 
      data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>

    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
    <DialogPanel
      transition
      className="relative transform pr-3 overflow-hidden rounded-md bg-white shadow-xl transition-all 
      data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 
      data-[enter]:ease-out data-[leave]:ease-in  data-[closed]:sm:translate-y-0 
      data-[closed]:sm:scale-95">

  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
    <div className="sm:flex sm:items-start">
      <div className="mt-3 text-center sm:ml-4 sm:mt-0">
        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
        <h1 className='text-center'>{signUpUser ? 'Sign Up' : 'Login'}</h1>
        </DialogTitle>
            <div>
              <div className='p-2'>
              <form onSubmit={handleSubmit}>
              <div className='text-left w-[15rem]'>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm
                         focus:ring-green-300 focus:border-green-300 sm:text-sm"/>
              </div>
              <div className='text-left w-[15rem]'>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm
                         focus:ring-green-300 focus:border-green-300 sm:text-sm"/>
              </div>
                <button className="w-[12rem] mt-3 px-4 py-2 bg-gradient-to-r from-green-300 via-green-400
                     to-green-500 text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105 
                     hover:shadow-lg   sm:text-sm" type="submit">{signUpUser ? 'Sign Up' : 'Login'}</button>
              </form>
                <button className='mb-3 mt-1 text-gray-400' onClick={() => setSignUpUser(!signUpUser)}>
                   Switch to {signUpUser ? 'Login' : 'Sign Up'}
                </button>  
              <div>
              <button className='mb-3 ' onClick={()=> setOpen(false)}>Continue as guest</button><br/>
                <div className='flex justify-center'>
                <button className="mt-3 flex hover:bg-gray-200 border-width:1px bg-gray-300 p-2 rounded-md " onClick={signInWithGooglePopup}> <FcGoogle className='h-6 mr-2'/>Sign in With Google </button>
                </div><br/>
              </div>
              </div>           
            </div>
          </div>
        </div>
      </div>
      </DialogPanel>
        </div>
      </div>
    </Dialog>
  </>
  );
};

export default Auth;
