import styles from './Title.module.css'
import {GithubOutlined} from "@ant-design/icons"
const Title=()=>{
    return(
        <div className={styles.header}>
            
            <div className={styles.contents}>
                <h1>
                    CDImageEditor  
                    <GithubOutlined/>
                </h1>
                <h3>
                    <span>Fabric  </span>
                    <span>React  </span>
                    <span>HTML5  </span>
                </h3>
            </div>
            
        </div>
    )
}
export default Title;