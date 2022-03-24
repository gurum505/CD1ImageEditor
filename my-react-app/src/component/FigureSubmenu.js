import { useState } from "react";
import { fabric } from "fabric";

export default function FigureSubMenu(props) {
    const canvas = props.canvas;
    function addRect() {
        canvas.defaultCursor  = 'crosshair';
        var rect, isDown, origX, origY;
        canvas.off('mouse:move');
        canvas.off('mouse:up');
        canvas.off('mouse:down');

        canvas.on('mouse:down', function (o) {
            isDown = true;
            var pointer = canvas.getPointer(o.e);
            origX = pointer.x; //클릭시 마우스 x좌표
            origY = pointer.y; //클릭시 마우스 y좌표 
            console.log(pointer);
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
                type: 'rect',
            });
            console.log("사각형 입력 시작");
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
            canvas.off('mouse:move');
            canvas.off('mouse:up');
            canvas.off('mouse:down');
            canvas.defaultCursor  = 'default';

        });

    }

    function addCircle() {
        canvas.defaultCursor  = 'crosshair';

        canvas.off('mouse:move');
        canvas.off('mouse:up');
        canvas.off('mouse:down');
        var circle, isDown, origX, origY;

        canvas.on('mouse:down', function (o) {
            isDown = true;
            var pointer = canvas.getPointer(o.e);
            origX = pointer.x; //클릭시 마우스 x좌표
            origY = pointer.y; //클릭시 마우스 y좌표 
            console.log(pointer);
            console.log(pointer.x - origX);
            circle = new fabric.Circle({
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                radius: (pointer.x - origX) / 2,
                fill: 'rgba(255,0,0,0.5)',
                transparentCorners: false,
                type: 'circle',
            });
            console.log("입력");
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
            console.log(canvas.getObjects());
            canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.off('mouse:move');
            canvas.off('mouse:up');
            canvas.off('mouse:down');
            canvas.defaultCursor  = 'default';

        });

    }

    function addTriangle() {
        canvas.defaultCursor  = 'crosshair';

        canvas.off('mouse:move');
        canvas.off('mouse:up');
        canvas.off('mouse:down');
        // canvas.on('object:added', () => {
        //     // canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1)); //객체 생성 시 setActive
        //     console.log("삼각형 추가");
        // });
        var triangle, isDown, origX, origY;

        canvas.on('mouse:down', function (o) {
            isDown = true;
            var pointer = canvas.getPointer(o.e);
            origX = pointer.x; //클릭시 마우스 x좌표
            origY = pointer.y; //클릭시 마우스 y좌표 
            console.log(pointer);
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
                type: 'triangle',
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
            console.log(canvas.getObjects());
            canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.off('mouse:move');
            canvas.off('mouse:up');
            canvas.off('mouse:down');
            canvas.defaultCursor  = 'default';

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