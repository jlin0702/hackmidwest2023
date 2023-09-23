
import styles from '../styles/battlefield.module.css';

function Battlefield() {
    return (
        <div className={styles.container}>
            <div className={styles.playerBase} />
            <div className={styles.opponentBase} />
        </div>

    );
}

export default Battlefield;