import React, { useEffect, useRef, useState } from 'react'
import './profile2.css'
import pic from './pictemp.png'
import html2pdf from 'html2pdf.js';
import Metadata from '../metadata';
import Loading from '../src/loading';
import { useDispatch, useSelector } from 'react-redux'
import { logout, profileloader } from '../src/actions/loadprofileAction';
import { useNavigate } from 'react-router-dom';
import Post from '../src/postsshow/post';
import { getUserPost } from '../src/actions/postsaction';

const Userprofile = () => {
  
    const{  loading, success, error, User, followersCount, followingCount, Isauth} = useSelector((state)=> state.displayprofile);
  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(profileloader());
    },[dispatch])

    
    
    const pdfRef = useRef(null);
const navigate = useNavigate();
    

    const adjustFontSize = () => {
        const resume = document.querySelector('.resume');
        const sections = resume.querySelectorAll('.resume-section');
        
        // Calculate total height
        const totalHeight = Array.from(sections).reduce((acc, section) => acc + section.scrollHeight, 0);
        
        // Adjust font size if total height exceeds a threshold
        if (totalHeight > 1000) { // Adjust this threshold as needed
            sections.forEach(section => {
                const heading = section.querySelector('h2');
                const items = section.querySelectorAll('li');
                const currentFontSize = parseFloat(getComputedStyle(heading).fontSize);
                
                // Reduce font size
                heading.style.fontSize = `${currentFontSize * 0.7}px`;
                items.forEach(item => {
                    item.style.fontSize = `${currentFontSize * 0.7}px`;
                });
            });
        }
    };
    
    // Call this function before generating the PDF
    const downloadPDF = () => {
        adjustFontSize(); // Adjust font size based on content
        const element = pdfRef.current;
        const options = {
            margin: [0.1, 0.1, 0.1, 0.1],
            filename: `${User.userName}'s-ATS.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
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





const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
    logout();
    navigate('/')
    // For example, redirecting to the login page
    // history.push('/login');
};


const [activePostId, setActivePostId] = useState(null);

const [showPosts, setShowPosts] = useState(false);

const { posts = [] } = useSelector(state => state.userPost);

const handlePostShow = () => {
    if (User) {
        dispatch(getUserPost(User._id));
        console.log('User ID is', User._id);
    }
};

const handlePostClick = (postId) => {
    setActivePostId(prevPostId => (prevPostId === postId ? null : postId));
};




const togglePosts = () => {
    setShowPosts(prevShowPosts => !prevShowPosts); // Toggle the visibility of posts
    handlePostShow(); // Fetch posts when toggled
};

if (loading || !User) {
    return (
        <div className='loadingc'>
            <Loading />
            <h1>Refresh once</h1>
        </div>
    );
}


  return (

    <>
   {User && User.userName && (
        <Metadata title={`${User.userName}'s Profile`} />
      )}
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
<h3  onClick={togglePosts}  style={{cursor: "pointer"}}>  {showPosts ? 'Hide Posts' : 'Show Posts'}</h3>


 </div>



 {showPosts && ( // Render posts only if showPosts is true
                        <div className='contentt'>
                            <div className='post-container'>
                                {posts.map((post) => (
                                    <li key={post._id}>
                                        <Post post={post} Isauth={Isauth} User={User}
                                            showComments={activePostId === post._id}
                                            onPostClick={handlePostClick} />
                                    </li>
                                ))}
                            </div>
                        </div>
                    )}



<div className='aboutcon' ref={pdfRef} style={{ padding: '20px', backgroundColor: '#fff', border: '1px solid #ccc' }}>
    <div className="resume">
        <header className="resume-header">
            <h1>{User.Name}</h1>
            <p>Email: {User.Email}</p>
            <p>Phone: {User.phoneNo}</p>
            <p>Location: {User.city}, {User.country}</p>
        </header>

        <section className="resume-section">
            <h2 className='sub'>Professional Summary</h2>
            <p>{User.bio}</p>
        </section>

        
        <section className="resume-section">
            <h2 className='sub'>Skills</h2>
            <ul>
                {User.skills.length > 0 ? (
                    User.skills.map((skill, index) => <li key={index}><span>.</span>{skill}</li>)
                ) : (
                    <li>No skills listed.</li>
                )}
            </ul>
        </section>

        <section className="resume-section">
            <h2 className='sub'>Work Experience</h2>
            <ul>
                {User.experience.length > 0 ? (
                    User.experience.map((exp, index) => <li key={index}><span>.</span>{exp}</li>)
                ) : (
                    <li>No experience listed.</li>
                )}
            </ul>
        </section>

        <section className="resume-section">
            <h2 className='sub'>Education</h2>
            <ul>
                {User.education.length > 0 ? (
                    User.education.map((edu, index) => <li key={index}><span>.</span>{edu}</li>)
                ) : (
                    <li>No education listed.</li>
                )}
            </ul>
        </section>

       

        <section className="resume-section">
            <h2 className='sub'>Achievements</h2>
            <ul>
                {User.achievments.length > 0 ? (
                    User.achievments.map((achievement, index) => <li key={index}><span>.</span>{achievement}</li>)
                ) : (
                    <li>No achievements listed.</li>
                )}
            </ul>
        </section>


        <section className="resume-section">
            <h2 className='sub'>Projects</h2>
            <ul>
                {User.projects.length > 0 ? (
                    User.projects.map((project, index) => <li key={index}><span>.</span>{project}</li>)
                ) : (
                    <li>No projects listed.</li>
                )}
            </ul>
        </section>

        
    </div>
</div>



 <button className= "dltbtn" onClick={downloadPDF}>Download as PDF</button>
    
 <button className="logoutbtn" onClick={handleLogout}>Logout</button>
    </div>
 
    </>

           
  )
}

export default Userprofile