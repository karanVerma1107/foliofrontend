import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './editprofile.css'
import { CountryDropdown } from 'react-country-region-selector';
import { useAlert } from 'react-alert';
import { editDp, editObjaction, editstkaction, profileloader } from '../src/actions/loadprofileAction';

const Editprofile = () => {

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(()=>{
dispatch(profileloader());
  },[dispatch])

  const {Isauth, User} = useSelector((state)=> state.displayprofile);

 
  const {Loaading, error, message, success} = useSelector((state)=> state.changedp);
  const {loading , text, errorr, succes} = useSelector((state)=> state.editOBJ);


  

  const [selectedFile, setSelectedFile] = useState(null);
  const [profileData, setProfileData] = useState({
    country: User?.country ,
    bio:  User?.bio,
    Name: User?.Name,
  });

  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountryChange = (country) => {
      setSelectedCountry(country);
      setProfileData({ ...profileData, country });
  };


  const [stackData, setstackData] = useState({
    skills:  [], // Set initial value or empty string
    education:  [] ,
    projects:  [],
    achievments:  [],
    experience:  [],
    contacts:  [],
});



  useEffect(() => {
    // Update profileData when User changes
    if (User) {
      setProfileData({
        country: User.country || '',
        bio: User.bio || '',
        Name: User.Name ,
      });


      setstackData({
        skills: User.skills || [], 
        education: User.education || [],
        projects: User.projects || [],
        achievments: User.achievments || [],
        experience: User.experience || [],
        contacts: User.contacts || [],
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



  const handleInputChange = (e, field) => {
    const { value } = e.target;
    const newArray = value.split(',').map(item => item.trim()); // Split by comma and trim spaces
    setstackData((prev) => ({
        ...prev,
        [field]: newArray,
    }));
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

  <button type='submit' className='editingButton'>Update</button>
</form>

</div>

<div className='edit-feilds'>
  <h2>Edit your stacks</h2>
  <form className='bj-form' onSubmit={Handlestksubmit}>

<div className="form-group">
    <label>Skills</label>
    <textarea
        className="enlarge-input"
        name="skills"
        placeholder="Enter your skills (comma-separated)"
        value={Array.isArray(stackData.skills) ? stackData.skills.join(', ') : ''} // Safe check
        onChange={(e) => handleInputChange(e, 'skills')}
        rows="3"
    />
</div>

<div className="form-group">
    <label>Education</label>
    <textarea
        className="enlarge-input"
        name="education"
        placeholder="Enter your education (comma-separated)"
        value={Array.isArray(stackData.education) ? stackData.education.join(', ') : ''} // Safe check
        onChange={(e) => handleInputChange(e, 'education')}
        rows="3"
    />
</div>

<div className="form-group">
    <label>Projects</label>
    <textarea
        className="enlarge-input"
        name="projects"
        placeholder="Enter your projects (comma-separated)"
        value={Array.isArray(stackData.projects) ? stackData.projects.join(', ') : ''} // Safe check
        onChange={(e) => handleInputChange(e, 'projects')}
        rows="3"
    />
</div>

<div className="form-group">
    <label>Achievements</label>
    <textarea
        className="enlarge-input"
        name="achievments"
        placeholder="Enter your achievements (comma-separated)"
        value={Array.isArray(stackData.achievements) ? stackData.achievments.join(', ') : ''} // Safe check
        onChange={(e) => handleInputChange(e, 'achievements')}
        rows="3"
    />
</div>

<div className="form-group">
    <label>Experience</label>
    <textarea
        className="enlarge-input"
        name="experience"
        placeholder="Enter your experience (comma-separated)"
        value={Array.isArray(stackData.experience) ? stackData.experience.join(', ') : ''} // Safe check
        onChange={(e) => handleInputChange(e, 'experience')}
        rows="3"
    />
</div>

<div className="form-group">
    <label>Contacts</label>
    <textarea
        className="enlarge-input"
        name="contacts"
        placeholder="Enter your contacts (comma-separated)"
        value={Array.isArray(stackData.contacts) ? stackData.contacts.join(', ') : ''} // Safe check
        onChange={(e) => handleInputChange(e, 'contacts')}
        rows="3"
    />
</div>

<button type='submit' className='editingButton'>Update Profile</button>
</form>



</div>



    </div>
    
    </>
  )
}

export default Editprofile