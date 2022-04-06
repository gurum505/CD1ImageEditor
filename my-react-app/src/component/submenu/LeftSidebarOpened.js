import { FontSizeOutlinedIcon ,MenuOutlinedIcon
    ,AreaChartOutlinedIcon , LineOutlinedIcon,AlignLeftOutlinedIcon
    ,AlignCenterOutlinedIcon,AlignRightOutlinedIcon,HighlightOutlinedIcon
    ,BoldOutlinedIcon,ItalicOutlinedIcon ,TriangleIcon,CircleIcon
    ,RectangleIcon } from "../icons/icons";
import styles from "./LeftSidebarOpened.module.css"

export default function LeftSidebarOpened({toggleMenu,currentRoute}){

    function Open(currentRoute,detailName){
        if(currentRoute === detailName){
            return true;
        }else{
            return false;
        }
    }

    return(
        <div className={styles.container}>
        <MenuOutlinedIcon onClick={()=>toggleMenu()}/>
        <details className={styles.detail} open={Open(currentRoute,"Rect")}>
            <summary>Shape</summary>
            <p><RectangleIcon/><TriangleIcon/><CircleIcon/> </p>
            <p><label> width</label> <input type="text" /></p>
            <p><label> height</label> <input type="text"/></p>
            <p><label> color</label> <input type="color"/></p>
        </details>
        <details className={styles.detail} open={Open(currentRoute,"Text")}> 
            <summary>Text</summary>
            <p><FontSizeOutlinedIcon/></p>
            <p><label> font size </label><input type="text"/></p>
            <p><label> color </label><input type="color"/></p>
            <label>정렬</label>
            <ul>
                <li>
                <AlignLeftOutlinedIcon />
                </li>
                <li>
                 <AlignCenterOutlinedIcon/>
                </li>
                <li>
                 <AlignRightOutlinedIcon/> 
                </li>
            </ul>
            <label>글꼴</label>
            <ul>
                <li>
                <BoldOutlinedIcon children={"직선 그리기"}/>
                </li>
                <li>
                <ItalicOutlinedIcon children={"자유그리기 모드"}/>
                </li>
            </ul>
        </details>
        <details className={styles.detail} open={Open(currentRoute,"Line")}> 
            <summary>Drawing</summary>
            <p>
            <LineOutlinedIcon/>
            <HighlightOutlinedIcon/>
            </p>
            <p><label> color</label> <input type="color"/></p>
        </details>
        <details className={styles.detail} open={Open(currentRoute,"Image")}> 
            <summary>Image</summary>
            <p>
            <label>
                <input type="file"/>
                <AreaChartOutlinedIcon/>
            </label>
            <label>
                <input type="file"/>
                <AreaChartOutlinedIcon/>
            </label>
            </p>
            <p><label> width</label> <input type="text"/></p>
            <p> <label> height</label> <input type="text"/></p>
            <label>효과</label>
            <div className={styles.effectContainer}>
                <label> blur</label> <input type="range" min="0" max="5" defaultValue="0" step="1" />
                <label> opacity</label> <input type="range" min="0" max="5" defaultValue="5" step="1"/>
                <label> brightness</label> <input type="range" min="-3" max="3" defaultValue="0" step="1" />
                <label> pixelate</label> <input type="range" min="0" max="5" defaultValue="0" step="1" />
            </div>
            
            

        </details>   
        </div>
    );
}