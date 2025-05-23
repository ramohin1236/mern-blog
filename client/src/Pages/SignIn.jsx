/* eslint-disable react/no-unescaped-entities */
import Lottie from 'lottie-react';
import animationData from '../../public/Animation - 1722617050706.json';
import {Alert, Button, Label, Spinner, TextInput} from "flowbite-react"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useDispatch,useSelector} from 'react-redux';
import { signInStart,signInFailure,signInSuccess} from '../redux/user/userSlice';
import OAuth from '../Components/OAuth';

const SignIn = () => {

    const [formData, setFormData]=useState({});
  const {loading, error:errorMessage} =useSelector(state=>state.user)
    const dispatch = useDispatch();
    const navigate =useNavigate();
 //   onchange function------------ 
 // trim is remove space in input
     const handleChange =(e)=>{
         
         setFormData({...formData, [e.target.id]: e.target.value.trim()})
     }
 // submit and signup successfull----------------
     const handleSubmit =async(e)=>{
         e.preventDefault()
         if(!formData.email || !formData.password){
             return dispatch(signInFailure('Please fill out all fields.'));
         }
         try {
            //  setLoading(true)
            //  setErrorMessage(null)
            dispatch(signInStart());
             const res = await axios.post('/api/auth/signin', formData);
             if(res.status ===200 || res.ok){
                dispatch(signInSuccess(res.data))
                 toast.success("Sign-in successfully!", {
                    autoClose: 1000})
                 navigate('/')
             }
            
       
           }
           
           catch (error) {
            dispatch(signInFailure(error.message))
           }
     }
     
     return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-8">
              
              {/* Right side - Form */}
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h1 className="text-4xl font-bold text-center mb-8 text-teal-500">Welcome Back</h1>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label value='Email Address' htmlFor='email' />
                      <div className="relative">
                        <TextInput 
                          type='email'
                          placeholder='name@company.com'
                          id='email' 
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label value='Password' htmlFor='password' />
                      <div className="relative">
                        <TextInput 
                          type='password'
                          placeholder='**********'
                          id='password' 
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <Button 
               
                      type='submit' 
                      disabled={loading}
                      className="w-full bg-teal-500 text-white 
                  px-6  rounded-xl hover:bg-teal-600 
                  transition-colors"
                    >
                      {loading ? (
                        <>
                          <Spinner size='sm'/>
                          <span className='pl-3'>Signing In...</span>
                        </>
                      ) : "Sign In"}
                    </Button>
                  </form>
  
                  {/* OAuth Section */}
                  <div className="mt-8 ">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    
                    <div className= ' flex justify-center mt-8'>
                        <OAuth />
                    </div>
                  </div>
  
                  <div className="mt-6 text-center">
                    <p className="text-gray-600">
                      Don't have an account?{' '}
                      <Link 
                        to='/sign-up' 
                        className='text-teal-500 hover:text-teal-700 transition-colors'
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
  
                  {errorMessage && (
                    <Alert className="mt-4" color='failure' rounded>
                      {errorMessage}
                    </Alert>
                  )}
                </div>
              </div>
            </div>
  
          </div>
        </div>
      </div>
    )
}

export default SignIn