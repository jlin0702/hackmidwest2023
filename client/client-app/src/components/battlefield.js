import {useEffect, useState, useRef} from 'react';
import NameTag from './name-tag.js'
import styles from '../styles/battlefield.module.css';


function Battlefield(props) {
    // let playerClasses = "styles.playerBase "
    // let oppClasses = "styles.opponentBase "
    let player = "2px";
    let opp = "2px";
    

    return (
        <div className={styles.container}>
            <NameTag socket={props.socket} id={props.id}/>
            <div className={styles.playerBase} key={'playerbase'}/>
            <div className={styles.opponentBase} key={'oppbase'}/>
        </div>

    );
}

export default Battlefield;