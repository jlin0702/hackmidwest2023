import {useEffect, useState, useRef} from 'react';
import NameTag from './name-tag.js'
import styles from '../styles/battlefield.module.css';




function Battlefield(props) {
    // let playerClasses = "styles.playerBase "
    // let oppClasses = "styles.opponentBase "

    function getPlayerIndex(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === props.id)
                return i;
        }
        return -1;
    }

    let player = "2px";
    let opp = "2px";
    let monster = props.monster
    
    const [imgsrc, setimgsrc] = useState()
    const [loading, setLoading] = useState(true)

    // console.log('monster', monster)
    useEffect(()=> {
        props.socket.on('game-start', (startingState) => {
            console.log(startingState)
    
            let index = getPlayerIndex(startingState);
            console.log(index);
            console.log(startingState[index]);
    
            setimgsrc(startingState[(index+1)%2].img);
            setLoading(false);

        })
    },[])
    
    return (

        <div className={styles.container}>
            <NameTag socket={props.socket} id={props.id}/>
            <div className={styles.playerBase} key={'playerbase'}/>
            <img className={styles.image}src={`https://maroon-active-mole-538.mypinata.cloud/ipfs/${monster.metadataData.image.substring('ipfs://'.length)}?pinataGatewayToken=0Z0L_3214TvRqWPDl9_hwFjZsn-kI0q5pOvTduLkiOjrBWoxlZpr1bHkxU0-O9KE`} alt="Item Image" height={150} width={150} />
            <div className={styles.opponentBase} key={'oppbase'}/>
            {loading === true ? (
                        <p>Loading...</p>
                    ) : (
                        <img className={styles.imageOpp}src={`https://maroon-active-mole-538.mypinata.cloud/ipfs/${imgsrc.substring('ipfs://'.length)}?pinataGatewayToken=0Z0L_3214TvRqWPDl9_hwFjZsn-kI0q5pOvTduLkiOjrBWoxlZpr1bHkxU0-O9KE`} alt="Item Image" height={150} width={150} />
                    )
            }

        </div>

    );  
}

export default Battlefield;