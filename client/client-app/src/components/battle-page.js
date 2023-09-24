import {react, useState, useEffect,} from 'react'

import BattlePanel from './battle-panel'
import Battlefield from './battlefield';

import styles from '../styles/battle-page.module.css';
import { io } from 'socket.io-client';

const id = (Math.floor(Math.random() * 100000000));
const socket = io('http://localhost:8000');
socket.emit("connect-to-game", id);

function BattlePage () {

    return (
        <div className={styles.container}>
            <div style={{height:"10em"}}></div>
            <Battlefield socket={socket} id={id}/>
            <BattlePanel socket={socket} id={id}/>
        </div>
    );
}

export default BattlePage;