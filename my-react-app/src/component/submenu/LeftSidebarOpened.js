import {
    FontSizeOutlinedIcon, MenuOutlinedIcon
    , AreaChartOutlinedIcon, LineOutlinedIcon, AlignLeftOutlinedIcon
    , AlignCenterOutlinedIcon, AlignRightOutlinedIcon, HighlightOutlinedIcon
    , BoldOutlinedIcon, ItalicOutlinedIcon, TriangleIcon, CircleIcon
    , RectangleIcon, ImageIcon, ImageFromInternetIcon
} from "../icons/icons";
import styles from "./LeftSidebarOpened.module.css"

import { useRef } from "react";
import { fabric } from "fabric";
import ColorPicker from "./ColorPicker";

// 테스트
import OnelineImage from "./OnlineImage";

export default function LeftSidebarOpened({ toggleMenu, currentRoute, canvas,stateRef,objectNumRef }) {

    const color = useRef('black');
    // const canvas= {canvas};
    // console.log(canvas)

    function addRect() {
        canvas.off('mouse:down');
        canvas.defaultCursor = 'crosshair';
        var rect, isDown, origX, origY;


        canvas.on('mouse:down', function (o) {
            isDown = true;
            var pointer = canvas.getPointer(o.e);
            origX = pointer.x; //클릭시 마우스 x좌표
            origY = pointer.y; //클릭시 마우스 y좌표 
            rect = new fabric.Rect({
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                width: pointer.x - origX,
                height: pointer.y - origY,
                angle: 0,
                fill: `${color.current}`,
                transparentCorners: false,
                type: 'rect',
            });
            canvas.add(rect);

        });

        canvas.on('mouse:move', function (o) {
            if (!isDown) return;
            var pointer = canvas.getPointer(o.e);

            if (origX > pointer.x) {
                rect.set({ left: Math.abs(pointer.x) });
            }
            if (origY > pointer.y) {
                rect.set({ top: Math.abs(pointer.y) });
            }

            rect.set({ width: Math.abs(origX - pointer.x) });
            rect.set({ height: Math.abs(origY - pointer.y) });
            canvas.renderAll();
        });

        canvas.on('mouse:up', function (o) {
            //updateModifications(true);
            isDown = false;
            // canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.defaultCursor = 'default';
            canvas.off('mouse:down');
            canvas.off('mouse:move');
            canvas.off('mouse:up');

            //addLayer(rect);

        });
    }

    function Open(currentRoute, detailName) {
        if (currentRoute === detailName) {
            return true;
        } else {
            return false;
        }
    }


    return (
        <div className={styles.container}>
            <MenuOutlinedIcon onClick={() => toggleMenu()} />
            <details className={styles.detail} open={Open(currentRoute, "Rect")}>
                <summary>Shape</summary>
                <p><RectangleIcon onClick={addRect} /><TriangleIcon/><CircleIcon /> </p>
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
                <summary>Image</summary>
                <p>
                    <label>
                        <input type="file" />
                        <ImageIcon />
                    </label>
                    <label>
                        <input type="file" />
                        <ImageFromInternetIcon />
                    </label>
                </p>
                <p><label> width</label> <input type="text" /></p>
                <p> <label> height</label> <input type="text" /></p>
                <label style={{ marginLeft: "15px" }}>효과</label>
                <div className={styles.effectContainer}>
                    <label> blur</label> <input type="range" min="0" max="5" defaultValue="0" step="1" />
                    <label> opacity</label> <input type="range" min="0" max="5" defaultValue="5" step="1" />
                    <label> brightness</label> <input type="range" min="-3" max="3" defaultValue="0" step="1" />
                    <label> pixelate</label> <input type="range" min="0" max="5" defaultValue="0" step="1" />
                </div>

                {/* 테스트 */}
                    <OnelineImage canvas={canvas} stateRef={stateRef} objectNumRef={objectNumRef} />
                <div>
                    
                </div>
            </details>
        </div>
    );
}