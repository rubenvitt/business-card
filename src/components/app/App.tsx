import React from 'react';
import Terminal from "../terminal/Terminal.component";
import styles from './App.module.scss';
import SourceCodeInfo from '../sourcecodeinfo/SourceCodeInfo.component';

function App() {
  return (
    <div className={styles.main}>
      <Terminal/>
      <SourceCodeInfo />
    </div>
  );
}

export default App;
