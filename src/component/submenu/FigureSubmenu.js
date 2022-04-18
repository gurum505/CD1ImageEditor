import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import ColorPicker from "./ColorPicker";
import {
    TriangleIcon, CircleIcon
    , RectangleIcon
} from "../icons/icons";
import * as common from "./common"


//FIXME:colorpicker선택 후 캔버스 누르면 다른 키 안먹힘 
//TODO: color 가 변할 때 updateState를 하면 스택이 너무 많이 쌓임 어떻게??

export default function FigureSubmenu(props) {
    const canvas = props.canvas;
<<<<<<< HEAD
    var colorRef = useRef('#000000'); // default color black 
=======
    const color = useRef('white');
>>>>>>> dd3791231c766f1d460c18b49841b2a538664f74

    console.log('figuresubmenu 렌더링 ')

    
    useEffect(()=>{
        window.onkeydown = (e) => common.keyDownEvent(canvas, e);

        canvas.on(
            {   
                'selection:cleared': (e) => {  // 크기 조정 마치고(캔버스 클릭) 크기 조절 값 입력 못하게 
                    window.onkeydown=(e)=>common.keyDownEvent(canvas,e);
                    try{
                    document.getElementById('figure-width').readOnly = true;
                    document.getElementById('figure-height').readOnly = true;
                    document.getElementById('figure-color').readOnly = true;
                    inputFigureInfo();} catch(e){console.log("수정필요")}

                },
                'selection:created': (e) => {
                    if (e.selected.length === 1) var object = e.selected[0]
                    inputFigureInfo(object);
                },
                'selection:updated': (e) => {
                    if (e.selected.length === 1) var object = e.selected[0]
                    inputFigureInfo(object);
                },
                'object:added': (e) => {
                    var object = e.target;
                    inputFigureInfo(object);
                }
            })
    },[])

    function inputFigureInfo(object){ // figure-width, figure-height id를 갖는 input 영역에 도형의 크기 정보 입력 
        if(object.main) return;
        if (!object) {
            document.getElementById('figure-width').value = '';
            document.getElementById('figure-height').value = '';
            document.getElementById('figure-color').value = colorRef.current;
        }
        else {
            document.getElementById('figure-width').value = Math.round(object.width);
            document.getElementById('figure-height').value = Math.round(object.height);
            document.getElementById('figure-color').value = object.fill;
        }
    }
    function mouseEventOff() {
        canvas.off('mouse:down');
        canvas.off('mouse:up');
        canvas.off('mouse:move');
        // document.getElementById('add-rect').disabled =false;
        // document.getElementById('add-circle').disabled =false;
        // document.getElementById('add-triangle').disabled =false;
    }

    function addElement(select) {
        mouseEventOff();
        console.log('gdgdgd')
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
                    fill: colorRef.current,
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
                    fill: colorRef.current,
                    id: ++canvas.objectNum,
                    type:'circle'
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
                    fill: colorRef.current,
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
            mouseEventOff();
            props.addLayerItem(canvas,figure.toDataURL());
            common.modifyLayer(figure);
            common.updateStates(canvas);
<<<<<<< HEAD

            document.getElementById('figure-width').value = Math.round(figure.width);
            document.getElementById('figure-height').value = Math.round(figure.height);
            console.log(figure)
=======
            canvas.discardActiveObject(figure)
            
>>>>>>> dd3791231c766f1d460c18b49841b2a538664f74
        });
    }

    // canvas.on('selection:created',()=>{
    //     document.getElementById('figure-width').readOnly = false;

    // })
   


    function setFigureWidth(e) {
        var objects = canvas.getActiveObjects();
        var value;
        objects.forEach(object => {
            if (!e.target.value) value = 10
            else value = parseInt(e.target.value);
            object.set('width', value)
            common.modifyLayer(object)
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
            common.modifyLayer(object)
            canvas.renderAll();
        })
    }

    function activateInput(e) {
        window.onkeydown=null;
        e.target.readOnly = false;
    }

    return (
        <>
            <div>
                <p>
                    <RectangleIcon id='add-rect' onClick={() => addElement("rect")} />
                    <CircleIcon id='add-circle' onClick={() => addElement("circle")} />
                    <TriangleIcon id='add-triangle' onClick={() => addElement("triangle")} />
                </p>
                <p><label> width</label> <input id='figure-width' onClick={activateInput} onChange={setFigureWidth} type="text" /></p>
                <p><label> height</label> <input id='figure-height' onClick={activateInput} onChange={setFigureHeight} type="text" /></p>
                <p><label>color</label><ColorPicker canvas={canvas}  colorRef={colorRef} /></p>
            </div>
        </>
    )
}