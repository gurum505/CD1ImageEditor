import { useRef} from "react";
import { fabric } from "fabric";
import ColorPicker from "./ColorPicker";
export default function LineSubmenu(props) {
    const canvas = props.canvas;
    const state = props.state;

    function addLayer(object) {  //레이어에 객체 추가 
        const div = document.createElement('div');
        div.id = object;
        div.style.border=' solid #0000FF';
        div.style.width = '130px';
        const el = document.getElementById('layer');

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = ()=>{
            canvas.remove(object);
            document.getElementById(object).remove();
            updateModifications(true)
        }

        const objectBtn = document.createElement('button');
        objectBtn.innerHTML = object.type;
        objectBtn.className = "layer-object";
        objectBtn.id = object;
        objectBtn.onclick = () => {
            canvas.setActiveObject(object);
            canvas.renderAll();
        }

        div.appendChild(objectBtn);
        div.appendChild(deleteBtn);
        el.insertBefore(div,el.firstChild);  //스택처럼 쌓이게 
        
    }

    function updateModifications(savehistory) {
        if (savehistory === true) {
            var  myjson = canvas.toJSON();
            state.current.push(myjson);
        }
    }
    const color = useRef('black');  //useRef : 값이 바뀌어도 렌더링되지 않음.

    function drawCurve() {
        canvas.off('object:added');
        canvas.off('mouse:down');
        canvas.off('mouse:up');
        canvas.freeDrawingBrush.color = color.current;
        if (canvas.isDrawingMode) { //곡선 그리기가 꺼져있는 상태에서 곡선버튼을 눌렀을 때  
            canvas.isDrawingMode = false;
        }
        else {
            canvas.isDrawingMode = true;
        }
        canvas.on('mouse:up',()=>{
            updateModifications(true);
            addLayer(canvas.item(canvas.getObjects().length - 1));
        })
        
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
            updateModifications(true);
            addLayer(line);
            canvas.defaultCursor = 'default';

        });
    }

    
    return (<>
        <div>
            <button id="curve" onClick={drawCurve}>
                곡선
            </button>
            <button id='straight' onClick={drawStraight}>
                직선
            </button>
            &nbsp; &nbsp;
            {/* <input id="color" type="color" onChange={selectColor}/> */}
            <ColorPicker canvas={canvas} color={color} />

        </div>
    </>);
}