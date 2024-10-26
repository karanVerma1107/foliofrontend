{/*





import React, { useEffect, useRef, useState } from 'react'
import './profile.css'
import pic from './pictemp.png'
import html2pdf from 'html2pdf.js';
import Metadata from '../metadata';
import Loading from '../src/loading';
import { useDispatch, useSelector } from 'react-redux'
import { logout, profileloader } from '../src/actions/loadprofileAction';
import { useNavigate } from 'react-router-dom';
import Post from '../src/postsshow/post';
import { Getfollowers, getFollowing } from '../src/actions/folllowAction';
import { getUserPost } from '../src/actions/postsaction';

const Userprofile = () => {
  
    const{  loading, success, User, followersCount, followingCount, Isauth} = useSelector((state)=> state.displayprofile);
    
    const { followers,
        following ,
        loadingFollowers,
        loadingFollowing,
        error} = useSelector(state=> state.getconnection)



  
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
    
    const downloadPDF = () => {
        adjustFontSize(); // Adjust font size based on content
        const element = pdfRef.current;
    
        const options = {
            margin: [0.1, 0.1, 0.1, 0.1], // Adjust margins as needed
            filename: `${User.userName}'s-ATS.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
    
        // Calculate total height and adjust if necessary
        const totalHeight = element.scrollHeight;
        const maxHeight = 11.7 * 72; // A4 height in points
    
        if (totalHeight > maxHeight) {
            // You can adjust this font size reduction logic as needed
            const sections = element.querySelectorAll('.resume-section');
            sections.forEach(section => {
                const heading = section.querySelector('h2');
                const items = section.querySelectorAll('li');
                const currentFontSize = parseFloat(getComputedStyle(heading).fontSize);
                
                // Reduce font size
                heading.style.fontSize = `${currentFontSize * 1}px`;
                items.forEach(item => {
                    item.style.fontSize = `${currentFontSize *  0.9}px`;
                });
            });
        }
    
        html2pdf()
            .from(element)
            .set(options)
            .save();
    };




const [displaypic , setdisplaypic] = useState(pic);



const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const [modalData, setModalData] = useState([]);




    const handleModalOpen = (content) => {

        if (content === 'Followers' && User) {
            dispatch(Getfollowers(User._id)); // Call the action with User._id
            //setModalData(followers);
        }

        if(content == 'Following' && User){
            dispatch(getFollowing(User._id));
           // setModalData(following);
        }

        setModalContent(content);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };



    useEffect(() => {
        if (modalContent === 'Followers') {
            setModalData(followers);
        } else if (modalContent === 'Following') {
            setModalData(following);
        }
    }, [followers, following, modalContent]);







useEffect(() => {
  if (User && User.display_pic && User.display_pic.length > 0) {
    setdisplaypic(User.display_pic);
  } else {
    setdisplaypic(pic);
  }

   

}, [User]); 


const isSmallScreen = window.innerWidth <= 700; // Check if the screen is small

    const fontSize = isSmallScreen ? "1.5vmax" : "1vmax"


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
    <div className='profile-header'>
                        <div className='followers-info'   onClick={() => handleModalOpen('Followers')}    style={{cursor: "pointer"}}>
                            <h2>{followersCount}</h2>
                            <h3>Followers</h3>
                        </div>
                        <div className='profile-picture'>
                            <img className='user-image' src={User.display_pic || 'default-pic.png'} alt='User profile' style={{ width: '9vmax', height: '9vmax' , borderRadius: "50%" , border: "1px solid white"}} />
                            <h2 className='username'>{User.userName}</h2>
                        </div>
                        <div className='following-info'   onClick={() => handleModalOpen('Following')}  style={{cursor: "pointer"}}>
                            <h2>{followingCount}</h2>
                            <h3>Following</h3>
                        </div>


                        {modalVisible && (
                        <div className="modal" onClick={handleModalClose}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <button className="close-button" onClick={handleModalClose}>×</button>
                                <h2>{modalContent}</h2>
                                {modalContent === 'Followers' && loadingFollowers ? (
                                    <p>Loading followers...</p>
                                ) : modalContent === 'Following' && loadingFollowing ? (
                                    <p>Loading following...</p>
                                ) : (
                                    <ul>
                                        {modalData.length > 0 ? modalData.map((user) => (
                                            <li key={user._id}>
                                                <img src={user.display_pic} alt={user.userName} style={{ width: '3vmax', height: '3vmax' , borderRadius: "50%" }} />
                                                <span><a href={`/${user.userName}`} style={{fontSize: "1.1vmax", textDecoration:"none", color: "black"}}>{user.userName}</a></span>
                                            </li>
                                        )) : (
                                            <li>No {modalContent.toLowerCase()} found.</li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}

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
            <h2 className='sub' style={{ fontSize }}>Professional Summary</h2>
            <li  style={{ fontSize }}>{User.bio}</li>
        </section>

        
        <section className="resume-section">
            <h2 className='sub' style={{ fontSize }}>Skills</h2>
            <ul>
                {User.skills.length > 0 ? (
                    User.skills.map((skill, index) => <li key={index}   style={{ fontSize }}><span>.</span>{skill}</li>)
                ) : (
                    <li>No skills listed.</li>
                )}
            </ul>
        </section>

        <section className="resume-section">
            <h2 className='sub' style={{ fontSize }}>Work Experience</h2>
            <ul>
                {User.experience.length > 0 ? (
                    User.experience.map((exp, index) => <li key={index}  style={{ fontSize }}><span>.</span>{exp}</li>)
                ) : (
                    <li>No experience listed.</li>
                )}
            </ul>
        </section>

        <section className="resume-section">
            <h2 className='sub' style={{ fontSize }}>Education</h2>
            <ul>
                {User.education.length > 0 ? (
                    User.education.map((edu, index) => <li key={index}  style={{ fontSize }}><span>.</span>{edu}</li>)
                ) : (
                    <li>No education listed.</li>
                )}
            </ul>
        </section>

       

        <section className="resume-section">
            <h2 className='sub' style={{ fontSize }}>Achievements</h2>
            <ul>
                {User.achievments.length > 0 ? (
                    User.achievments.map((achievement, index) => <li key={index} style={{ fontSize }}><span>.</span>{achievement}</li>)
                ) : (
                    <li>No achievements listed.</li>
                )}
            </ul>
        </section>


        <section className="resume-section">
            <h2 className='sub' style={{ fontSize }}>Projects</h2>
            <ul>
                {User.projects.length > 0 ? (
                    User.projects.map((project, index) => <li key={index}  style={{ fontSize }}><span>.</span>{project}</li>)
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


*/}





import React, { useEffect, useRef, useState } from 'react';
import './profile.css';
import pic from './pictemp.png';
import html2pdf from 'html2pdf.js';
import Metadata from '../metadata';
import Loading from '../src/loading';
import { useDispatch, useSelector } from 'react-redux';
import { logout, profileloader } from '../src/actions/loadprofileAction';
import { useNavigate } from 'react-router-dom';
import Post from '../src/postsshow/post';
import { Getfollowers, getFollowing } from '../src/actions/folllowAction';
import { getUserPost } from '../src/actions/postsaction';

const Userprofile = () => {
    const { loading, success, User, followersCount, followingCount, Isauth } = useSelector((state) => state.displayprofile);
    const { followers, following, loadingFollowers, loadingFollowing, error } = useSelector(state => state.getconnection);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(profileloader());
    }, [dispatch]);
    
    const pdfRef = useRef(null);
    const navigate = useNavigate();
    
    const adjustFontSize = () => {
        const resume = document.querySelector('.resume');
        const sections = resume.querySelectorAll('.resume-section');
        const totalHeight = Array.from(sections).reduce((acc, section) => acc + section.scrollHeight, 0);
        
        if (totalHeight > 1000) {
            sections.forEach(section => {
                const heading = section.querySelector('h2');
                const items = section.querySelectorAll('li');
                const currentFontSize = parseFloat(getComputedStyle(heading).fontSize);
                
                heading.style.fontSize = `${currentFontSize * 0.7}px`;
                items.forEach(item => {
                    item.style.fontSize = `${currentFontSize * 0.7}px`;
                });
            });
        }
    };
    
    const downloadPDF = () => {
        adjustFontSize();
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

    const [displaypic, setdisplaypic] = useState(pic);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalData, setModalData] = useState([]);

    const handleModalOpen = (content) => {
        if (content === 'Followers' && User) {
            dispatch(Getfollowers(User._id));
        }
        if (content === 'Following' && User) {
            dispatch(getFollowing(User._id));
        }
        setModalContent(content);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        if (modalContent === 'Followers') {
            setModalData(followers);
        } else if (modalContent === 'Following') {
            setModalData(following);
        }
    }, [followers, following, modalContent]);

    useEffect(() => {
        if (User && User.display_pic && User.display_pic.length > 0) {
            setdisplaypic(User.display_pic);
        } else {
            setdisplaypic(pic);
        }
    }, [User]);

    const isSmallScreen = window.innerWidth <= 700;
    const fontSize = isSmallScreen ? "1.5vmax" : "1vmax";

    const handleLogout = () => {
        console.log('User logged out');
        logout();
        navigate('/');
    };

    const [activePostId, setActivePostId] = useState(null);
    const [showPosts, setShowPosts] = useState({ Blog: false, Project: false, Research: false });
    const { posts = [] } = useSelector(state => state.userPost);
    const [currentCategory, setCurrentCategory] = useState('');

    const handlePostShow = (category) => {
        if (User) {
            if (currentCategory === category) {
                // If the same category is clicked, hide posts
                setShowPosts(false);
                setCurrentCategory('');
            } else {
                // Show posts for the new category
                dispatch(getUserPost(User._id, category));
                setShowPosts(true);
                setCurrentCategory(category);
            }
        }
    };

    const handlePostClick = (postId) => {
        setActivePostId(prevPostId => (prevPostId === postId ? null : postId));
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
                <div className='profile-header'>
                    <div className='followers-info' onClick={() => handleModalOpen('Followers')} style={{ cursor: "pointer" }}>
                        <h2>{followersCount}</h2>
                        <h3>Followers</h3>
                    </div>
                    <div className='profile-picture'>
                        <img className='user-image' src={User.display_pic || 'default-pic.png'} alt='User profile' style={{ width: '9vmax', height: '9vmax', borderRadius: "50%", border: "1px solid white" }} />
                        <h2 className='username'>{User.userName}</h2>
                    </div>
                    <div className='following-info' onClick={() => handleModalOpen('Following')} style={{ cursor: "pointer" }}>
                        <h2>{followingCount}</h2>
                        <h3>Following</h3>
                    </div>

                    {modalVisible && (
                        <div className="modal" onClick={handleModalClose}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <button className="close-button" onClick={handleModalClose}>×</button>
                                <h2>{modalContent}</h2>
                                {modalContent === 'Followers' && loadingFollowers ? (
                                    <p>Loading followers...</p>
                                ) : modalContent === 'Following' && loadingFollowing ? (
                                    <p>Loading following...</p>
                                ) : (
                                    <ul>
                                        {modalData.length > 0 ? modalData.map((user) => (
                                            <li key={user._id}>
                                                <img src={user.display_pic} alt={user.userName} style={{ width: '3vmax', height: '3vmax', borderRadius: "50%" }} />
                                                <span><a href={`/${user.userName}`} style={{ fontSize: "1.1vmax", textDecoration: "none", color: "black" }}>{user.userName}</a></span>
                                            </li>
                                        )) : (
                                            <li>No {modalContent.toLowerCase()} found.</li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className='editbloc'>
                    <h3><a href='/edit-profile'>Edit profile</a></h3>
                  
                </div>
                <div className='toggle-posts' style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <h3 onClick={() => handlePostShow('Blog')} style={{ cursor: 'pointer', margin: "1vmax 2vmax" }}>
                            Blogs
                        </h3>
                        <h3 onClick={() => handlePostShow('Project')} style={{ cursor: 'pointer', margin: "1vmax 2vmax" }}>
                            Projects
                        </h3>
                        <h3 onClick={() => handlePostShow('Research')} style={{ cursor: 'pointer', margin: "1vmax 2vmax" }}>
                            Research
                        </h3>
                    </div>
                {showPosts && (
                        <div className='posts-section'>
                            <ul className='post-list'>
                                {posts.map((post) => (
                                    <li key={post._id}>
                                        <Post post={post} Isauth={Isauth} User={User}
                                            showComments={activePostId === post._id}
                                            onPostClick={handlePostClick} />
                                    </li>
                                ))}
                            </ul>
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
                            <h2 className='sub' style={{ fontSize }}>Professional Summary</h2>
                            <li style={{ fontSize }}>{User.bio}</li>
                        </section>

                        <section className="resume-section">
                            <h2 className='sub' style={{ fontSize }}>Skills</h2>
                            <ul>
                                {User.skills.length > 0 ? (
                                    User.skills.map((skill, index) => <li key={index} style={{ fontSize }}><span>.</span>{skill}</li>)
                                ) : (
                                    <li>No skills listed.</li>
                                )}
                            </ul>
                        </section>

                        <section className="resume-section">
                            <h2 className='sub' style={{ fontSize }}>Work Experience</h2>
                            <ul>
                                {User.experience.length > 0 ? (
                                    User.experience.map((exp, index) => <li key={index} style={{ fontSize }}><span>.</span>{exp}</li>)
                                ) : (
                                    <li>No experience listed.</li>
                                )}
                            </ul>
                        </section>

                        <section className="resume-section">
                            <h2 className='sub' style={{ fontSize }}>Education</h2>
                            <ul>
                                {User.education.length > 0 ? (
                                    User.education.map((edu, index) => <li key={index} style={{ fontSize }}><span>.</span>{edu}</li>)
                                ) : (
                                    <li>No education listed.</li>
                                )}
                            </ul>
                        </section>

                        <section className="resume-section">
                            <h2 className='sub' style={{ fontSize }}>Achievements</h2>
                            <ul>
                                {User.achievments.length > 0 ? (
                                    User.achievments.map((achievement, index) => <li key={index} style={{ fontSize }}><span>.</span>{achievement}</li>)
                                ) : (
                                    <li>No achievements listed.</li>
                                )}
                            </ul>
                        </section>

                        <section className="resume-section">
                            <h2 className='sub' style={{ fontSize }}>Projects</h2>
                            <ul>
                                {User.projects.length > 0 ? (
                                    User.projects.map((project, index) => <li key={index} style={{ fontSize }}><span>.</span>{project}</li>)
                                ) : (
                                    <li>No projects listed.</li>
                                )}
                            </ul>
                        </section>
                    </div>
                </div>

                <button className="dltbtn" onClick={downloadPDF}>Download as PDF</button>
                <button className="logoutbtn" onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
}

export default Userprofile;
