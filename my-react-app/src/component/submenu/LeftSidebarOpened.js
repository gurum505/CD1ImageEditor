import {FontSizeOutlinedIcon, MenuOutlinedIcon
    , LineOutlinedIcon, AlignLeftOutlinedIcon
    , AlignCenterOutlinedIcon, AlignRightOutlinedIcon, HighlightOutlinedIcon
    , BoldOutlinedIcon, ItalicOutlinedIcon, TriangleIcon, CircleIcon
    , RectangleIcon, ImageIcon, ImageFromInternetIcon
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
                <p><ImageIcon htmlFor={"put htmlfor"} children={"from file"}/><ImageFromInternetIcon htmlFor={"put htmlFor"} children={"from internet"}/></p>
                <p><label> width</label> <input type="text" /></p>
                <p><label> height</label> <input type="text" /></p>
                <p><label> color</label> <input type="color" /></p>
            </details>
            <details className={styles.detail} open={Open(currentRoute, "Text")}>
                <summary>Text</summary>
                <p><FontSizeOutlinedIcon /></p>
                <p><label> font size </label><input type="text" /></p>
                <p><label> color </label><input type="color" /></p>
                <label style={{ marginLeft: "15px" }}>정렬</label>
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
                <label style={{ marginLeft: "15px" }}>글꼴</label>
                <ul>
                    <li>
                        <BoldOutlinedIcon children={"직선 그리기"} />
                    </li>
                    <li>
                        <ItalicOutlinedIcon children={"자유그리기 모드"} />
                    </li>
                </ul>
            </details>
            <details className={styles.detail} open={Open(currentRoute, "Line")}>
                <summary>Drawing</summary>
                <p>
                    <LineOutlinedIcon />
                    <HighlightOutlinedIcon />
                </p>
                <p><label> color</label> <input type="color" /></p>
            </details>
            <details className={styles.detail} open={Open(currentRoute, "Image")}>
                <summary>Canvas</summary>
                <p><label> width</label> <input type="text" /></p>
                <p> <label> height</label> <input type="text" /></p>
                <label style={{ marginLeft: "15px" }}>필터</label>
                <div className={styles.effectContainer}>
                    <label> blur</label> <input type="range" min="0" max="5" defaultValue="0" step="1" />
                    <label> opacity</label> <input type="range" min="0" max="5" defaultValue="5" step="1" />
                    <label> brightness</label> <input type="range" min="-3" max="3" defaultValue="0" step="1" />
                    <label> pixelate</label> <input type="range" min="0" max="5" defaultValue="0" step="1" />
                </div>



            </details>
        </div>
        </>
    );
}