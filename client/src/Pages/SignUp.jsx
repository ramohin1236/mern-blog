import Lottie from 'lottie-react';
import animationData from '../../public/Animation - 1722617050706.json';
import {Alert, Button, Label, Spinner, TextInput} from "flowbite-react"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = () => {

   const [formData, setFormData]=useState({});
   const [errorMessage,setErrorMessage]=useState(null);
   const [loading,setLoading]=useState(false);
   const navigate =useNavigate()
//   onchange function------------ 
// trim is remove space in input
    const handleChange =(e)=>{
        
        setFormData({...formData, [e.target.id]: e.target.value.trim()})
    }
// submit and signup successfull----------------
    const handleSubmit =async(e)=>{
        e.preventDefault()
        if(!formData.username || !formData.email || !formData.password){
            return setErrorMessage('Please fill out all fields.')
        }
        try {
            setLoading(true)
            setErrorMessage(null)
            const res = await axios.post('/api/auth/signup', formData);
            if(res.status ===200 || res.ok){
                toast.success("Sign-up successfully!", {
                    autoClose: 1000})
                navigate('/sign-in')
            }
            setLoading(false)
          }
          
          catch (error) {
            setErrorMessage("Duplicate name or email field!");
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
                  <h1 className="text-4xl font-bold text-center mb-8 text-teal-500">Create Account</h1>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label value='Username' htmlFor='username' />
                      <div className="relative">
                        <TextInput 
                          type='text'
                          placeholder='Enter your username'
                          id='username' 
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
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
                          <span className='pl-3'>Creating Account...</span>
                        </>
                      ) : "Create Account"}
                    </Button>
                  </form>
  
                  <div className="mt-6 text-center">
                    <p className="text-gray-600">
                      Already have an account?{' '}
                      <Link 
                        to='/sign-in' 
                        className='text-teal-500 hover:text-teal-700 transition-colors'
                      >
                        Sign in
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

export default SignUp