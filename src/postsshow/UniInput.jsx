
import React, { useState } from 'react'; // Import React and useState

const UnifiedInput = ({ placeholder, onSubmit, id }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (inputValue.trim()) {
            onSubmit(inputValue, id); // Call the onSubmit function with the comment and ID
            setInputValue(''); // Clear the input
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                rows="4"
                cols="50"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UnifiedInput; 
