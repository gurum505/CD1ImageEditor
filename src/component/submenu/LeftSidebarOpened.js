import { MenuOutlinedIcon } from "../icons/icons";
import styles from "./LeftSidebarOpened.module.css"
import FigureSubmenu from './FigureSubmenu'
import TextBoxSubmenu from "./TextBoxSubmenu";
import LineSubmenu from "./LineSubmenu";
import ImageSubmenu from './ImageSubmenu';
import FilterSubmenu from './FilterSubmenu';
import CropSubmenu from "./CropSubmenu";
import { useState } from "react";
export default function LeftSidebarOpened(props) {
    const { toggleMenu, currentRoute, canvas, setCanvas } = props;
    //detail 한메뉴가 열리면 나머지가 닫히는 함수
    //필요없을 시 그냥 삭제
    //click으로 구현은 너무 비효율적
    // const details = document.querySelectorAll("details");
    // details.forEach((targetDetail) => {
    // targetDetail.addEventListener("click", () => {
    //     details.forEach((detail) => {
    //     if (detail !== targetDetail) {
    //         detail.removeAttribute("open");
    //     }
    //     });
    // });

    const [selectedButtonType, setSelectedButtonType] = useState('');

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
            <div id='opened-leftbar' className={styles.container}>
                <details id="object-menu" className={styles.detail} open={Open(currentRoute, "Object")}>
                    <summary>Object</summary>
                    <FigureSubmenu canvas={canvas} addLayerItem={props.addLayerItem} />
                    <ImageSubmenu canvas={canvas} />
                </details>

                {<details id='textbox-menu' className={styles.detail} open={Open(currentRoute, "Text")}>
                    <summary>Text</summary>
                    <TextBoxSubmenu canvas={canvas} />
                </details>}

                <details id='drawing-menu' className={styles.detail} open={Open(currentRoute, "Line")}>
                    <summary>Drawing</summary>
                    <LineSubmenu canvas={canvas} />
                </details>

                <details id='filter-menu' className={styles.detail} open={Open(currentRoute, "Image")}>
                    <summary>Canvas</summary>
                    <FilterSubmenu canvas={canvas} />
                </details>

                <details id='crop-menu' className={styles.detail} open={Open(currentRoute, "Crop")}>
                    <summary>Crop</summary>
                    <CropSubmenu canvas={canvas} setCanvas={setCanvas} />
                </details>
            </div>
        </>
    );
}