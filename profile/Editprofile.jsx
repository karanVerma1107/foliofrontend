import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './editprofile.css'

import { useAlert } from 'react-alert';
import { editDp, profileloader } from '../src/actions/loadprofileAction';

const Editprofile = () => {

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(()=>{
dispatch(profileloader());
  },[dispatch])

  const {Loaading, error, message, success} = useSelector((state)=> state.changedp);



  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
   
    setSelectedFile(e.target.files[0]);
    }




    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
  

    const editimgHandler = async (e) => {
      e.preventDefault(); // Prevent default form submission
      if (!selectedFile) {
        alert.error("Please select a file.");
        return;
      }
  
      const base64String = await convertToBase64(selectedFile);
      console.log(base64String); // This is the base64 string, if you need it
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      dispatch(editDp(formData));
    };

useEffect(()=>{


if(success){
alert.success(message);
}
},[success])

  return (
    <>
    <div className='mwork'>
      <h3>Change your Display picture</h3>
<div className='dpchange'>
 <form method='post'  name='uploader'  encType='multipart/form-data'  onSubmit={editimgHandler}  className='form-img'>
<input type="file" name="file" accept="image/*"  className='file-input'  onChange={handleFileChange}/> 
<button type='submit' className='editimgButton'> Upload</button>
</form>
</div>
    </div>
    
    </>
  )
}

export default Editprofile