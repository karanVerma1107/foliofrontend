import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './editprofile.css'

import { useAlert } from 'react-alert';
import { editDp, editObjaction, profileloader } from '../src/actions/loadprofileAction';

const Editprofile = () => {

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(()=>{
dispatch(profileloader());
  },[dispatch])

  const {Isauth} = useSelector((state)=> state.displayprofile);

 

  const {Loaading, error, message, success} = useSelector((state)=> state.changedp);
  const {loading , text, errorr, succes} = useSelector((state)=> state.editOBJ);


  const [selectedFile, setSelectedFile] = useState(null);
  const [profileData, setProfileData] = useState({
    country: '',
    bio: '',
    Name: '',
  });

  const handleobjChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleobjhandler = (e)=>{
    e.preventDefault();

      dispatch(editObjaction(profileData)); 
  }


  const handleFileChange = (e) => {
   if(!Isauth){
    alert.error('kindly check your internet connection or login first to access this resource');
   }
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

if(succes){
  alert.success(text);
}

if(error){
  alert.error(error)
}

if(errorr){
  alert.error(errorr)
}

},[success, succes, error, errorr])

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

<h3>Edit your Data</h3>
<div  className='edit-obj'>
<form className='bj-form' onSubmit={handleobjhandler}>
<input
          type="text"
          name="country"
          placeholder=" enter your Country"
          value={profileData.country}
          onChange={handleobjChange}
          required // Make field required
        />
        <input
          type="text"
          name="bio"
          placeholder="enter your Bio"
          value={profileData.bio}
          onChange={handleobjChange}
          required // Make field required
        />
        <input
          type="text"
          name="Name"
          placeholder="enter your full Name"
          value={profileData.name}
          onChange={handleobjChange}
          required // Make field required
        />

<button type='submit' className='editimgButton'> Update</button>

</form>

</div>



    </div>
    
    </>
  )
}

export default Editprofile