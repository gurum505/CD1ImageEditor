import styles from './Footbar.module.css'


const Footbar=()=>{
    return(
        <div className={styles.footbar}>
            <div className={styles.contents}>
                <h2 className={styles.title}>
                    this is footbar
                </h2>
            </div>
        </div>
    )
}

export default Footbar;
