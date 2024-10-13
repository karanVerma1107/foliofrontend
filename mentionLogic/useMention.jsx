import React, { createContext, useContext, useState } from 'react';

const MentionContext = createContext();

export const MentionProvider = ({ children }) => {
    // State to manage the visibility of the mention button
    const [showMentionButton, setShowMentionButton] = useState(false);

    // Function to toggle the mention button visibility
    const toggleMentionButton = (value) => {
        setShowMentionButton(value); // Update state based on the value passed
    };

    return (
        // Provide the state and toggle function to all child components
        <MentionContext.Provider value={{ showMentionButton, toggleMentionButton }}>
            {children}
        </MentionContext.Provider>
    );
};

export const useMention = () => {
    return useContext(MentionContext); // Access the context value
};