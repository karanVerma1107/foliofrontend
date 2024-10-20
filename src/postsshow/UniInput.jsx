import React, { useEffect, useState, useRef } from 'react';
import MentionInput from '../../mentionLogic/mentionInput'; // Import MentionInput
import useGlobalKeyListener from '../../mentionLogic/keyListener';
import MentionButton from '../../mentionLogic/mentionButton';
import './unitinput.css'

const UnifiedInput = ({ placeholder, onSubmit, id }) => {
    const [inputValue, setInputValue] = useState('');
    const [showMentionInput, setShowMentionInput] = useState(false); // State to control MentionInput visibility
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSubmit(inputValue, id);
            setInputValue('');
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; 
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [inputValue]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Show mention input when typing "/"
        if (value.endsWith('/')) {
            setShowMentionInput(true);
        } else if (showMentionInput && !value.endsWith('/')) {
            setShowMentionInput(false);
        }
    };

    const handleUserSelect = (userName) => {
        // Keep the "/" and add the selected username
        setInputValue(prev => prev + userName + ' '); // Append username after '/'
        setShowMentionInput(false); // Close mention input
    };

    useGlobalKeyListener();

    return (
        <>
          <div className='bulla'>
            <form onSubmit={handleSubmit} className="unified-input-container">
                <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    rows="1"
                    style={{ resize: 'none', overflow: 'hidden' }}
                />
                <button type="submit">Add</button>
                
            </form>
          
            {showMentionInput && (
                <MentionInput onSelect={handleUserSelect} />
            )}
            </div>
        </>
    );
};

export default UnifiedInput;
