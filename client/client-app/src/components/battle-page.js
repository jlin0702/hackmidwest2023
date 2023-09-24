import {react, useState, useEffect} from 'react'

import BattlePanel from './battle-panel'
import Battlefield from './battlefield';

import styles from '../styles/battle-page.module.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

function BattlePage () {

    return (
        <div className={styles.container}>
            <div style={{height:"10em"}}></div>
            <Battlefield />
            <BattlePanel socket={socket}/>
        </div>
    );
}

export default BattlePage;