import React, {useState} from "react";
import styles from './Terminal.module.scss';
import useKeyPress from "../../hooks/Keyypress.hook";


function convertTextToP(text: string) {
    if (text === '') {
        return null;
    }
    return (
        <div className={styles.history}>
            {text.split('\n').filter(value => value.length > 0).map(value => {
                return (
                  <p>> {value}</p>
                );
            })}
        </div>
    );
}

function Terminal() {
    let [line, setLine] = useState('');
    let [history, setHistory] = useState('');

    function addToHistory(text: String) {
        setHistory(history + "\n" + text)
    }

    function submitLine(line: String) {
        addToHistory(line);
        setLine('');
    }

    useKeyPress(line, setLine, submitLine);

    return (
        <div className={styles.terminal}>
            {convertTextToP(history)}
            rubeen.dev> {line}
        </div>
    );
}


export default Terminal;
