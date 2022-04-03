import { FontSizeOutlinedIcon ,MenuOutlinedIcon,BorderOutlinedIcon 
    ,AreaChartOutlinedIcon , LineOutlinedIcon  } from "../icons/icons";
import styles from "./LeftSidebarOpened.module.css"

export default function LeftSidebarOpened({toggleMenu}){
    //TODO:버튼함수들 넣기
    
    return(
        <div className={styles.container}>
        <MenuOutlinedIcon onClick={()=>toggleMenu(0)}/>
        <details className={styles.detail} >
            <summary>Shape</summary>
            <p><BorderOutlinedIcon children={"rectangle"}/> rectangle</p>
            <p><BorderOutlinedIcon/> triangle</p>
            <p><BorderOutlinedIcon/> circle</p>
        </details>
        <details className={styles.detail}> 
            <summary>Text</summary>
            <p><FontSizeOutlinedIcon/> Text</p>
        </details>
        <details className={styles.detail}> 
            <summary>Drawing</summary>
            <p><LineOutlinedIcon/> line</p>
            <p><LineOutlinedIcon/> curve</p>
        </details>
        <details className={styles.detail}> 
            <summary>Image</summary>
            <p><AreaChartOutlinedIcon/> from local repository</p>
            <p><AreaChartOutlinedIcon/> from online </p>
        </details>   
        </div>
    );
}