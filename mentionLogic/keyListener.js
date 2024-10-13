import { useEffect } from 'react';
import { useMention } from './MentionContext'; // Import the custom hook

// Custom hook to listen for global key events
const useGlobalKeyListener = () => {
    const { toggleMentionButton } = useMention(); // Access the toggle function from context

    useEffect(() => {
        // Function to handle keyup events
        const handleKeyUp = (event) => {
            if (event.key === '/') {
                // If the '/' key is pressed, show the mention button
                toggleMentionButton(true);
            } else if (event.key === ' ') {
                // If the space key is pressed, hide the mention button
                toggleMentionButton(false);
            }
        };

        // Add the keyup event listener to the window
        window.addEventListener('keyup', handleKeyUp);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [toggleMentionButton]); // Dependency array to re-run effect if toggleMentionButton changes
};

export default useGlobalKeyListener; // Export the custom hook
