import { useEffect, useState } from "react";
import { fabric } from "fabric";

export default function FigureSubMenu(props) {


    function objectSelected(o) {
        var objectType = o.target.type;
        console.log(objectType);
        if (objectType === 'rect' || objectType === 'circle' || objectType === 'triangle') return 'figure';
        else if (objectType === 'path') return 'path';
        else if (objectType === 'textbox') return 'textbox';
        else if (objectType === 'image') return 'image';
    }

    console.log("figuresubmenu 펑션");

    const canvas = props.canvas;
    


    canvas.on('selection:updated', () => {
        console.log("selection : cleared");
    });

    canvas.on('selection:cleared', () => {
        console.log("selection : cleared");
    });

    canvas.on('object:added', ()=>{
        console.log('object : added');
    });
    canvas.on('object:updated', () => {
        console.log('object : updated ');
    });


    function addRect() {
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
                fill: 'rgba(255,0,0,0.5)',
                transparentCorners: false,
                // type: 'rect',
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
            isDown = false;
            canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.defaultCursor = 'default';
            canvas.off('mouse:down');
            canvas.off('mouse:move');
            canvas.off('mouse:up');
        });

    }

    function addCircle() {
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
                fill: 'rgba(255,0,0,0.5)',
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
            isDown = false;
            canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.off('mouse:move');
            canvas.off('mouse:up');
            canvas.off('mouse:down');
            canvas.defaultCursor = 'default';

        });

    }

    function addTriangle() {
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
                fill: 'rgba(255,0,0,0.5)',
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
            isDown = false;
            canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.off('mouse:move');
            canvas.off('mouse:up');
            canvas.off('mouse:down');
            canvas.defaultCursor = 'default';

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
            </div>
        </>
    )
}