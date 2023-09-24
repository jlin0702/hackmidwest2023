import ProgressBar from 'react-bootstrap/ProgressBar';
import styles from '../styles/name-tag.module.css';
import { useEffect, useState } from 'react';



function NameTag (props) {

    function getPlayerIndex(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === props.id)
                return i;
        }
        return -1;
    }

    const [playerInitHp, setPlayerInitHp] = useState();
    const [oppInitHp, setOppInitHp] = useState();
    const [playerHp, setPlayerHp] = useState();
    const [oppHp, setOppHp] = useState();
    const [playerName, setPlayerName] = useState();
    const [oppName, setOppName] = useState();

    props.socket.on("game-start", (gameState) => {
        if (playerInitHp != null || oppInitHp != null)
            return;

        // console.log(gameState); // world
        let playerIndex = getPlayerIndex(gameState);
        let pHp = gameState[playerIndex].activeMonster.hp;
        let oHp = gameState[(playerIndex+1)%2].activeMonster.hp;
        setPlayerInitHp(pHp);
        setOppInitHp(oHp);
        setOppHp(oHp);
        setPlayerHp(pHp);
        setPlayerName(gameState[playerIndex].activeMonster.name);
        setOppName(gameState[(playerIndex+1)%2].activeMonster.name);
    });

    props.socket.on("game-state", (gameState) => {
        let playerIndex = getPlayerIndex(gameState);
        let pHp = gameState[playerIndex].activeMonster.hp;
        let oHp = gameState[(playerIndex+1)%2].activeMonster.hp;
        setOppHp(oHp);
        setPlayerHp(pHp);
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.playerWrapper}>
                <b>{playerName}</b>
                <div className={styles.playerPanel}>
                    <span className={styles.panelContent}>
                        <p className={styles.hpText}>{playerHp} / {playerInitHp}</p>
                        <div className={styles.healthBar}>
                            <ProgressBar >
                                <ProgressBar className={styles.remainingHealth} now={playerHp} key={'playerhealth'} />
                                <ProgressBar className={styles.missingHealth} now={playerInitHp-playerHp} key={'playerhealthmissing'} />
                            </ProgressBar>
                        </div>
                        
                    </span>
                </div>
            </div>
            <div className={styles.opponentWrapper}>
                <b>{oppName}</b>
                <div className={styles.opponentPanel}>
                <span className={styles.panelContent}>
                        <p className={styles.hpText}>{oppHp} / {oppInitHp}</p>
                        <div className={styles.healthBar}>
                            <ProgressBar >
                                <ProgressBar className={styles.remainingHealth} now={oppHp} key={'opphealth'} />
                                <ProgressBar className={styles.missingHealth} now={oppInitHp-oppHp} key={'opphealthremaingin'} />
                            </ProgressBar>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default NameTag;