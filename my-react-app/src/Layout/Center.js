import styles from './Center.module.css'
import{ useState } from 'react';
const Center=({children})=>{
    /*
    preventScrolling (default=true).
    */
    const [pos, setPos] = useState({ scale: 1 });
    const onScroll=(e)=>{
        
        if(e.deltaY > 0) {
            let newScale = pos.scale * 1.1;
            setPos({
                scale: newScale
            });
        } else{
            let newScale = pos.scale * 0.9;
            setPos({
                scale: newScale
            })
        };;
        console.log(pos)
    }
    //TODO: zoom  wheel은 작동되는데 확대가 안된다. layout 밖으로 빼야하나 다른 frame의 fixed가 문젠가 width나 
    return(
        <div className={styles.container} >
            <div className={{transform:`scale(${pos.scale})`}} onWheelCapture={onScroll}>
            {children}
            </div>
        </div>
    )
}
export default Center;