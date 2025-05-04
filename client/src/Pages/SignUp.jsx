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
    
    <div className="min-h-screen mt-8">
           
      
      <div className='flex px-8 md:px-44 mx-auto flex-col md:flex-row md:items-center'>
          {/* left side */}
      <div className="flex-1 w-[350px] h-[300px] sm:w-[300px] sm:h-[300px] md:w-[600px] md:h-[600px]">
      <Lottie animationData={animationData} 
       loop={true} 
       autoplay={true} 
       
      />
      </div>
      {/* right side */}
        <div className='flex-1'>
        <p className='text-5xl font-bold text-center mb-12 '>Signup Your Account</p>
             <form
             onSubmit={handleSubmit}
             className='flex flex-col gap-4'> 
                <div>
                   <Label value='Your username'/>
                   <TextInput type='text'placeholder='username'id='username' onChange={handleChange}/>
                </div>
                <div>
                   <Label value='Your Email'/>
                   <TextInput type='text'placeholder='name@company.com'id='email' onChange={handleChange}/>
                </div>
                <div>
                   <Label value='Your Password'/>
                   <TextInput type='text' placeholder='**********' id='password' onChange={handleChange}/>
                </div>
                   <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                      {
                        loading ? (<>
                        <Spinner size='sm'/>
                        <span className='pl-3'>Loading...</span>
                        </>):"Sign up"
                      } 
                   </Button>
             </form>
             <div className='mt-2'>
                <span>Have an account? 

                    <Link to='/sign-in' className='text-blue-500 font-semibold ml-3'>Sign in</Link>
                </span>
             </div>
            {
                errorMessage && (
                    <Alert className='mt-5' color='failure'>
                        {errorMessage}
                    </Alert>
                )
            }
        </div>
      </div>
    </div>
  
  )
}

export default SignUp