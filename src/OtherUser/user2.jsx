import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserByUsername } from '../actions/searchingAction';
import './User2.css';
import Post from '../postsshow/post';
import Loading from '../loading';
import { getUserPost } from '../actions/postsaction';
import { profileloader } from '../actions/loadprofileAction';
import { Getfollowers, getFollowing } from '../actions/folllowAction';
import { useAlert } from 'react-alert';
import { ConnectUser } from '../actions/setprofileAction';

const User2 = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    
    const { users = [], loading, error } = useSelector(state => state.getUserByName);
    const { posts = [] } = useSelector(state => state.userPost);
    const { User } = useSelector(state => state.displayprofile);
    const { followers, following, loadingFollowers, loadingFollowing } = useSelector(state => state.getconnection);

    const user = users.length > 0 ? users[0] : null;

    const [activePostId, setActivePostId] = useState(null);
    const [showPosts, setShowPosts] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalData, setModalData] = useState([]);
    const [userFollowing, setUserFollowing] = useState(false);

    useEffect(() => {
        dispatch(getUserByUsername(username));
        dispatch(profileloader());
    }, [dispatch, username]);

    useEffect(() => {
        if (user) {
            setUserFollowing(User && User.following.includes(user._id));
        }
    }, [User, user]);

    useEffect(() => {
        if (modalContent === 'Followers') {
            setModalData(followers);
        } else if (modalContent === 'Following') {
            setModalData(following);
        }
    }, [followers, following, modalContent]);

    useEffect(() => {
        if (User && user && User._id === user._id) {
            navigate('/profile');
        }
    }, [User, user, navigate]);

    const handleModalOpen = (content) => {
        if (content === 'Followers' && user) {
            dispatch(Getfollowers(user._id));
        }
        if (content === 'Following' && user) {
            dispatch(getFollowing(user._id));
        }
        setModalContent(content);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handlePostShow = () => {
        if (user) {
            dispatch(getUserPost(user._id));
        }
    };

    const handlePostClick = (postId) => {
        setActivePostId(prevPostId => (prevPostId === postId ? null : postId));
    };

    const togglePosts = () => {
        setShowPosts(prevShowPosts => !prevShowPosts);
        handlePostShow();
    };

    const handleFollowToggle = () => {
        if (User) {
            dispatch(ConnectUser(user.userName));
            setUserFollowing(prev => !prev); // Toggle local following state
        } else {
            alert.show("Kindly login to access this resource");
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className='error'><p>Error: {error}</p></div>;
    }


    return (
        <div className='user-profile'>
            {user ? (
                <>
                    <div className='profile-header'>
                        <div className='followers-info'  onClick={() => handleModalOpen('Followers')}    style={{cursor: "pointer"}}>
                            <h2>{user.followers.length}</h2>
                            <h3>Followers</h3>
                        </div>
                        <div className='profile-picture'>
                            <img className='user-image' src={user.display_pic || 'default-pic.png'} alt='User profile' />
                            <h2 className='username'>{user.userName}</h2>
                        </div>
                        <div className='following-info'  onClick={() => handleModalOpen('Following')}  style={{cursor: "pointer"}}>
                            <h2>{user.following.length}</h2>
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
                                                <img src={user.display_pic} alt={user.userName} style={{ width: '50px', height: '50px' }} />
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

                    <button className='follow-button' onClick={handleFollowToggle}> {User ? (userFollowing ? 'Following' : 'Follow') : 'Follow'}
                    </button>
                    
                    <div className='toggle-posts'>
                        <h3 onClick={togglePosts}>
                            {showPosts ? 'Hide Posts' : 'Show Posts'}
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

                    <div className='about-section'>
                        <div className="resume-card">
                            <header className="resume-header">
                                <h1>{user.Name}</h1>
                                <p>Email: {user.Email}</p>
                                <p>Phone: {user.phoneNo}</p>
                                <p>Location: {user.city}, {user.country}</p>
                            </header>

                            {[
                                { title: 'Professional Summary', content: user.bio },
                                { title: 'Skills', content: user.skills.length > 0 ? user.skills : ['No skills listed.'] },
                                { title: 'Work Experience', content: user.experience.length > 0 ? user.experience : ['No experience listed.'] },
                                { title: 'Education', content: user.education.length > 0 ? user.education : ['No education listed.'] },
                                { title: 'Achievements', content: user.achievments.length > 0 ? user.achievments : ['No achievements listed.'] },
                                { title: 'Projects', content: user.projects.length > 0 ? user.projects : ['No projects listed.'] },
                            ].map((section, index) => (
                                <section className="resume-section" key={index}>
                                    <h2 className='section-title'>{section.title}</h2>
                                    <ul>
                                        {Array.isArray(section.content) ? section.content.map((item, idx) => (
                                            <li key={idx}><span>.</span>{item}</li>
                                        )) : <li>{section.content}</li>}
                                    </ul>
                                </section>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <p>User not found.</p>
            )}
        </div>
    );
}

export default User2;
