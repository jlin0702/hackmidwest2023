import {react, useState, useEffect} from 'react'

import BattlePanel from './battle-panel'
import Battlefield from './battlefield';

import styles from '../styles/battle-page.module.css';

function BattlePage () {

    return (
        <div className={styles.container}>
            <div style={{height:"10em"}}></div>
            <Battlefield/>
            <BattlePanel/>
        </div>
    );
}

export default BattlePage;