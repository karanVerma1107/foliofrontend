import React from 'react';
import { useMention } from './MentionContext'; // Import the MentionContext

const MentionButton = () => {
    const { showMentionButton } = useMention(); // Access the visibility state from context

    // If the button should not be shown, return null (nothing rendered)
    if (!showMentionButton) return null;

    // Render the mention button if it should be shown
    return (
        <button onClick={() => alert('Mention clicked!')} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            Mention
        </button>
    );
};

export default MentionButton; // Export the MentionButton component
