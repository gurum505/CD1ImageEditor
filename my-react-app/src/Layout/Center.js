import styles from './Center.module.css'
const Center=({children})=>{
    
    return(
        <div className={styles.container} >
            <div>
            {children}
            </div>
        </div>
    )
}
export default Center;