import {useState} from 'react';
import styles from '../styles/game-log.module.css';

function GameLog(props) {

    const [messages, setMessages] = useState([]);
    const [firstMessage, setFirstMessage] = useState(false);

    props.socket.on("game-message", (arg) => {
        console.log(arg); // world
        setMessages([...messages, arg]);
    });

    props.socket.on("starting-player", (arg) => {
        if (arg === props.id)
            setMessages([...messages, "It is your turn! Good luck!"]);
        else 
            setMessages([...messages, "It is your opponents turn! Good luck!"]);
        setFirstMessage(true);
    });

    return(
        <div className={styles.wrapper}>
            <div className={styles.log}>
                {messages.map((item, i)=> (<p className={styles.message} key={`message_${i}`}>{`{${i}} : ${item}`}</p>))}
            </div>
        </div>  
    );
}

export default GameLog;