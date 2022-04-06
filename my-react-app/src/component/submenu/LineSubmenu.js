import { useRef} from "react";
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
            return ;
        }
        else {
            canvas.isDrawingMode = true;
            canvas.defaultCursor = 'crosshair';

        }
        canvas.on('mouse:up',()=>{
            canvas.discardActiveObject().renderAll(); // 곡선 그리고 나면 활성화되는 것 끄기 ( canvas.off('object:added') 로 하면 redo 할 때 활성화가 안됨)
            canvas.item(canvas.getObjects().length - 1).set({id:`${++objectNumRef.current}`})
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
                id : `${++objectNumRef.current}`
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
            canvas.defaultCursor = 'default';
            addLayer(line);
            
            var objects = canvas.getActiveObjects();
            objects.forEach((object) => {
                if (document.getElementById(object.id))
                    document.getElementById(object.id).style.border = 'solid red'
            })


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
            <ColorPicker canvas={canvas} color={color} />

        </div>
    </>);
}