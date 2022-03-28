import { useRef, useState } from "react";
import { fabric } from "fabric";
import ColorPicker from "./ColorPicker";
export default function LineSubMenu(props) {
    const canvas = props.canvas;
    
    const isDrawingStraight = useRef(false);
    const color = useRef('black');  //useRef : 값이 바뀌어도 렌더링되지 않음.

    function drawCurve() {
        canvas.off('mouse:down');
        canvas.freeDrawingBrush.color =color.current;
        canvas.off('object:added');
        if (canvas.isDrawingMode) { //곡선 그리기가 꺼져있는 상태에서 곡선버튼을 눌렀을 때  
            canvas.isDrawingMode = false;}
        else{
            canvas.isDrawingMode = true;
        }        
    }


function drawStraight(){
    canvas.isDrawingMode =false;
    console.log(canvas.isDrawingMode);

    var line, isDown;
    canvas.off('object:added');
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
    });
}
    
//     function selectColor(e){
//         const selectedColor = e.target.value;
//         console.log(selectedColor);
//         color.current = selectedColor;
//         canvas.freeDrawingBrush.color = `${color.current}`;

//         if(canvas.getActiveObject()){
//             if(canvas.getActiveObject().type==='line' ||canvas.getActiveObject().type==='path'){
//             const path = canvas.getActiveObject();
//             path.set({stroke: `${selectedColor}`});
//             canvas.renderAll();
//             }
//     }
// }
    return (<>
        <div>
            <button id = "curve" onClick={drawCurve}>
                곡선
            </button>
            <button id='straight' onClick = {drawStraight}>
                직선
            </button>
            &nbsp; &nbsp;
            {/* <input id="color" type="color" onChange={selectColor}/> */}
            <ColorPicker  canvas={canvas} color={color}/>

        </div>
    </>);
}