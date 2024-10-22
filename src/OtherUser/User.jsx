import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserByUsername } from '../actions/searchingAction';
import './User.css'


const User = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const { users = [], loading, error } = useSelector(state => state.getUserByName);

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

                    <div className='aboutcon' style={{ padding: '20px', backgroundColor: '#fff', border: '1px solid #ccc' }}>
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
