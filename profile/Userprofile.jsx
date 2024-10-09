import React, { useEffect, useRef, useState } from 'react'
import './profile.css'
import pic from './pictemp.png'
import html2pdf from 'html2pdf.js';
import Loading from '../src/loading';
import { useDispatch, useSelector } from 'react-redux'
import { profileloader } from '../src/actions/loadprofileAction';

const Userprofile = () => {
  
  
  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(profileloader());
    },[dispatch])

    
    const{  loading, success, error, User, followersCount, followingCount} = useSelector((state)=> state.displayprofile);

    const pdfRef = useRef();

    const downloadPDF = () => {
        const element = pdfRef.current;
        const options = {
            margin: [0.1, 0.1, 0.1, 0.1], // Top, Right, Bottom, Left margins
            filename: `${User.userName}'s-ATS.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
    
        html2pdf()
            .from(element)
            .set(options)
            .save();
    };
    



const [displaypic , setdisplaypic] = useState(pic);

useEffect(() => {
  if (User && User.display_pic && User.display_pic.length > 0) {
    setdisplaypic(User.display_pic);
  } else {
    setdisplaypic(pic);
  }
}, [User]); 



if(!User || loading){
  return <div className=' loadingc'><Loading/>
  <h1>Refresh once</h1></div>
}





  return (
    <>
    <div className='mainco'>
 <div className='upper-stuff'>
     <div className='followers'>
 <h2>{followersCount}</h2>     
<h2>Follwers</h2>
     </div>
     <div className='profilepic'>
<img  className='userpic' src={displaypic} alt='user-profile' />
<h3>{User.userName}</h3>
     </div>
     <div className='following'>
     <h2>{followingCount}</h2>
<h2>Following</h2>
     </div>
 </div>


 <div className='editbloc'>
<h3> <a href='/edit-profile'>Edit profile</a></h3>
<h3> <a href='###'>Posts</a></h3>


 </div>



 <div className='aboutcon'   ref={pdfRef} style={{ padding: '20px', backgroundColor: '#fff', border: '1px solid #ccc' }}>

 <div className="resume">
            <header className="resume-header">
                <h1 >{User.Name}</h1>
                <p>Email: {User.Email}</p>
                <p>Country: {User.country}</p>
                <section className="contacts">
                    <h2>Contacts</h2>
                    <ul>
                        {User.contacts.length > 0 ? (
                            User.contacts.map((contact, index) => (
                                <li key={index} className="contact-item">{contact}</li>
                            ))
                        ) : (
                            <li>No contacts listed.</li>
                        )}
                    </ul>
                </section>
            </header>

            <section className="resume-section">
                <h2>Bio</h2>
                <p>{User.bio}</p>
            </section>

            <section className="resume-section">
                <h2>Education</h2>
                <ul>
                    {User.education.length > 0 ? (
                        User.education.map((edu, index) => <li key={index}>{edu}</li>)
                    ) : (
                        <li>No education listed.</li>
                    )}
                </ul>
            </section>

            <section className="resume-section">
                <h2>Skills</h2>
                <ul>
                    {User.skills.length > 0 ? (
                        User.skills.map((skill, index) => <li key={index}>{skill}</li>)
                    ) : (
                        <li>No skills listed.</li>
                    )}
                </ul>
            </section>

            <section className="resume-section">
                <h2>Projects</h2>
                <ul>
                    {User.projects.length > 0 ? (
                        User.projects.map((project, index) => <li key={index}>{project}</li>)
                    ) : (
                        <li>No projects listed.</li>
                    )}
                </ul>
            </section>

            <section className="resume-section">
                <h2>Achievements</h2>
                <ul>
                    {User.achievments.length > 0 ? (
                        User.achievments.map((achievement, index) => <li key={index}>{achievement}</li>)
                    ) : (
                        <li>No achievements listed.</li>
                    )}
                </ul>
            </section>

            <section className="resume-section">
                <h2>Experience</h2>
                <ul>
                    {User.experience.length > 0 ? (
                        User.experience.map((exp, index) => <li key={index}>{exp}</li>)
                    ) : (
                        <li>No experience listed.</li>
                    )}
                </ul>
            </section>

            <footer className="resume-footer">
                <p>Updated on: {new Date(User.updatedAt).toLocaleDateString()}</p>
                <p>Created on: {new Date(User.createdAt).toLocaleDateString()}</p>
            </footer>
        </div>

 
 </div>

 <button className= "dwnldpdf" onClick={downloadPDF}>Download as PDF</button>
 
    </div>
    
    
    </>
  )
}

export default Userprofile