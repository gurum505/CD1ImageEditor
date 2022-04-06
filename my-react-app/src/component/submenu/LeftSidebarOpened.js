import { FontSizeOutlinedIcon ,MenuOutlinedIcon,BorderOutlinedIcon 
    ,AreaChartOutlinedIcon , LineOutlinedIcon  } from "../icons/icons";
import styles from "./LeftSidebarOpened.module.css"

import {useRef } from "react";
import { fabric } from "fabric";
import ColorPicker from "./ColorPicker";

export default function LeftSidebarOpened({toggleMenu, canvas}){
    //TODO:버튼함수들 넣기
    //TODO: image 넣을때 input typefile 버튼 안보이게 혹은 교체
    //https://stackoverflow.com/questions/572768/styling-an-input-type-file-button
    //canvas가 아니라 canvasRef를 가져오니까 되네??? 뭐여
    
    const color = useRef('black');
    // const canvas= {canvas};
    console.log(canvas)

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

    
    function addLocalImage(e) {
        canvas.isDrawingMode = false;
        const reader = new FileReader();
		const file = e.target.files[0];
		reader.onload = () => {
			new fabric.Image.fromURL(reader.result, (image) => {
				image.scale(0.75);
				canvas.add(image).setActiveObject(image);
                //updateModifications(true);
                //addLayer(img);
				canvas.renderAll();
			});
		};
		reader.readAsDataURL(file);
    }

    function drawStraight() {
        canvas.defaultCursor = 'crosshair';
        canvas.isDrawingMode = false;
        canvas.off('mouse:down');
        canvas.off('mouse:up');
        var line, isDown;
        canvas.on('mouse:down', function (o) {
            var pointer = canvas.getPointer(o.e);
            var points = [pointer.x, pointer.y, pointer.x, pointer.y];
            isDown = true;
            line = new fabric.Line(points, {
                strokeWidth: 5,
                fill: 'red',
                stroke: `${color.current}`,
                originX: 'center',
                originY: 'center',
            });
            canvas.add(line);
        });

        canvas.on('mouse:move', function (o) {

            if (!isDown) return;
            var pointer = canvas.getPointer(o.e);

            line.set({ x2: pointer.x, y2: pointer.y });
            canvas.renderAll();

        });
        canvas.on('mouse:up', function (o) {

            isDown = false;
            canvas.off('mouse:down');
            canvas.off('mouse:up');
            //updateModifications(true);
            //addLayer(line);
            canvas.defaultCursor = 'default';

        });
    }


    return(
        <div className={styles.container}>
        <MenuOutlinedIcon onClick={()=>toggleMenu()}/>
        <details className={styles.detail} >
            <summary>Shape</summary>
            <p onClick={addRect}><BorderOutlinedIcon/> rectangle</p>
            <p><BorderOutlinedIcon/> triangle</p>
            <p><BorderOutlinedIcon/> circle</p>
        </details>
        <details className={styles.detail}> 
            <summary>Text</summary>
            <p onClick={addTextBox}><FontSizeOutlinedIcon/> Text</p>
        </details>
        <details className={styles.detail}> 
            <summary>Drawing</summary>
            <p onClick={drawStraight}><LineOutlinedIcon/> line</p>
            <p><LineOutlinedIcon/> curve</p>
        </details>
        <details className={styles.detail}> 
            <summary>Image</summary>
            <p><label>
                <input type="file" onChange={(e)=>addLocalImage(e)}/>
                <AreaChartOutlinedIcon/> from local repository
            </label></p>
            
            <p><AreaChartOutlinedIcon/> from online </p>
        </details>   
        </div>
    );
}