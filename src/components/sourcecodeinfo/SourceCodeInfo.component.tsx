import React from "react";
import styles from './SourceCodeInfo.module.scss';
import ReactLogo from './icons8-gitlab.svg';

function SourceCodeInfo () {
    const redirect = () => document.location.href = 'https://gitlab.rubeen.dev/web/business-card';

    return (
        <div onClick={redirect} className={styles.main}>
            <p><img draggable={"false"} src={ReactLogo} height={'50'} alt={'Gitlab Logo'} /></p>
            <p>I'm hosted on Gitlab</p>
        </div>
    )
}

export default SourceCodeInfo;
