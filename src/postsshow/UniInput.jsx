


import React, { useEffect, useState, useRef } from 'react';
import MentionInput from '../../mentionLogic/mentionInput'; // Import MentionInput
import useGlobalKeyListener from '../../mentionLogic/keyListener';
import './unitinput.css';

const UnifiedInput = ({ placeholder, onSubmit, value, onChange }) => {
    const [showMentionInput, setShowMentionInput] = useState(false); // State to control MentionInput visibility
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) {
            onSubmit(value); // Send the value to the parent
            onChange(''); // Clear the input after submitting
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        onChange(newValue); // Update the input value in the parent component

        // Show mention input when typing "/"
        if (newValue.endsWith('/')) {
            setShowMentionInput(true);
        } else if (showMentionInput && !newValue.endsWith('/')) {
            setShowMentionInput(false);
        }
    };

    return (
        <div className='bulla'>
            <form onSubmit={handleSubmit} className="unified-input-container">
                <textarea
                    ref={textareaRef}
                    value={value} // Use value prop from parent
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    rows="1"
                    style={{ resize: 'none', overflow: 'hidden' }}
                />
                <button type="submit">Add</button>
            </form>

            {showMentionInput && (
                <MentionInput onSelect={(userName) => {
                    onChange(prev => prev + userName + ' '); // Append username after '/'
                    setShowMentionInput(false); // Close mention input
                }} />
            )}
        </div>
    );
};

export default UnifiedInput;
