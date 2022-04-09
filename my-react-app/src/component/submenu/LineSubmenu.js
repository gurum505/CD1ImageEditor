import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import ColorPicker from "./ColorPicker";
export default function LineSubmenu(props) {
    const canvas = props.canvas;
    const stateRef = props.stateRef;
    const objectNumRef = props.objectNumRef;
    const color = useRef('black');  // : 값이 바뀌어도 렌더링되지 않음.



    function addLayer(object) {  //레이어에 객체 추가 
        const div = document.createElement('div');
        div.id = objectNumRef.current
        div.style.border = ' solid #0000FF';
        div.style.width = '130px';
        const el = document.getElementById('layer');

        const objectBtn = document.createElement('button');
        objectBtn.innerHTML = object.type;
        objectBtn.className = "layer-object";
        objectBtn.onclick = () => {
            canvas.setActiveObject(object);
            canvas.renderAll();
        }
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => {
            canvas.remove(object);
            document.getElementById(object.id).remove();
            updateModifications(true);
        }


        div.appendChild(objectBtn);
        div.appendChild(deleteBtn);
        el.insertBefore(div, el.firstChild);  //스택처럼 쌓이게 
    }

    function updateModifications(savehistory) {
        if (savehistory === true) {
            var myjson = canvas.toDatalessJSON(['width', 'height', 'id']);
            stateRef.current.push(myjson);
        }

    }

    function drawCurve() {
        canvas.off('mouse:down');
        canvas.off('mouse:up');
        canvas.freeDrawingBrush.color = color.current;
        if (canvas.isDrawingMode) { //곡선 그리기가 꺼져있는 상태에서 곡선버튼을 눌렀을 때  
            canvas.isDrawingMode = false;
            canvas.defaultCursor = 'default';
            document.getElementById('curve').disabled =false;
            document.getElementById('straight').disabled =false;

            return;
        }
        else {
            canvas.isDrawingMode = true;
            document.getElementById('curve').disabled =true;

            canvas.defaultCursor = 'crosshair';

        }
        canvas.on('mouse:up', () => {
            canvas.discardActiveObject().renderAll(); // 곡선 그리고 나면 활성화되는 것 끄기 ( canvas.off('object:added') 로 하면 redo 할 때 활성화가 안됨)
            canvas.item(canvas.getObjects().length - 1).set({ id: `${++objectNumRef.current}` })
            addLayer(canvas.item(canvas.getObjects().length - 1));
            var objects = canvas.getActiveObjects();

            objects.forEach((object) => {
                if (document.getElementById(object.id))
                    document.getElementById(object.id).style.border = 'solid red'
            })
            updateModifications(true);


        })

    }


    function drawStraight() {
        document.getElementById('curve').disabled =false;
        document.getElementById('straight').disabled =true;

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
                id: `${++objectNumRef.current}`
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
            document.getElementById('straight').disabled =false;

            isDown = false;
            canvas.off('mouse:down');
            canvas.off('mouse:up');
            updateModifications(true);
            canvas.defaultCursor = 'default';
            addLayer(line);

            var objects = canvas.getActiveObjects();
            objects.forEach((object) => {
                if (document.getElementById(object.id))
                    document.getElementById(object.id).style.border = 'solid red'
            })


        });
    }


    var circleBrush = new fabric.CircleBrush(canvas);
    var sprayBrush = new fabric.SprayBrush(canvas);
    var pencilBrush = new fabric.PencilBrush(canvas);
    var hLinePatternBrush = new fabric.PatternBrush(canvas);
    var vLinePatternBrush = new fabric.PatternBrush(canvas);
    var squarePatternBrush = new fabric.PatternBrush(canvas);
    var diamondPatternBrush = new fabric.PatternBrush(canvas);

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

        ctx.strokeStyle = this.color;
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


    return (<>
        <div>
            <button id="curve" onClick={drawCurve}>
                곡선
            </button>
            <select id='drawing-mode' onChange={setDrawingMode}>
                <option>Pencil</option>
                <option>Circle</option>
                <option>Spray</option>
                <option>hLine</option>
                <option>vline</option>
                <option>Square</option>
                <option>Diamond</option>
            </select>
            <br/>
            <button id='straight' onClick={drawStraight}>
                직선
            </button>
            &nbsp; &nbsp;
            <p>
                <label>Line width: <input type="range" id="line-width" defaultValue="30" min="0" max="150" step="1" onChange={setLineWidth} /></label>
            </p>
            <p>
                <label>Shadow width: <input type="range" id="shadow-width" defaultValue="0" min="0" max="50" step="1" onChange={setShadowWidth} /></label>
            </p>
            <p>
                <label>Shadow offset: <input type="range" id="shadow-offset" defaultValue="0" min="0" max="50" step="1" onChange={setShadowOffset} /></label>
            </p>

            <label>Line color: <ColorPicker canvas={canvas} color={color} /> </label>

        </div>
    </>);
}