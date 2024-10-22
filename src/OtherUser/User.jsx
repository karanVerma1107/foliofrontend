
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { getUserByUsername } from '../actions/searchingAction';
import './User.css'
import { getUserPost } from '../actions/postsaction';


const User = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const { users = [], loading, error } = useSelector(state => state.getUserByName);
    const {posts=[]} = useSelector(state => state.userPost)
    // Fetch the user when the component mounts or username changes
    useEffect(() => {
        dispatch(getUserByUsername(username));
    }, [dispatch, username]);

    if (loading) {
        return (
            <div className='loadingc'>
                <p>Loading...</p>
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

    const user = users.length > 0 ? users[0] : null;



    const handlepostshow = ()=>{
        dispatch(getUserPost(user._id))
    }

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
                            <img className='userpic' src={user.display_pic || 'default-pic.png'} alt='user-profile' />
                            <h3>{user.userName}</h3>
                        </div>
                        <div className='following'>
                            <h2>{user.following.length}</h2>
                            <h2>Following</h2>
                        </div>
                    </div>

                    <div style={{ margin: '2vmax 0', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
    <h3 style={{ fontSize: '1.4vmax', marginLeft: '0vmax', cursor: 'pointer' }}    onClick={handlepostshow}>Posts</h3>
    <button style={{
        fontSize: '1.4vmax',
        backgroundColor: 'orangered',
        color: 'white',
        border: 'none',
        padding: '5px 20px', // Increased padding for better button size
        marginLeft: '3vmax', // Added margin to the left of the button
        cursor: 'pointer',
        borderRadius: '10px'
    }}>
        Follow
    </button>
</div>




                    <div className='aboutcon' >
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
