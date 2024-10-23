


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import { getUserByUsername } from '../actions/searchingAction';
import './User.css';
import Post from '../postsshow/post';
import Loading from '../loading';
import { getUserPost } from '../actions/postsaction';
import { profileloader } from '../actions/loadprofileAction';

const User = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
     // Fetch the user when the component mounts or username changes
    

    const { users = [], loading, error } = useSelector(state => state.getUserByName);
    const { posts = [] } = useSelector(state => state.userPost);
    const { User, Isauth } = useSelector(state => state.displayprofile);

    const [activePostId, setActivePostId] = useState(null);

    const [showPosts, setShowPosts] = useState(false);


   
    const navigate = useNavigate()

   

    useEffect(() => {
        dispatch(getUserByUsername(username));
        dispatch(profileloader());
    }, [dispatch, username]);


    const user = users.length > 0 ? users[0] : null;


    //Check if User is defined and matches the fetched user
    useEffect(() => {
        if (User && user && User._id === user._id) {
            navigate('/profile');
        }
    }, [User, user, navigate]);



    // Handle loading and error states
    if (loading) {
        return (
            <div className='loadingc'>
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className='error'>
                <p>Error: {error}</p>
            </div>
        );
    }




    //



    const handlePostShow = () => {
        if (user) {
            dispatch(getUserPost(user._id));
            console.log('User ID is', user._id);
        }
    };

    const handlePostClick = (postId) => {
        setActivePostId(prevPostId => (prevPostId === postId ? null : postId));
    };




    const togglePosts = () => {
        setShowPosts(prevShowPosts => !prevShowPosts); // Toggle the visibility of posts
        handlePostShow(); // Fetch posts when toggled
    };

    
 


    return (
        <div className='mainco'>
            {user ? (
                <>
                    <div className='upper-stuff'>
                        <div className='followers'>
                            <h2>{user.followers.length}</h2>
                            <h2>Followers</h2>
                        </div>
                        <div className='profilepic'>
                            <img className='userpic' src={user.display_pic || 'default-pic.png'} alt='User profile' />
                            <h3>{user.userName}</h3>
                        </div>
                        <div className='following'>
                            <h2>{user.following.length}</h2>
                            <h2>Following</h2>
                        </div>
                    </div>
                    <button style={{
                        fontSize: '1.4vmax',
                        backgroundColor: 'orangered',
                        color: 'white',
                        width: "50%",
                        border: 'none',
                        padding: '5px 20px',
                        margin: '1vmax auto',
                        cursor: 'pointer',
                        borderRadius: '10px'
                    }}>
                        Follow
                    </button>
                    <div style={{ margin: '2vmax 0', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <h3 style={{ fontSize: '1.4vmax', marginLeft: '0vmax', cursor: 'pointer' }} onClick={togglePosts}>
                            {showPosts ? 'Hide Posts' : 'Show Posts'}
                        </h3>
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

                    <div className='aboutcon'>
                        <div className="resume">
                            <header className="resume-header">
                                <h1>{user.Name}</h1>
                                <p>Email: {user.Email}</p>
                                <p>Phone: {user.phoneNo}</p>
                                <p>Location: {user.city}, {user.country}</p>
                            </header>

                            <section className="resume-section">
                                <h2 className='sub'>Professional Summary</h2>
                                <p>{user.bio}</p>
                            </section>

                            <section className="resume-section">
                                <h2 className='sub'>Skills</h2>
                                <ul>
                                    {user.skills.length > 0 ? (
                                        user.skills.map((skill, index) => <li key={index}><span>.</span>{skill}</li>)
                                    ) : (
                                        <li>No skills listed.</li>
                                    )}
                                </ul>
                            </section>

                            <section className="resume-section">
                                <h2 className='sub'>Work Experience</h2>
                                <ul>
                                    {user.experience.length > 0 ? (
                                        user.experience.map((exp, index) => <li key={index}><span>.</span>{exp}</li>)
                                    ) : (
                                        <li>No experience listed.</li>
                                    )}
                                </ul>
                            </section>

                            <section className="resume-section">
                                <h2 className='sub'>Education</h2>
                                <ul>
                                    {user.education.length > 0 ? (
                                        user.education.map((edu, index) => <li key={index}><span>.</span>{edu}</li>)
                                    ) : (
                                        <li>No education listed.</li>
                                    )}
                                </ul>
                            </section>

                            <section className="resume-section">
                                <h2 className='sub'>Achievements</h2>
                                <ul>
                                    {user.achievments.length > 0 ? (
                                        user.achievments.map((achievement, index) => <li key={index}><span>.</span>{achievement}</li>)
                                    ) : (
                                        <li>No achievements listed.</li>
                                    )}
                                </ul>
                            </section>

                            <section className="resume-section">
                                <h2 className='sub'>Projects</h2>
                                <ul>
                                    {user.projects.length > 0 ? (
                                        user.projects.map((project, index) => <li key={index}><span>.</span>{project}</li>)
                                    ) : (
                                        <li>No projects listed.</li>
                                    )}
                                </ul>
                            </section>
                        </div>
                    </div>
                </>
            ) : (
                <p>User not found.</p>
            )}
        </div>
    );
}

export default User;
