import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Getnotification } from '../actions/notificationAction';
import { profileloader } from '../actions/loadprofileAction';
import './Notification.css'; // Import a CSS file for styling

const Notification = () => {
    const dispatch = useDispatch();
    const { User } = useSelector((state) => state.displayprofile);

    // Get notifications, error, and loading state from the Redux store
    const { notifications, error, loading } = useSelector(state => state.showNoti);

    // Fetch notifications when the component mounts
    useEffect(() => {
        dispatch(profileloader());
    }, [dispatch]);

    useEffect(() => {
        if (User && User._id) {
            dispatch(Getnotification(User._id));
        }
    }, [dispatch, User]);

    return (
        <div className="notification-container" style={{marginLeft: "8.9vmax"}}>
            <h3 style={{fontSize: "1.4vmax"}}>Notifications</h3>
            {loading && <p>Loading...</p>} {/* Display loading message */}
            {error && <p className="error">{error}</p>} {/* Display error message */}
            {notifications.length === 0 && !loading && <p>No notifications available.</p>} {/* No notifications message */}

            {notifications.length > 0 && (
                <ul className="notification-list">
                    {notifications.map(notification => (
                        <li key={notification._id} className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}>
                            <p className="notification-message">{notification.message}</p>
                            <p className="notification-expiry">
                                Expires on: {new Date(notification.expiryAt).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notification;
