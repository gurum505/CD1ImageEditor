import styles from './Title.module.css'

const Title=()=>{
    return(
        <div className={styles.header}>
            this is Header
            <div className={styles.contents}>
                <div>
                    제목
                </div>
                <div>
                    로고?
                </div>

            </div>
            
        </div>
    )
}
export default Title;