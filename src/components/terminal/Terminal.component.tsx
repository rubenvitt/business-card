import React, {useState} from "react";
import styles from './Terminal.module.scss';
import useKeyPress from "../../hooks/Keyypress.hook";
import {default as hashCode} from "../../helpers/Hashcode";


function convertTextToP(text: string) {
    if (text === '') {
        return null;
    }
    return (
        <div key={hashCode(text)} className={styles.history}>
            {text.split('\n').filter(value => value.length > 0).map((value, index) => {
                if (value.startsWith('\t')) {
                    return (<p className={value.startsWith('\t\t') ? styles.lineError : styles.lineApp}
                               dangerouslySetInnerHTML={{__html: value}}/>);
                } else {
                    return (
                        <p className={styles.lineUser} key={index}>{value}</p>
                    );
                }
            })}
        </div>
    );
}

async function processLine(line: String, addToHistory: (text: String) => void) {
    function handleHelp() {
        addToHistory("- help: Show this information.");
        addToHistory("- ls: Show files available in the actual directory.");
        addToHistory("- cat: [usage: cat xxx.file] Show content of the specified file.");
        addToHistory("- cd: change the actual directory");
    }

    function handleError() {
        setTimeout(() => addToHistory("\t Command not found."), 500);
    }

    function listContent() {
        addToHistory("<a href='https://gitlab.rubeen.dev'>about-me</a> |\t help.md |\t current");
    }

    function changeDirectory(dir: string) {
        addToHistory(`Change history to : '${dir}'`)
    }

    setTimeout(() => {
        let lowLine = line.toLowerCase();
        if (lowLine === 'help' || lowLine === '?') {
            handleHelp();
        } else if (lowLine === 'ls' || lowLine === 'll' || lowLine === 'la') {
            listContent();
        } else if (line.startsWith('cd ')) {
            changeDirectory(line.substring(3, line.length));
        } else if (lowLine === '') {
        } else {
            handleError();
        }
    }, 100)
}

function Terminal() {
    let [line, setLine] = useState('');
    let [history, setHistory] = useState('');
    let actualHistory = history;

    function addToHistory(text: String, user?: boolean) {
        text.split('\n').forEach(line => {
            actualHistory += "\n" + (user ? '' : '\t') + line;
        });
        setHistory(actualHistory)
    }

    function submitLine(line: String) {
        addToHistory(line, true);
        setLine('');
        processLine(line, addToHistory).then(r => console.log('line processed'));
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
