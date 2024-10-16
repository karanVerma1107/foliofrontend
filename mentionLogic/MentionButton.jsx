import React, { useState } from 'react';
import { useMention } from './useMention';
import MentionInput from './mentionInput';


const MentionButton = () => {
    const { showMentionButton } = useMention();
    const [showMentionInput, setShowMentionInput] = useState(false);

    const toggleMentionInput = () => {
        setShowMentionInput(prev => !prev);
    };

    if (!showMentionButton) return null; // Don't show the button if not necessary

    return (
        <>
            <button
                onClick={toggleMentionInput}
                style={{
                    position: 'fixed',
                    bottom: '30%',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                    padding: '10px 20px',
                    fontSize: '16px',
                    color: '#fff',
                    backgroundColor: '#ff5733',
                    border: 'none',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    zIndex: 1000,
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff704d'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff5733'}
            >
                Mention
            </button>

            {showMentionInput && (
                <div style={{
                    position: 'fixed',
                    bottom: '40%',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                    height: '7vmax',
                    width: '80%',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    padding: '20px',
                    zIndex: 1000,
                }}>
                    <MentionInput onClose={() => setShowMentionInput(false)} />
                </div>
            )}
        </>
    );
};

export default MentionButton;
