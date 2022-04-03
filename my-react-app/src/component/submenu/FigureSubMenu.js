import {useRef } from "react";
import { fabric } from "fabric";
import ColorPicker from "./ColorPicker";

export default function FigureSubmenu(props) {
    const state = props.state;
    const canvas = props.canvas;
    const color = useRef('black');

    function updateModifications(savehistory) {
        if (savehistory === true) {
            var myjson = canvas.toDatalessJSON(['width','height']);
            state.current.push(myjson);
        }
       
    }
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
            updateModifications(true);
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
            updateModifications(true);
            isDown = false;
            // canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.defaultCursor = 'default';
            canvas.off('mouse:down');
            canvas.off('mouse:move');
            canvas.off('mouse:up');
            
            addLayer(rect);

        });

    }

    function addCircle() {
        
        canvas.off('mouse:down');

        canvas.defaultCursor = 'crosshair';
        var circle, isDown, origX, origY;

        canvas.on('mouse:down', function (o) {
            isDown = true;
            var pointer = canvas.getPointer(o.e);
            origX = pointer.x; //클릭시 마우스 x좌표
            origY = pointer.y; //클릭시 마우스 y좌표 
            circle = new fabric.Circle({
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                radius: (pointer.x - origX) / 2,
                fill: `${color.current}`,
                transparentCorners: false,
                // type: 'circle',
            });

            canvas.add(circle);
        });

        canvas.on('mouse:move', function (o) {
            if (!isDown) return;
            var pointer = canvas.getPointer(o.e);

            if (origX > pointer.x) {
                circle.set({ left: Math.abs(pointer.x) });
            }
            if (origY > pointer.y) {
                circle.set({ top: Math.abs(pointer.y) });
            }

            circle.set({ radius: Math.abs(origX - pointer.x) / 2 });


            canvas.renderAll();
        });

        canvas.on('mouse:up', function (o) {
            updateModifications(true);

            isDown = false;
            // canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.off('mouse:move');
            canvas.off('mouse:up');
            canvas.off('mouse:down');
            canvas.defaultCursor = 'default';
            addLayer(circle);
        });

    }

    function addTriangle() {
        canvas.off('mouse:down');
        canvas.defaultCursor = 'crosshair';
        var triangle, isDown, origX, origY;

        canvas.on('mouse:down', function (o) {
            isDown = true;
            var pointer = canvas.getPointer(o.e);
            origX = pointer.x; //클릭시 마우스 x좌표
            origY = pointer.y; //클릭시 마우스 y좌표 
            triangle = new fabric.Triangle({
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                width: pointer.x - origX,
                height: pointer.y - origY,
                angle: 0,
                fill:  `${color.current}`,
                transparentCorners: false,
                // type: 'triangle',
            });

            canvas.add(triangle);
            
        });

        canvas.on('mouse:move', function (o) {
            if (!isDown) return;
            var pointer = canvas.getPointer(o.e);

            if (origX > pointer.x) {
                triangle.set({ left: Math.abs(pointer.x) });
            }
            if (origY > pointer.y) {
                triangle.set({ top: Math.abs(pointer.y) });
            }

            triangle.set({ width: Math.abs(origX - pointer.x) });
            triangle.set({ height: Math.abs(origY - pointer.y) });


            canvas.renderAll();
        });

        canvas.on('mouse:up', function (o) {
            canvas.renderAll();
            updateModifications(true);
            isDown = false;
            // canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.off('mouse:move');
            canvas.off('mouse:up');
            canvas.off('mouse:down');
            canvas.defaultCursor = 'default';
            addLayer(triangle);


        });
    }
    return (
        <>
            <div>
                <button onClick={addRect}>
                    사각형
                </button>
                <button onClick={addCircle}>
                    원
                </button>
                <button onClick={addTriangle}>
                    삼각형
                </button>
                &nbsp; &nbsp;
                <ColorPicker  canvas={canvas} color={color} />
            </div>
        </>
    )
}