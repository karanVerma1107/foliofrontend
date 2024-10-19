


// Import necessary libraries and hooks
import React, { useState, useEffect } from 'react';
import './MentionInput.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { getUserByUsername } from '../src/actions/searchingAction'; // Import the action

// Define the MentionInput component
const MentionInput = ({onSelect}) => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const { users = [], loading, error } = useSelector(state => state.getUserByName); // Corrected selector syntax

    // Function to handle input changes
    const handleInputChange = (event) => {
        const value = event.target.value;
        setInput(value);
        
        // Call the action only if the input is not empty
        if (value) {
            dispatch(getUserByUsername(value));
        }
    };

    const handleUserSelect = (userName) => {
        onSelect(userName);
        setInput(''); // Clear the input after selection
    };

    return (
        <div className="mention-input-container">
            <input
                type="text"
                value={input}
                onChange={handleInputChange} // Update the state on input change
                placeholder="Type something..."
                className="mention-input"
            />
            <div className="output">
                {input} {/* Display what the user types */}
            </div>
            {/* Display users if any */}
            {users.length > 0 && (
                <div className="user-suggestions">
                    {users.map(user => (
                        <div key={user.userName} className="user-suggestion"  onClick={() => handleUserSelect(user.userName)} >
                            <img 
                                src={user.display_pic} 
                                alt={user.userName} 
                                className="user-image" 
                            />
                            <span className="user-name">{user.userName}</span>
                        </div>
                    ))}
                </div>
            )}
            {/* Loading and error messages */}
            {loading && <div>Loading...</div>}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default MentionInput;
