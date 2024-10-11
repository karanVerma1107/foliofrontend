import React, { useCallback, useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './editprofile.css'
import { CountryDropdown } from 'react-country-region-selector';
import { useAlert } from 'react-alert';
import { clearProfileField, editDp, editObjaction, editstkaction,  profileloader  } from '../src/actions/loadprofileAction.js'
import ReactCrop, { centerCrop }  from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import Cropper from 'react-easy-crop';
import getCroppedImg from './getCropping.js';
import { makeAspectCrop } from 'react-image-crop';




const Editprofile = () => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const ASPECT_RATIO = 1;
  const MIN_DIMENSION = 150;


  const handleClearField = async (field) => {
  
    const result = await clearProfileField(field);
   
    console.log('result is :', result);
   
   location.reload();

   alert.success(`${field} deleted successfully`);
};

 useEffect(()=>{
dispatch(profileloader());
  },[dispatch ])

  const {Isauth, User} = useSelector((state)=> state.displayprofile);
 
  const {Loaading, error, message, success} = useSelector((state)=> state.changedp);
  const {loading , text, errorr, succes} = useSelector((state)=> state.editOBJ);


  

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [src, setSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);



  const handleFileChange = (e) => {
    if (!Isauth) {
      alert.error('kindly check your internet connection or login first to access this resource');
      return;
    }
    const file = e.target.files[0];
    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setSrc(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    try {
      const croppedImage = await getCroppedImg(src, croppedAreaPixels);
      setCroppedImageUrl(croppedImage);
    } catch (error) {
      console.error(error);
    }
  }, [src]);

  const editImgHandler = async (e) => {
    e.preventDefault();
    if (!croppedImageUrl) {
      alert.error("Please crop the image before uploading.");
      return;
    }

    const blob = await fetch(croppedImageUrl).then((r) => r.blob());
    const formData = new FormData();
    formData.append('file', blob, selectedFile.name || 'croppedImage.jpeg');

    dispatch(editDp(formData));
  };



  

 
  
  

 






  const [profileData, setProfileData] = useState({
    country: User?.country ,
    bio:  User?.bio,
    Name: User?.Name,
    phoneNo: User?.phoneNo,
    city: User?.city,

  });

  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountryChange = (country) => {
      setSelectedCountry(country);
      setProfileData({ ...profileData, country });
  };


 

const [stackData, setstackData] = useState({
  "skills": [''], // Initial value as an array with an empty string
  "education": [''],
  "projects": [''],
  "achievments": [''],
  "experience": [''],
  "contacts": [''],
});







{  useEffect(() => {
    // Update profileData when User changes
    if (User) {
      setProfileData({
        country: User.country || '',
        bio: User.bio || '',
        Name: User.Name ,
        phoneNo: User.phoneNo || '',
        city: User.city || '',
      });


      setstackData({
        "skills": User.skills || [''], 
        "education": User.education || [''],
        "projects": User.projects || [''],
        "achievments": User.achievments || [''],
        "experience": User.experience || [''],
        "contacts": User.contacts || [''],
      })
    }
  }, [User]);



 



  const handleobjChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  {/*const handleInputChange = (e, field) => {
    const { value } = e.target;
  
    // Ensure we're always setting it as an array of strings
    if (Array.isArray(stackData[field])) {
      const updatedArray = [...stackData[field]];
      updatedArray[0] = value; // For the sake of simplicity, updating the first entry
      setstackData((prev) => ({
        ...prev,
        [field]: updatedArray,
      }));
    }
  };*/}
  

{/*  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setstackData((prev) => ({
        ...prev,
        [field]: value, // Store the value directly
    }));
};*/}


const handleInputChange = (e, field, index) => {
  const { value } = e.target;
  setstackData((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value; // Update the specific index with new value
      return {
          ...prev,
          [field]: updatedArray,
      };
  });
};


const addStackField = (field) => {
    setstackData((prev) => ({
        ...prev,
        [field]: [...prev[field], ''], // Add an empty string for new entry
    }));
};






  const Handlestksubmit = (e)=>{
    e.preventDefault();

    dispatch(editstkaction(stackData));
  }


  const handleobjhandler = (e)=>{
    e.preventDefault();

      dispatch(editObjaction(profileData)); 
  }


  

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
 <form method='post'  name='uploader'  encType='multipart/form-data'  onSubmit={editImgHandler}  className='form-img'>
<input type="file" name="file" accept="image/*"  className='file-input'  onChange={handleFileChange}/> 

 {src && (
            <div className='image-container'>
            

            
            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
              <Cropper
                image={src}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          


{croppedImageUrl && <img src={croppedImageUrl} alt="Cropped Image"  style={{ maxHeight: '23vmax', width: 'auto', display: 'block', margin: '0 auto' }}  />}

            </div>


          )}


<button type='submit' className='editimgButton'> Upload</button>

</form>
</div>

<h2>Edit your Data</h2>
<div  className='edit-obj'>
<form className='bj-form' onSubmit={handleobjhandler}>
  <div className='form-group'>
    <label htmlFor="country">Country: </label>
    <CountryDropdown
      type="text"
      name="country"
      id="country"
      placeholder="Enter your Country"
      value={profileData.country}
      onChange={handleCountryChange}
      required // Make field required
    />
  </div>

  <div className='form-group'>
    <label htmlFor="city">City: </label>
    <input
      type="text"
      name="city"
      id="city"
      placeholder="Enter your city"
      value={profileData.city}
      onChange={handleobjChange}
      required // Make field required
    />
  </div>
  
  <div className='form-group'>
    <label htmlFor="bio">Bio: </label>
    <input
      type="text"
      name="bio"
      id="bio"
      placeholder="Enter your Bio"
      value={profileData.bio}
      onChange={handleobjChange}
      required // Make field required
    />
  </div>
  
  <div className='form-group'>
    <label htmlFor="name">Name: </label>
    <input
      type="text"
      name="Name"
      id="name"
      placeholder="Enter your full Name"
      value={profileData.Name}
      onChange={handleobjChange}
      required // Make field required
    />
  </div>

  <div className='form-group'>
    <label htmlFor="phoneNo"> Phone number: </label>
    <input
      type="text"
      name="phoneNo"
      id="phoneNo"
      placeholder="Enter your phone number with country code"
      value={profileData.phoneNo}
      onChange={handleobjChange}
      required // Make field required
    />
  </div>

  


  <button type='submit' className='editingButton'>Update</button>
</form>

</div>

<div className='edit-feilds'>
  <h2>Edit your stacks</h2>

  <form className='bj-form' onSubmit={Handlestksubmit}>

    {/* Skills Field */}
    <div className="form-group">
      <label>Skills</label>
      {stackData.skills.map((skill, index) => (
        <div key={index} className="skill-input">
          <textarea
            className="enlarge-input"
            name={`skills-${index}`}
            placeholder="Enter your skill"
            value={skill}
            onChange={(e) => handleInputChange(e, 'skills', index)}
            rows="3"
          />
          
        </div>
      ))}
      <button type="button" className='clearOg' onClick={() => handleClearField(`skills`)}>Clear Skills</button>
      <button type='button' className='clearOg' onClick={() => addStackField('skills')}>Add Another Skill</button>
    </div>

    {/* Education Field */}
    <div className="form-group">
      <label>Education</label>
      {stackData.education.map((edu, index) => (
        <div key={index} className="edu-input">
          <textarea
            className="enlarge-input"
            name={`education-${index}`}
            placeholder="Enter your education"
            value={edu}
            onChange={(e) => handleInputChange(e, 'education', index)}
            rows="3"
          />
          
        </div>
      ))}
      <button type="button" className='clearOg' onClick={() => handleClearField(`education`)}>Clear Education</button>
      <button type='button' className='clearOg' onClick={() => addStackField('education')}>Add Another Education</button>
    </div>

    {/* Projects Field */}
    <div className="form-group">
      <label>Projects</label>
      {stackData.projects.map((project, index) => (
        <div key={index} className="project-input">
          <textarea
            className="enlarge-input"
            name={`projects-${index}`}
            placeholder="Enter your project"
            value={project}
            onChange={(e) => handleInputChange(e, 'projects', index)}
            rows="3"
          />
         
        </div>
      ))}
      <button type="button" className='clearOg' onClick={() => handleClearField(`projects`)}>Clear Projects</button>
      <button type='button' className='clearOg' onClick={() => addStackField('projects')}>Add Another Project</button>
    </div>

    {/* Achievements Field */}
    <div className="form-group">
      <label>Achievements</label>
      {stackData.achievments.map((achievement, index) => (
        <div key={index} className="achievement-input">
          <textarea
            className="enlarge-input"
            name={`achievments-${index}`}
            placeholder="Enter your achievement"
            value={achievement}
            onChange={(e) => handleInputChange(e, 'achievments', index)}
            rows="3"
          />
          
        </div>
      ))}
      <button type="button" className='clearOg' onClick={() => handleClearField(`achievments`)}>Clear Achievement</button>
      <button type='button' className='clearOg' onClick={() => addStackField('achievments')}>Add Another Achievement</button>
    </div>

    {/* Experience Field */}
    <div className="form-group">
      <label>Experience / Internship</label>
      {stackData.experience.map((exp, index) => (
        <div key={index} className="experience-input">
          <textarea
            className="enlarge-input"
            name={`experience-${index}`}
            placeholder="Enter your experience"
            value={exp}
            onChange={(e) => handleInputChange(e, 'experience', index)}
            rows="3"
          />
         
        </div>
      ))}
      <button type="button" className='clearOg' onClick={() => handleClearField(`experience`)}>Clear Experience</button>
      <button type='button' className='clearOg' onClick={() => addStackField('experience')}>Add Another Experience</button>
    </div>

    {/* Contacts Field */}
    
    <button type='submit' className='editingButton'>Update Profile</button>
  </form>
</div>


    </div>
    
    </>
  )
}}

export default Editprofile