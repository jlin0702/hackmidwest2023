
import NameTag from './name-tag.js'
import styles from '../styles/battlefield.module.css';


function Battlefield() {
    return (
        <div className={styles.container}>
            <NameTag/>
            <div className={styles.playerBase} />
            <div className={styles.opponentBase} />
        </div>

    );
}

export default Battlefield;