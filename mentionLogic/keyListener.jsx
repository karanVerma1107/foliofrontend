// keyListener.jsx
import { useEffect } from 'react';
import { useMention } from './useMention';
import { useAlert } from 'react-alert';

const useGlobalKeyListener = () => {
    const { toggleMentionButton } = useMention();
    const alert = useAlert();

    useEffect(() => {
        const handleKeyUp = (event) => {
            if (event.key === '/') {
                toggleMentionButton(true);
              //  alert.success("happend")
            } else if (event.key === ' ') {
                toggleMentionButton(false);
            }
        };

        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [toggleMentionButton]);
};

export default useGlobalKeyListener;
