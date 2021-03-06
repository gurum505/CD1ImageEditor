import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import ColorPicker from "./ColorPicker";
import * as common from "./common"
// import styles from "./LeftSidebarSubmenu.module.css"
import styles from "../../Layout/LeftSidebar.module.css"

import {
    LineOutlinedIcon
    , HighlightOutlinedIcon
} from "../icons/icons";
export default function LineSubmenu({ canvas,addLayerItem }) {
    const color = useRef('#FFFFFF');  // : 값이 바뀌어도 렌더링되지 않음.
    var unselectableObject = null;

    function inputDrawingInfo(object) {
        console.log("그리기 정보 ")
    }

    function drawCurve() {
        
        canvas.freeDrawingBrush.color = color.current;

        if (canvas.isDrawingMode) { //곡선 그리기가 꺼져있는 상태에서 곡선버튼을 눌렀을 때  
            canvas.isDrawingMode = false;
            canvas.off('mouse:up')
            canvas.defaultCursor = 'default';
            return;
        }
        else {
            canvas.isDrawingMode = true;
            canvas.defaultCursor = 'crosshair';
        }
        canvas.on('mouse:up', () => {
            canvas.item(canvas.getObjects().length - 1).set({
                id: ++canvas.objectNum,
                selectable: false
            })
            common.updateStates(canvas);
        })
    }


    function drawStraight() {
        
        common.mouseEventOff(canvas);

        canvas.defaultCursor = 'crosshair';
        canvas.isDrawingMode = false;

        var line, isDown;
        var flag = false;

        canvas.on({
            'mouse:down:before': (e) => {
                flag = true;
                if (e.target && flag) {
                    canvas.discardActiveObject();
                    e.target.selectable = false;
                    unselectableObject = e.target
                }

                canvas.on({
                    'mouse:down':(o)=>{
                        var pointer = canvas.getPointer(o.e);
                        var points = [pointer.x, pointer.y, pointer.x, pointer.y];
                        isDown = true;
                        line = new fabric.Line(points, {
                            strokeWidth: 5,
                            fill: 'red',
                            stroke: `${color.current}`,
                            originX: 'center',
                            originY: 'center',
                            id: ++canvas.objectNum,
                        });
                        canvas.add(line);
                        canvas.setActiveObject(line)
                    },
                    'mouse:move':(o)=>{
                        if (!isDown) return;
                        var pointer = canvas.getPointer(o.e);
        
                        line.set({ x2: pointer.x, y2: pointer.y });
                        canvas.renderAll();
                    },
                    'mouse:up':(o)=>{
                        isDown = false;
                        flag = false;
                        
                        canvas.defaultCursor = 'default';
                        
                        if (unselectableObject && unselectableObject.main!==true) unselectableObject.selectable = true;
                        
                        var objects = canvas.getObjects();
                        objects.forEach(object => { 
                            if(object.main!==true) object.selectable = true; })
                        // addLayerItem(canvas,line.toDataURL())
                        common.addLayer(canvas,line)
                        common.updateStates(canvas);
                        common.mouseEventOff(canvas);
                    },
                    'mouse:up:before': () => {
                        var objects = canvas.getObjects();
                        objects.forEach(object => { object.selectable = false; })
                    }
                 })
                }
            })
        }
            
           

    var circleBrush = new fabric.CircleBrush(canvas);
    var sprayBrush = new fabric.SprayBrush(canvas);
    var pencilBrush = new fabric.PencilBrush(canvas);
    var hLinePatternBrush = new fabric.PatternBrush(canvas);
    var vLinePatternBrush = new fabric.PatternBrush(canvas);
    var squarePatternBrush = new fabric.PatternBrush(canvas);
    var diamondPatternBrush = new fabric.PatternBrush(canvas);

    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: 0,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: color.current,
    });
    hLinePatternBrush.getPatternSrc = function () {

        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = 10;
        var ctx = patternCanvas.getContext('2d');

        ctx.strokeStyle = color.current;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(5, 0);
        ctx.lineTo(5, 10);
        ctx.closePath();
        ctx.stroke();

        return patternCanvas;
    };

    vLinePatternBrush.getPatternSrc = function () {
        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = 10;
        var ctx = patternCanvas.getContext('2d');

        ctx.strokeStyle = color.current;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(10, 5);
        ctx.closePath();
        ctx.stroke();

        return patternCanvas;
    };

    squarePatternBrush.getPatternSrc = function () {

        var squareWidth = 10, squareDistance = 2;

        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
        var ctx = patternCanvas.getContext('2d');

        ctx.fillStyle = color.current;
        ctx.fillRect(0, 0, squareWidth, squareWidth);

        return patternCanvas;
    };

    diamondPatternBrush.getPatternSrc = function () {

        var squareWidth = 10, squareDistance = 5;
        var patternCanvas = fabric.document.createElement('canvas');
        var rect = new fabric.Rect({
            width: squareWidth,
            height: squareWidth,
            angle: 45,
            fill: color.current,
        });

        var canvasWidth = rect.getBoundingRect().width;

        patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
        rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

        var ctx = patternCanvas.getContext('2d');
        rect.render(ctx);

        return patternCanvas;
    };



    function setDrawingMode(e) {
        if (e.target.value === 'Circle') {
            canvas.freeDrawingBrush = circleBrush;
        }

        else if (e.target.value === 'Spray') {
            canvas.freeDrawingBrush = sprayBrush;


        }
        else if (e.target.value === 'Pencil') {
            canvas.freeDrawingBrush = pencilBrush;


        }
        else if (e.target.value === 'Square') {
            canvas.freeDrawingBrush = squarePatternBrush;
        }
        else if (e.target.value === 'Diamond') {
            canvas.freeDrawingBrush = diamondPatternBrush;
        }
        else if (e.target.value === 'hLine') {
            canvas.freeDrawingBrush = hLinePatternBrush;
        }

        canvas.freeDrawingBrush.color = color.current;
        if (canvas.freeDrawingBrush.getPatternSrc) {
            canvas.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(canvas.freeDrawingBrush);
        }
        canvas.freeDrawingBrush.width = parseInt(document.getElementById('line-width').value, 10) || 1;
        canvas.freeDrawingBrush.shadow = new fabric.Shadow({
            blur: parseInt(document.getElementById('shadow-width').value, 10) || 0,
            offsetX: parseInt(document.getElementById('shadow-offset').value, 10) || 0,
            offsetY: parseInt(document.getElementById('shadow-offset').value, 10) || 0,
            affectStroke: true,
            color: color.current,
        });

    }
    function setLineWidth(e) {
        canvas.freeDrawingBrush.width = parseInt(e.target.value, 10) || 1;
    }
    function setShadowWidth(e) {
        canvas.freeDrawingBrush.shadow.blur = parseInt(e.target.value, 10) || 0;
    }

    function setShadowOffset(e) {
        canvas.freeDrawingBrush.shadow.offsetX = parseInt(e.target.value, 10) || 0;
        canvas.freeDrawingBrush.shadow.offsetY = parseInt(e.target.value, 10) || 0;
    }


    return (
        <div id='line-menu' className={styles.Submenu}>
            <div className={styles.Title}>Draw Line</div>
            <p>
                <LineOutlinedIcon children={"straight line"} onClick={drawStraight} />
                <HighlightOutlinedIcon htmlFor={"freedrawing"} children={"free drawing mode"} onClick={drawCurve} />
            </p>
            <p>
                <select id='drawing-mode' onChange={setDrawingMode} style={{}}>
                    <option>Pencil</option>
                    <option>Circle</option>
                    <option>Spray</option>
                    <option>hLine</option>
                    <option>vline</option>
                    <option>Square</option>
                    <option>Diamond</option>
                </select>
            </p>


            <p><label> color</label> <ColorPicker canvas={canvas} color={color} /></p>
            <div className={styles.effectContainer}>
                <label>Line width:</label><input type="range" id="line-width" defaultValue="30" min="0" max="150" step="1" onChange={setLineWidth} />
                <label>Shadow width:</label><input type="range" id="shadow-width" defaultValue="0" min="0" max="50" step="1" onChange={setShadowWidth} />
                <label>Shadow offset: </label> <input type="range" id="shadow-offset" defaultValue="0" min="0" max="50" step="1" onChange={setShadowOffset} />
            </div>
        </div>
    );
}