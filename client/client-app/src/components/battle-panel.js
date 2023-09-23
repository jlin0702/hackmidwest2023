
// import styles from '../styles/battle-panel.module.css';
import styles from '../styles/battle-panel.module.css';

import GameLog from './game-log.js';

function BattlePanel () {

    return (
        <div className={styles.panelContainer}>
            {/* <p>Howdy</p> */}
            <div id={'CreatureActionsContainer'} className={styles.actionsContainer}>
                <b>Creature Actions</b>
                <div className={styles.buttonGrid2x3}>
                    <button className={styles.panelButton}>Action 1</button>
                    <button className={styles.panelButton}>Action 2</button>
                    <button className={styles.panelButton}>Action 3</button>
                    <button className={styles.panelButton}>Action 4</button>
                    <button className={styles.panelButton}>Action 5</button>
                    <button className={styles.panelButton}>Action 6</button>
                </div>
            </div>
            <div id={'PlayerActionsContainer'} className={styles.actionsContainer}>
                <b>Player Actions</b>
                <div className={styles.buttonsGrid1x3}>
                    <button className={styles.panelButton}>Items</button>
                    <button className={styles.panelButton}>Lineup</button>
                    <button className={styles.surrenderButton}>Surrender</button>
                </div>
            </div>
            <div id={'GameLog'} className={styles.logContainer}>
                <b>Game Log</b>
                <GameLog/>
            </div>
        </div>
    );
}

export default BattlePanel;