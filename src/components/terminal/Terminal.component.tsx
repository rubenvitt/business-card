import React, {useState} from "react";
import styles from './Terminal.module.scss';
import useKeyPress from "../../hooks/Keyypress.hook";
import {default as hashCode} from "../../helpers/Hashcode";
import {Container, DefaultStructure, File, Root} from "../../logic/SystemStructure";


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


function Terminal() {
    let [line, setLine] = useState('');
    let [history, setHistory] = useState('');
    let [actualFolder, setActualFolder] = useState<Container>(DefaultStructure);
    let [callHistory, setCallHistory] = useState<Container[]>([]);

    function addToHistory(text: String, user?: boolean) {
        setHistory(prevHistory => {
            text.split('\n').forEach(line => {
                prevHistory += "\n" + (user ? '' : '\t') + line;
            });
            return prevHistory;
        })
    }

    function submitLine(line: String) {
        addToHistory(line, true);
        setLine('');
        processLine(line, addToHistory).then(r => console.log('line processed'));
    }

    async function processLine(line: String, addToHistory: (text: String) => void) {
        function help() {
            addToHistory("- help: Show this information.");
            addToHistory("- ls: Show files available in the actual directory.");
            addToHistory("- cat: [usage: cat xxx.file] Show content of the specified file.");
            addToHistory("- cd: change the actual directory.");
            addToHistory('- clear: clear the complete console output.')
        }

        function error(message?: String) {
            setTimeout(() => addToHistory(`\t ${message === undefined ? 'Command not found.' : message}`), 500);
        }

        function ls(container: Container) {
            addToHistory('Actual folder: ' + (container instanceof Root ? '/' : container.name));
            addToHistory(container.items.map(value => {
                return `${value.name}\t`;
            }).join('\t'));
        }

        function cd(target: Container | undefined) {
            if (target === undefined) {
                error('Folder not found.');
            } else {
                setActualFolder(prevFolder => {
                    setCallHistory(prevCallHistory => {
                        prevCallHistory.push(prevFolder)
                        return prevCallHistory;
                    });
                    return target;
                });
                addToHistory(`Switch to folder: ${callHistory.map(value => value.name).join('/')}/${target.name}`);
            }
        }

        function cat(file: File | undefined) {
            if (file === undefined) {
                error("File not found.");
            } else {
                addToHistory(file.content);
            }
        }

        function getContainer(actualFolder: Container, target: string): Container | undefined {
            return actualFolder.items
                .filter(element => element.name.toLowerCase() === target.toLowerCase())
                .filter(value => 'items' in value).pop() as Container;
        }

        function getFile(actualFolder: Container, target: string): File | undefined {
            return actualFolder.items
                .filter(element => element.name.toLowerCase() === target.toLowerCase())
                .filter(value => 'content' in value).pop() as File;
        }

        setTimeout(() => {
            let lowLine = line.toLowerCase();
            if (lowLine === 'help' || lowLine === '?') {
                help();
            } else if (lowLine === 'ls' || lowLine === 'll' || lowLine === 'la') {
                ls(actualFolder);
            } else if (lowLine.startsWith('cd ')) {
                cd(getContainer(actualFolder, line.substring(3, line.length)));
            } else if (lowLine.startsWith("cat ")) {
                cat(getFile(actualFolder, line.substring(4, line.length)));
            } else if (lowLine === 'clear') {
                setHistory('');
            } else if (lowLine === '') {
            } else {
                error();
            }
        }, 100)
    }

    useKeyPress(line, setLine, submitLine);

    return (
        <div className={styles.terminal}>
            {convertTextToP(history)}
            rubeen.dev> {line}
        </div>
    )
}

export default Terminal;
