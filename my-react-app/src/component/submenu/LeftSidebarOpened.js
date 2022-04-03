import { FontSizeOutlinedIcon ,MenuOutlinedIcon,BorderOutlinedIcon 
    ,AreaChartOutlinedIcon , LineOutlinedIcon  } from "../icons/icons";
import styles from "./LeftSidebarOpened.module.css"

import {useRef } from "react";
import { fabric } from "fabric";
import ColorPicker from "./ColorPicker";

export default function LeftSidebarOpened({toggleMenu, canvas}){
    //TODO:버튼함수들 넣기

    const color = useRef('black');

    function addTextBox() {
        canvas.defaultCursor = 'text';
        canvas.on('mouse:down', (o) => {
            const pointer = canvas.getPointer(o.e);
            //addTextBox();
            var textbox = new fabric.Textbox('내용 입력', {
                width: 250,
                fill: `${color.current}`,
                left: pointer.x - 125,
                top: pointer.y - 20,
            });
            canvas.add(textbox);
            //updateModifications(true);
            //addLayer(textbox);
            canvas.off('mouse:down');
            canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.defaultCursor = 'default';
        });
    }

    return(
        <div className={styles.container}>
        <MenuOutlinedIcon onClick={()=>toggleMenu(0)}/>
        <details className={styles.detail} >
            <summary>Shape</summary>
            <p><BorderOutlinedIcon/> rectangle</p>
            <p><BorderOutlinedIcon/> triangle</p>
            <p><BorderOutlinedIcon/> circle</p>
        </details>
        <details className={styles.detail}> 
            <summary>Text</summary>
            <p onClick={addTextBox}><FontSizeOutlinedIcon/> Text</p>
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