import { fabric } from "fabric";
import { useState } from "react";

export default function EditorMenu(props) {
    const canvas = props.canvas.current;
    console.log(props.removeButton);
    //선 그리기 
    function drawLine() {
        console.log(canvas);
        canvas.isDrawingMode = true;
        if (canvas.isDrawingMode == true) {
            console.log("켜짐");
        }
        canvas.on('mouse:up', function () {
            canvas.isDrawingMode = false;
        });
    }


    function addRectangle() {
        canvas.add(new fabric.Rect({
            left: Math.floor(Math.random() * 101),
            top: Math.floor(Math.random() * 101),
            fill: '#f55',
            width: 50,
            height: 50,
            type :"Figure"  //객체 유형 구분하기 위해 추가
        }));

    }

    function addCircle() {
        canvas.add(new fabric.Circle({
            radius: 30, fill: '#f55',
            top: Math.floor(Math.random() * 101),
            left: Math.floor(Math.random() * 101),
            type : "Figure" //객체 유형 구분하기 위해 추가
        }));
    }

    function addTextBox() {
        var text = new fabric.Textbox('text box',
            {
                left: Math.floor(Math.random() * 101),
                top: Math.floor(Math.random() * 101),
                width: 200,
                type :"text"  //객체 유형 구분하기 위해 추가

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
            <button className="a" onClick={addTextBox}>텍스트</button>
            <button className="a" disabled = {props.removeButton} id="remove-object" onClick={removeObject}>삭제</button>
            <button id="undo" disabled  className="a" >이전</button>
            <button id="redo" disabled className="a" >되돌리기</button> 
        </div>
    )
}

