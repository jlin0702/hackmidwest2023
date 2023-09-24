
// import styles from '../styles/battle-panel.module.css';
import { useState, useEffect } from 'react';
import styles from '../styles/battle-panel.module.css';

import GameLog from './game-log.js';

function creatureActionHandler (action, socket, id) {
    console.log("click handler");
    socket.emit("creature-action",action,id);
}

function BattlePanel (props) {

    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);

    function getPlayerIndex(arr) {
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i].id);
            if (arr[i].id === props.id)
                return i;
        }
        return -1;
    }

    useEffect(()=>{
        props.socket.on("get-actions", (arg) => {
            let playerIndex = getPlayerIndex(arg)

            console.log("index", playerIndex)

            console.log("prop'",props.id)
            console.log(arg);
            setActions([...actions, ...arg[playerIndex].actions]);
            setLoading(false);
        });
    },[])

    return (
        <div className={styles.panelContainer}>
            <div id={'CreatureActionsContainer'} className={styles.actionsContainer}>
                <b>Creature Actions</b>
                <div className={styles.buttonGrid2x3}>
                    {loading === true ? (
                        <p>Loading...</p>
                    ) : (
                        actions.map((action, i)=> {
                            if (action.name !== "") {
                                return (
                                    <button className={styles.panelButton} onClick={()=>creatureActionHandler(i,props.socket, props.id)} key={`action_${i}`}>
                                        {`${action.name}`}
                                    </button>
                                )
                            }
                        })
                    )}
                    
                    {/* <button className={styles.panelButton} onClick={()=>creatureActionHandler(0,props.socket, props.id)}>{actions[0].name}</button>
                    <button className={styles.panelButton} onClick={()=>creatureActionHandler(1,props.socket, props.id)}>{actions[1].name}</button>
                    <button className={styles.panelButton} onClick={()=>creatureActionHandler(2,props.socket, props.id)}>{actions[2].name}</button>
                    <button className={styles.panelButton} onClick={()=>creatureActionHandler(3,props.socket, props.id)}>{actions[3].name}</button>
                    <button className={styles.panelButton} onClick={()=>creatureActionHandler(4,props.socket, props.id)}>{actions[4].name}</button>
                    <button className={styles.panelButton} onClick={()=>creatureActionHandler(5,props.socket, props.id)}>{actions[5].name}</button> */}
                </div>
            </div>
            <div id={'PlayerActionsContainer'} className={styles.actionsContainer}>
                <b>Player Actions</b>
                <div className={styles.buttonsGrid1x3}>
                    <button className={styles.panelButton} onClick={()=>creatureActionHandler(6,props.socket, props.id)}>Items</button>
                    <button className={styles.panelButton} onClick={()=>creatureActionHandler(7,props.socket, props.id)}>Lineup</button>
                    <button className={styles.surrenderButton} onClick={()=>creatureActionHandler(8,props.socket, props.id)}>Surrender</button>
                </div>
            </div>
            <div id={'GameLog'} className={styles.logContainer}>
                <b>Game Log</b>
                <GameLog socket={props.socket} id={props.id}/>
            </div>
        </div>
    );
}

export default BattlePanel;