import ProgressBar from 'react-bootstrap/ProgressBar';
import styles from '../styles/name-tag.module.css';

function NameTag () {

    return (
        <div className={styles.wrapper}>
            <div className={styles.playerWrapper}>
                <b>Creature Name</b>
                <div className={styles.playerPanel}>
                    <span className={styles.panelContent}>
                        <p className={styles.hpText}>XXX / YYY</p>
                        <ProgressBar >
                            <ProgressBar className={styles.remainingHealth} now={90} key={1} />
                            <ProgressBar className={styles.missingHealth} now={10} key={2} />
                        </ProgressBar>
                    </span>
                </div>
            </div>
            <div className={styles.opponentWrapper}>
                <b>Creature Name</b>
                <div className={styles.opponentPanel}>
                    <p>XXX / YYY</p>
                </div>
            </div>
        </div>
    );
}

export default NameTag;