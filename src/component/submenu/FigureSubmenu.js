import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import ColorPicker from "./ColorPicker";
import {
    TriangleIcon, CircleIcon
    , RectangleIcon
} from "../icons/icons";
import * as common from "./common"
// import styles from "./LeftSidebarSubmenu.module.css"
import styles from "../../Layout/LeftSidebar.module.css"

import { EyeTwoTone } from "@ant-design/icons";
import OnelineImage from "./OnlineImage";
import ImageSubmenu from "./ImageSubmenu";


//FIXME:colorpicker선택 후 캔버스 누르면 다른 키 안먹힘 
//TODO: color 가 변할 때 updateState를 하면 스택이 너무 많이 쌓임 어떻게??

export default function FigureSubmenu({ canvas, addLayerItem  }) {
    const figureList = ['triangle', 'rect', 'circle', 'image']
    const color = useRef('#FFFFFF');
    var figure, rect, circle, triangle, isDown, origX, origY;
    // console.log(canvas)

    function inputFigureInfo(object) { // figure-width, figure-height id를 갖는 input 영역에 도형의 크기 정보 입력  
        if (!object) {
            document.getElementById('figure-width').value = '';
            document.getElementById('figure-height').value = '';
            document.getElementById('color').value = color.current;
            deactivateInput();
        }
        else {
            document.getElementById('figure-width').value = Math.round(object.getScaledWidth());
            document.getElementById('figure-height').value = Math.round(object.getScaledHeight());
            document.getElementById('color').value = object.fill;
        }
    }

    function setFigureWidth(e) {
        var objects = canvas.getActiveObjects();
        var value;
        objects.forEach(object => {
            if (!e.target.value) value = 10 //값이 없을 때 객체가 사라지는 것을 방지
            else value = parseInt(e.target.value);
            object.set('width', value)
            canvas.renderAll();
        })
    }

    function setFigureHeight(e) {
        var objects = canvas.getActiveObjects();
        var value;
        objects.forEach(object => {
            if (!e.target.value) value = 10
            else value = parseInt(e.target.value);
            object.set('height', value)
            canvas.renderAll();
        })
    }

    function activateInput(e) {
        window.onkeydown = null;
        e.target.disabled = false;
    }

    function deactivateInput() {
        document.getElementById('figure-width').disabled = true;
        document.getElementById('figure-height').disabled = true;
        window.onkeydown = (e) => common.keyDownEvent(canvas, e);
    }


    var flag = false;
    var unselectableObject = null;

    function addElement(select) {
        
        common.mouseEventOff(canvas);

        canvas.defaultCursor = 'crosshair';   
        
        canvas.on('mouse:down:before',(e)=>{
            flag = true;
            if (e.target && flag) {
                canvas.discardActiveObject();
                e.target.selectable = false;
                unselectableObject = e.target
            }

            canvas.on({
                'mouse:down':(o)=>{
                    isDown = true;
                    var pointer = canvas.getPointer(o.e);
                    origX = pointer.x; //클릭시 마우스 x좌표
                    origY = pointer.y; //클릭시 마우스 y좌표 
                    if (select === "rect") {
                        rect = new fabric.Rect({
                            left: origX,
                            top: origY,
                            originX: 'left',
                            originY: 'top',
                            width: pointer.x - origX,
                            height: pointer.y - origY,
                            noScaleCache: true,
                            angle: 0,
                            fill: color.current,
                            type: 'rect',
                            id: ++canvas.objectNum,
                        });
                        figure = rect;
                    } else if (select === "circle") {
                        circle = new fabric.Circle({
                            left: origX,
                            top: origY,
                            originX: 'left',
                            originY: 'top',
                            radius: (pointer.x - origX) / 2, 
                            fill: color.current,
                            id: ++canvas.objectNum,
                            type: 'circle'
                        });
                        figure = circle;
                    } else if (select === "triangle") {
                        triangle = new fabric.Triangle({
                            left: origX,
                            top: origY,
                            originX: 'left',
                            originY: 'top',
                            width: pointer.x - origX,
                            height: pointer.y - origY,
                            angle: 0,
                            fill: color.current,
                            id: ++canvas.objectNum,
                            type: 'triangle',
                        });
                        figure = triangle;
                    }
                    figure.on('modified',()=>common.inputFigureInfo(figure));
                    console.log(figure)
                    console.log(figure.group)
                    canvas.add(figure);
                    
                    canvas.setActiveObject(figure)
                },
    
                'mouse:move':(o)=>{
                    if (!isDown) return;
                    var pointer = canvas.getPointer(o.e);
            
                    if (origX > pointer.x) {
                        figure.set({ left: Math.abs(pointer.x) });
                    }
                    if (origY > pointer.y) {
                        figure.set({ top: Math.abs(pointer.y) });
                    }
            
                    if (select === "circle") {
                        figure.set({ radius: Math.abs(origX - pointer.x) / 2 });
                    } else {
                        figure.set({ width: Math.abs(origX - pointer.x) });
                        figure.set({ height: Math.abs(origY - pointer.y) });
                    }
                    canvas.renderAll();
                },
    
                'mouse:up:before':()=>{
                    var objects = canvas.getObjects()
                    objects.forEach(object => {object.selectable = false});
                },
    
                'mouse:up':()=>{
                    canvas.defaultCursor = 'default';
                    document.getElementById('figure-width').value = Math.round(figure.width);
                    document.getElementById('figure-height').value = Math.round(figure.height);
            
                    flag = false;
                    if(unselectableObject && unselectableObject.main!==true) unselectableObject.selectable=true;
                    var objects = canvas.getObjects();
                    objects.forEach(object =>{
                     if(object.main!==true)
                     object.selectable = true})
                    common.updateStates(canvas);
                    common.mouseEventOff(canvas);
                    // common.addLayer(canvas,figure)
                    addLayerItem(canvas,figure.toDataURL());

                }
            })
               
        })
       
    }
    return (
        <div id='figure-menu' className={styles.Submenu}>
            <div className={styles.Title}>Add Object</div>
            <p>
                <RectangleIcon id='add-rect' onClick={() => addElement("rect")} />
                <CircleIcon id='add-circle' onClick={() => addElement("circle")} />
                <TriangleIcon id='add-triangle' onClick={() => addElement("triangle")} />
            </p>
            <p><label> width</label> <input id='figure-width' onClick={activateInput} onSelect={activateInput} onChange={setFigureWidth} type="text" /></p>
            <p><label> height</label> <input id='figure-height' onClick={activateInput} onSelect={activateInput} onChange={setFigureHeight} type="text" /></p>
            <p><label>color</label><ColorPicker canvas={canvas}  addLayerItem={addLayerItem} color={color} /></p>
            <ImageSubmenu canvas={canvas} />
        </div>
    )
}