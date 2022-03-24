import { fabric } from "fabric";
import { useState } from "react";
import LineSubMenu from "./LineSubMenu";
import TextSubMenu from "./TextSubMenu";
import FigureSubMenu from "./FigureSubMenu";
export default function EditorMenu(props) {
    console.log("서브메뉴 렌더링");
    const canvas = props.canvas.current;
    const [whichObject, setWhichOjbect] = useState(props.whichObject ? props.whichObject : "");
    console.log(whichObject);
    const [whichButtonClicked, setWhichButtonClicked] = useState(whichObject.type);

    


    //선 그리기 
    function drawLine() {
        canvas.isDrawingMode = true;
        setWhichButtonClicked("path");
         canvas.on('object:added', () => {
            canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1)); //객체 생성 시 setActive
            console.log("쓰기 ");
            canvas.off('object:added');
        });

        if (canvas.isDrawingMode == true) {
            console.log("그리기 켜짐");
        }
        canvas.on('mouse:up', function () {
            canvas.isDrawingMode = false;
        });

    }


    function addRectangle() {
        var rect, isDown, origX, origY;
        setWhichButtonClicked("rect");
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
            console.log("입력");
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
            console.log(canvas.getObjects());
            canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.off('mouse:move');
            canvas.off('mouse:up');
            canvas.off('mouse:down');
            canvas.off('object:added');

        });

    }

    function addCircle() {
        canvas.off('mouse:move');
        canvas.off('mouse:up');
        canvas.off('mouse:down');
        var circle, isDown, origX, origY;
        setWhichButtonClicked("rect");
        // canvas.on('object:added', () => {
        //     canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1)); //객체 생성 시 setActive
        //     console.log("원 추가");
        // });

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
            canvas.off('object:added');

        });

    }

    function addTriangle() {
        setWhichButtonClicked("triangle");

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
            canvas.off('object:added');

        });
    }
    function addTextBox() {
        setWhichButtonClicked("text");

        var text = new fabric.Textbox('text box',
            {
                left: Math.floor(Math.random() * 101),
                top: Math.floor(Math.random() * 101),
                width: 200,
                text: "text"  //객체 유형 구분하기 위해 추가

            });
        canvas.add(text);
    }


    //개체 삭제 
    function removeObject() {
        const button = document.getElementById('remove-object');
        button.disabled = true;
        console.log("삭제");
        console.log(canvas.getActiveObject());
        canvas.remove(canvas.getActiveObject());

    }

    return (
        <div className="Editor-menu">
            <button className="a" onClick={drawLine}>그리기</button>
            <button className="a" onClick={addRectangle}>사각형</button>
            <button className="a" onClick={addCircle}>원</button>
            <button className="a" onClick={addTriangle}>세모</button>
            <button className="a" onClick={addTextBox}>텍스트</button>
            <button className="a" disabled={props.removeButton} id="remove-object" onClick={removeObject}>삭제</button>
            <button id="undo" disabled className="a" >이전</button>
            <button id="redo" disabled className="a" >되돌리기</button>
            {whichButtonClicked === "path" && <LineSubMenu canvas={canvas} />}
            {whichButtonClicked === "text" && <TextSubMenu canvas={canvas} />}
            {(whichButtonClicked === "circle" || whichButtonClicked === "rect" ||whichButtonClicked==='triangle') && <FigureSubMenu canvas={canvas} />}
            {whichButtonClicked === "" && ""}
            {whichObject === "" && <></>}
        </div>
    )
}

