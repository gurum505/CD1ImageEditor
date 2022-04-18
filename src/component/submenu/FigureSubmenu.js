import { useRef } from "react";
import { fabric } from "fabric";
import ColorPicker from "./ColorPicker";
import {
    TriangleIcon, CircleIcon
    , RectangleIcon
} from "../icons/icons";
import * as common from "./common"


//FIXME:colorpicker선택 후 캔버스 누르면 다른 키 안먹힘 
export default function FigureSubmenu(props) {
    window.onkeydown=(e)=>common.keyDownEvent(canvas,e);
    const canvas = props.canvas;
    const color = useRef('white');


    function mouseEventOff() {
        canvas.off('mouse:down');
        canvas.off('mouse:up');
        canvas.off('mouse:move');
        // document.getElementById('add-rect').disabled =false;
        // document.getElementById('add-circle').disabled =false;
        // document.getElementById('add-triangle').disabled =false;
    }

    function addElement(select){
        mouseEventOff();
        canvas.defaultCursor = 'crosshair';
        var figure,rect,circle,triangle,isDown, origX, origY;
        canvas.on('mouse:down', function (o) {
            isDown = true;
            var pointer = canvas.getPointer(o.e);
            origX = pointer.x; //클릭시 마우스 x좌표
            origY = pointer.y; //클릭시 마우스 y좌표 
            if (select==="rect"){
                rect = new fabric.Rect({
                    left: origX,
                    top: origY,
                    originX: 'left',
                    originY: 'top',
                    width: pointer.x - origX,
                    height: pointer.y - origY,
                    noScaleCache:true,
                    angle: 0,
                    fill: `${color.current}`,
                    type: 'rect',
                    id: ++canvas.objectNum,
                });
                figure=rect;
            }else if(select==="circle"){
                circle = new fabric.Circle({
                    left: origX,
                    top: origY,
                    originX: 'left',
                    originY: 'top',
                    radius: (pointer.x - origX) / 2,
                    fill: `${color.current}`,
                    id: ++canvas.objectNum,
                });
                figure=circle;
            }else if(select==="triangle"){
                triangle = new fabric.Triangle({
                    left: origX,
                    top: origY,
                    originX: 'left',
                    originY: 'top',
                    width: pointer.x - origX,
                    height: pointer.y - origY,
                    angle: 0,
                    fill: `${color.current}`,
                    id: ++canvas.objectNum,
                    type: 'triangle'
                });
                figure=triangle;
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

            if(select==="circle"){
                figure.set({ radius: Math.abs(origX - pointer.x) / 2 });
            }else{
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
            // common.modifyLayer(figure);
            common.updateStates(canvas);
        });

    }

    function setFigureWidth(e){
        window.onkeydown=null;
        var objects = canvas.getActiveObjects();
        objects.forEach(object=>{
            object.width = parseInt(e.target.value);
        canvas.renderAll(); 
        })
        window.onkeydown=(e)=>common.keyDownEvent(canvas,e);
    }
    function setFigureHeight(e){
        window.onkeydown=null;
        var objects = canvas.getActiveObjects();
        objects.forEach(object=>{
            object.height = parseInt(e.target.value);
        canvas.renderAll(); 
        })
        window.onkeydown=(e)=>common.keyDownEvent(canvas,e);

    }

    return (
        <>
            <div>
                <p>
                    <RectangleIcon id='add-rect' onClick={()=>addElement("rect")} />
                    <CircleIcon id='add-circle' onClick={()=>addElement("circle")} />
                    <TriangleIcon id='add-triangle' onClick={()=>addElement("triangle")} />
                </p>
                <p><label> width</label> <input id='figure-width' onChange={setFigureWidth}type="text" /></p>
                <p><label> height</label> <input id='figure-height' onChange={setFigureHeight}type="text" /></p>
                <p><label>color</label><ColorPicker canvas={canvas} color={color} /></p>
            </div>
        </>
    )
}