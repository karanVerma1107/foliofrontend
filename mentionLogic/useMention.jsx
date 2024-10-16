// useMention.jsx
import React, { createContext, useContext, useState } from 'react';

const MentionContext = createContext();

export const MentionProvider = ({ children }) => {
    const [showMentionButton, setShowMentionButton] = useState(false);
    const toggleMentionButton = (value) => setShowMentionButton(value);

    return (
        <MentionContext.Provider value={{ showMentionButton, toggleMentionButton }}>
            {children}
        </MentionContext.Provider>
    );
};

export const useMention = () => {
    const context = useContext(MentionContext);
    if (!context) {
        throw new Error("useMention must be used within a MentionProvider");
    }
    return context;
};
