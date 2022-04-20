import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import ColorPicker from "./ColorPicker";
import {
    TriangleIcon, CircleIcon
    , RectangleIcon
} from "../icons/icons";
import * as common from "./common"
import styles from "./LeftSidebarSubmenu.module.css"

import { EyeTwoTone } from "@ant-design/icons";
import OnelineImage from "./OnlineImage";
import ImageSubmenu from "./ImageSubmenu";


//FIXME:colorpicker선택 후 캔버스 누르면 다른 키 안먹힘 
//TODO: color 가 변할 때 updateState를 하면 스택이 너무 많이 쌓임 어떻게??

export default function FigureSubmenu({ canvas, menu,setMenu }) {
    const figure = ['triangle','rect','circle','image']
    const color = useRef('#FFFFFF');
    var unselectableObject = null;
 
    useEffect(() => {
        console.log('figure')
        if(canvas.getActiveObject()) inputFigureInfo(canvas.getActiveObject())

        canvas.off();
        canvas.on({
            'object:scaling': (e) => {
                inputFigureInfo(e.target)
            },
            'object:added': (e) => {
                canvas.setActiveObject(e.target);
            },
            'selection:updated': (e) => {
                if (e.selected.length === 1) {
                    var object = e.selected[0];
                    var menuType = common.getMenuType(object)
                    console.log(menuType)
                    if (menuType !== 'object-menu') setMenu(menuType);
                    else inputFigureInfo(object);
                }
            },
            'selection:cleared':()=>{
                inputFigureInfo();
            },
            'selection:created':(e)=>{
                console.log(e)
                if(e.selected.length ===1) inputFigureInfo(e.selected[0]) 
                document.getElementById('figure-width').disabled = false;
                document.getElementById('figure-width').disabled = false;
                var object = e.selected[0];
                var menuType = common.getMenuType(object)
                if(menuType !=='object-menu') setMenu(menuType);
                else inputFigureInfo(object);
            },
        })
    }, [menu])

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

    function mouseEventOff() {
        canvas.off('mouse:down');
        canvas.off('mouse:up');
        canvas.off('mouse:move');
        canvas.off('mouse:down:before')
        canvas.off('mouse:up:before')
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

    function addElement(select) {
        mouseEventOff();
        var flag  = false;
        canvas.on('mouse:down:before', (e) => { //마우스 클릭 할 때 객체가 있으면 객체가 선택되기 전에 활성화 해제하고, 선택이 안되도록 함
            flag = true;
            if (e.target && flag) {
                canvas.discardActiveObject();
                e.target.selectable = false;
                unselectableObject = e.target
            }
        });

        canvas.defaultCursor = 'crosshair';


        var figure, rect, circle, triangle, isDown, origX, origY;
        canvas.on('mouse:down', function (o) {
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
                    type: 'triangle'
                });
                figure = triangle;
            }
            canvas.add(figure);

        });
        canvas.on('mouse:move', function (o) {
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
        });
        canvas.on('mouse:up', function (o) {
            isDown = false;
            canvas.defaultCursor = 'default';
            document.getElementById('figure-width').value = Math.round(figure.width);
            document.getElementById('figure-height').value = Math.round(figure.height);
            common.updateStates(canvas);
            flag = false;
            if (unselectableObject) unselectableObject.selectable = true;
            var objects = canvas.getObjects()
            objects.forEach(object => object.selectable = true)
            console.log(objects)

            mouseEventOff();
        });
        canvas.on('mouse:up:before', (e) => {
            var objects = canvas.getObjects();
            objects.forEach(object => object.selectable = false)
        })
    }
    return (
        <div id='object-menu' className={styles.Submenu}>
            <div className={styles.Title}>객체 추가</div>
            <p>
                <RectangleIcon id='add-rect' onClick={() => addElement("rect")} />
                <CircleIcon id='add-circle' onClick={() => addElement("circle")} />
                <TriangleIcon id='add-triangle' onClick={() => addElement("triangle")} />
            </p>
            <p><label> width</label> <input id='figure-width' onClick={activateInput} onSelect={activateInput} onChange={setFigureWidth} type="text" /></p>
            <p><label> height</label> <input id='figure-height' onClick={activateInput} onSelect={activateInput} onChange={setFigureHeight} type="text" /></p>
            <p><label>color</label><ColorPicker canvas={canvas} color={color} /></p>

            <ImageSubmenu canvas={canvas} />
        </div>
    )
}