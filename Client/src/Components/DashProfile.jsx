/* eslint-disable no-unused-vars */

import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'; 
import { app } from './../firebase';
import { toast } from 'react-toastify';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const DashProfile = () => {
    const {currentUser}= useSelector(state=>state.user)
  
    const [imagefile, setImageFile]=useState(null)
    const [imageFileUrl, setImageFileUrl]=useState(null)
    const filePickerRef = useRef()
    const [imageFileUploadProgress,setImageFileUploadProgress ]= useState(null)
    const [imageFileUploadError,setImageFileUploadError ]= useState(null)
    console.log(imageFileUploadProgress, imageFileUploadError);
    // image change 
    const handleImageChange =(e)=>{
       const file =e.target.files[0];

       if(file){
        setImageFile(file)
        setImageFileUrl(URL.createObjectURL(file))
       }
    }

    useEffect(()=>{
        if(imagefile){
            uploadImage()
        }
    },[imagefile])

    const uploadImage = async()=>{
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read;
        //         allow write: if 
        //         request.resource.size < 2 * 1024 * 1024 &&
        //         request.resource.contentType.matches('image/*')
        //       }
        //     }
        //   }
        // setImageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName =new Date().getTime() + imagefile.name;
        const storageRef =ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef, imagefile);

        uploadTask.on(
            'state_changed',
            (snapshot)=>{
              const progress =(
                snapshot.bytesTransferred / snapshot.totalBytes
              ) * 100 ;
              setImageFileUploadProgress(progress.toFixed(0))
            },
            (error)=>{
                setImageFileUploadError(
                    'File must be less than 2MB.'
                  );
                  setImageFileUploadProgress(null);
                  setImageFile(null);
                  setImageFileUrl(null);
                //   setImageFileUploading(false);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setImageFileUrl(downloadURL)
              toast.success('Image uploaded successfully!')
             })
            }
        )

    }
   
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-bold text-3xl'>{currentUser.username}</h1>
       <form  className='flex flex-col gap-4'>
        {/* image file upload */}
        <input type="file" accept='image/*'
        ref={filePickerRef}
        hidden
        onChange={handleImageChange}
        />
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
        onClick={()=>filePickerRef.current.click()}
        >
            {/* progress  */}
            {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
            {/* profile image */}
        <img src={imageFileUrl|| currentUser.profilePicture} 
           alt='user_image'  className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
            imageFileUploadProgress &&
            imageFileUploadProgress < 100 &&
            'opacity-60'
          }`} />
        </div>
        {imageFileUploadError && <Alert
        color='failure'
        >
            {imageFileUploadError}
            </Alert>}
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