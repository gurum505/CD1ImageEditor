import styles from './Footbar.module.css'
import {ZoomInOutlinedIcon,ZoomOutOutlinedIcon,
    ExpandOutlinedIcon,EyeOutlinedIcon} from "../component/icons/icons"

const Footbar=()=>{
    return(
        <div className={styles.footbar}>
            <div className={styles.contents}>
                <h2 className={styles.title}>
                </h2>

                    <ZoomOutOutlinedIcon children={"줌아웃"}/>
                    <ZoomInOutlinedIcon children={"줌인"}/>
                    <ExpandOutlinedIcon children={"비율에 맞추기"}/>
                    <EyeOutlinedIcon children={"미리보기"}/>
            </div>
        </div>
    )
}

export default Footbar;
