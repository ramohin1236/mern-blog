import Lottie from 'lottie-react';
import animationData from '../../public/Animation - 1722617050706.json';
import {Button, Label, TextInput} from "flowbite-react"
import { Link } from 'react-router-dom';
const SignUp = () => {
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
             <form className='flex flex-col gap-4'> 
                <div>
                <Label value='Your username'/>
                 <TextInput 
                 type='text'
                 placeholder='username'
                 id='username'
                 />
                </div>
                <div>
                <Label value='Your Email'/>
                 <TextInput 
                 type='text'
                 placeholder='name@company.com'
                 id='email'
                 />
                </div>
                <div>
                <Label value='Your Password'/>
                 <TextInput 
                 type='text'
                 placeholder='**********'
                 id='password'
                 />
                </div>
                <Button gradientDuoTone='purpleToPink' type='submit'>
                    Sign up
                </Button>
             </form>
             <div className='mt-2'>
                <span>Have an account? 

                    <Link to='sign-in' className='text-blue-500 font-semibold ml-3'>Sign in</Link>
                </span>
             </div>
        </div>
      </div>
    </div>
  
  )
}

export default SignUp