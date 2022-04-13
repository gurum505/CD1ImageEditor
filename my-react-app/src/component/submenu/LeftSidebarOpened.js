import {FontSizeOutlinedIcon, MenuOutlinedIcon
    , LineOutlinedIcon, AlignLeftOutlinedIcon
    , AlignCenterOutlinedIcon, AlignRightOutlinedIcon, HighlightOutlinedIcon
    , BoldOutlinedIcon, ItalicOutlinedIcon, TriangleIcon, CircleIcon
    , RectangleIcon, ImageIcon, ImageFromInternetIcon,UnderlineOutlinedIcon
} from "../icons/icons";
import styles from "./LeftSidebarOpened.module.css"


export default function LeftSidebarOpened({ toggleMenu, currentRoute}) {


    //detail 한메뉴가 열리면 나머지가 닫히는 함수
    //필요없을 시 그냥 삭제
    //click으로 구현은 너무 비효율적
    
    // window.addEventListener('DOMContentLoaded', function(){
    //     console.log("DOMLoaded");
    //     document.querySelectorAll('details').forEach(function(item){
    //         item.addEventListener("toggle", event => {
    //         let toggled = event.target;
    //         if (toggled.attributes.open) {
    //           document.querySelectorAll('details[open]').forEach(function(opened){
    //               if(toggled !== opened)
    //                 opened.removeAttribute('open'); 
    //           });
    //         }
    //       })
    //     });
    // });

    function Open(currentRoute, detailName) {
        if (currentRoute === detailName) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <>
        <MenuOutlinedIcon onClick={() => toggleMenu()} />
            <div className={styles.container}>
            <details className={styles.detail} open={Open(currentRoute, "Object")}>
                <summary>Object</summary>
                <p><RectangleIcon /><TriangleIcon /><CircleIcon /> </p>
                <p><ImageIcon htmlFor={"put htmlfor"} children={"from file"}/>
                <ImageFromInternetIcon htmlFor={"put htmlFor"} children={"from internet"}/></p>
                <p><label> width</label> <input type="text" /></p>
                <p><label> height</label> <input type="text" /></p>
                <p><label> color</label> <input type="color" /></p>
            </details>
            <details className={styles.detail} open={Open(currentRoute, "Text")}>
                <summary>Text</summary>
                <p><FontSizeOutlinedIcon /></p>
                <p><label> font size </label><input type="text" /></p>
                <p><label> color </label><input type="color" /></p>
                <label style={{ marginLeft: "15px" }}>align</label>
                <ul>
                    <li>
                        <AlignLeftOutlinedIcon />
                    </li>
                    <li>
                        <AlignCenterOutlinedIcon />
                    </li>
                    <li>
                        <AlignRightOutlinedIcon />
                    </li>
                </ul>
                <label style={{ marginLeft: "15px" }}>style</label>
                <ul>
                    <li>
                        <BoldOutlinedIcon />
                    </li>
                    <li>
                        <ItalicOutlinedIcon  />
                    </li>
                    <li>
                        <UnderlineOutlinedIcon />
                    </li>
                </ul>
            </details>
            <details className={styles.detail} open={Open(currentRoute, "Line")}>
                <summary>Drawing</summary>
                <p>
                    <LineOutlinedIcon  children={"직선 그리기"}/>
                    <HighlightOutlinedIcon children={"자유그리기 모드"}/>
                </p>
                <p><label> effect</label> 
                    <select>
                        <option>Pencil</option>
                        <option>Circle</option>
                        <option>Spray</option>
                        <option>hLine</option>
                        <option>vline</option>
                        <option>Square</option>
                        <option>Diamond</option>
                    </select>
                </p>
                <p><label> color</label> <input type="color" /></p>
                {/* <label style={{ marginLeft: "15px" }}>effect</label> */}
                <div className={styles.effectContainer}>
                    <label> line width</label> <input type="range" defaultValue="30" min="0" max="150" step="1"  />
                    <label> shadow width</label><input type="range" defaultValue="0" min="0" max="50" step="1" />
                    <label> shadow offset</label><input type="range"  defaultValue="0" min="0" max="50" step="1"/>
                </div>
                
            </details>
            <details className={styles.detail} open={Open(currentRoute, "Image")}>
                <summary>Canvas</summary>
                <p><label> width</label> <input type="text" /></p>
                <p> <label> height</label> <input type="text" /></p>
                <label style={{ marginLeft: "15px" }}>filter</label>
                <div className={styles.effectContainer}>
                    <label> brightness</label> <input type="range" defaultValue="0" min="-1" max="1" step="0.003921" />
                    <label> gamma(RGB)</label> 
                        <input type="range" defaultValue="1" min="0.2" max="2.2" step="0.003921" />
                        <input type="range" defaultValue="1" min="0.2" max="2.2" step="0.003921" />
                        <input type="range" defaultValue="1" min="0.2" max="2.2" step="0.003921" />
                    <label> contrast</label> <input type="range" defaultValue="0" min="-1" max="1" step="0.003921" />
                    <label> noise</label> <input type="range" defaultValue="0" min="0" max="600" step="50" />
                    <label> pixelate</label> <input type="range"defaultValue="1" min="1" max="20" step="3"/>
                    <label> blur</label> <input type="range" defaultValue="0" min="0" max="1" step="0.1" />
                    <label> 뭐 다른필터</label> <input type="range" defaultValue="0" min="0" max="1" step="0.1" />
                </div>
            </details>
        </div>
        </>
    );
}