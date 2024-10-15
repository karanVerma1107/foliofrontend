
import React, { useState, useEffect, useRef } from 'react';

const UnifiedInput = ({ placeholder, onSubmit, id }) => {
    const [inputValue, setInputValue] = useState('');
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSubmit(inputValue, id);
            setInputValue('');
        }
    };

    useEffect(() => {
        // Adjust the height of the textarea based on its scroll height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
        }
    }, [inputValue]);

    return (
        <form onSubmit={handleSubmit} className="unified-input-container">
            <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                rows="1"
                style={{ resize: 'none', overflow: 'hidden' }} // Prevent resizing and show no overflow
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default UnifiedInput;
