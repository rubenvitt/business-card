import {useState, useEffect} from "react";
import {KeyObject} from "crypto";

function useKeyPress(line: String, setLine: Function, submitLine: Function) {
// State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState('');

    // If pressed key is our target key then set to true
    function downHandler(event: any) {
        console.log('Key Down: ' + event.key);
        if (event.key.length === 1) {
            setKeyPressed(event.key);
            line += event.key;
            setLine(line);
        } else if (event.key === 'Tab') {
            setKeyPressed("/t");
            setLine(line);
        } else if (event.key === 'Backspace' && line.length > 0) {
            setLine(line.slice(0, line.length - 1));
        } else if (event.key === 'Enter') {
            submitLine(line);
        }
    }

    // If released key is our target key then set to false
    const upHandler = (event: any) => {
        if (event.key.length === 1 || event.key === 'Tab') {
            setKeyPressed(event.key);
        } else if (event.key === 'Tab') {
            setKeyPressed("/t");
        }
    };

    // Add event listeners
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, [downHandler, upHandler]); // Empty array ensures that effect is only run on mount and unmount

    return keyPressed;

}

export default useKeyPress;
