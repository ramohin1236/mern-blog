
import { Button, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';
const DashProfile = () => {
    const {currentUser}= useSelector(state=>state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-bold text-3xl'>{currentUser.username}</h1>
       <form  className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
        <img src={currentUser.profilePicture} 
           alt='user_image'className='rounded-full w-full h-full border-8 object-cover  border-[lightgray]' />
        </div>
        {/* user name */}
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
        
        />
        {/* user email */}
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
         
        />
        {/* user password */}
        <TextInput
          type='password'
          id='password'
          placeholder='************'
         
        />

<Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
        //   disabled={loading || imageFileUploading}
        >
          {/* {loading ? 'Loading...' : 'Update'} */}
          submit
        </Button>
       </form>
       <div>
       <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
       </div>
    </div>
  )
}

export default DashProfile