import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import Submenu from "./component/Submenu";
import DefaultMenu from "./component/submenu/DefaultSubmenu";
import './editor.css';

//TODO: 객체 삭제 버튼 때문에 editorMenu 전체가 렌더링 되어야 한다. 삭제 버튼을 개별 컴포넌트로 만들어야 할듯

export default function EditorMenu(props) {
    const canvas = props.canvasRef.current;
    canvas.isDrawingMode = false;
    console.log('EdiitorMenu 렌더링');

    useEffect(() => {

        const figure = ['rect', 'circle', 'triangle'];
        const line = ['line', 'path'];
        document.getElementById('remove-object').disabled = true;
        var selectType;

        canvas.on({
            'selection:updated': () => {
                console.log("selection : updated");
                document.getElementById('remove-object').disabled = false
                selectType = canvas.getActiveObject().type;
                if (figure.includes(selectType)) setButtonType('figure');
                else if (line.includes(selectType)) setButtonType('line');
                else if (selectType === 'image') setButtonType('image');
                else if (selectType === 'textbox') setButtonType('textbox');
            },
            'selection:cleared': () => { 
                console.log("selection : cleared"); 
                document.getElementById('remove-object').disabled = true
            },
            'selection:created': () => {
                selectType = canvas.getActiveObject().type;
                if (figure.includes(selectType)) setButtonType('figure');
                else if (line.includes(selectType)) setButtonType('line');
                else if (selectType === 'image') setButtonType('image');
                else if (selectType === 'textbox') setButtonType('textbox');
                console.log("selection : cleared");
                document.getElementById('remove-object').disabled = false
            },
            'object:added': () => {
                canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
                selectType = canvas.getActiveObject().type;
                if (figure.includes(selectType)) setButtonType('figure');
                else if (line.includes(selectType)) setButtonType('line');
                else if (selectType === 'image') setButtonType('image');
                else if (selectType === 'textbox') setButtonType('textbox');
                console.log("object:added");
                document.getElementById('remove-object').disabled = false;

            },
            'object:updated': () => {
                console.log("object:updated"); 
                document.getElementById('remove-object').disabled = false },
        })
    });


    const [buttonType, setButtonType] = useState("");  //어떤 종류의 object를 추가할 것인지 
    const [isAddingTextbox, setIsAddingTextbox] = useState(false);

    function addFigure() { //도형(삼각형, 원, 직사각형) 추가
        if (buttonType === 'figure') setButtonType(''); //현재 열려있는 submenu 가 figure이면 submenu를 닫음
        else setButtonType("figure");
        canvas.off('mouse:down');
        canvas.isDrawingMode = false; // 그리기 하다가 도형 삽입 클릭시 drawing 모드가 켜져 있으면 도형과 함께 곡선이 그려지는 것을 방지
    }

    function addTextBox() { //텍스트상자 추가
        if (buttonType === 'textbox') setButtonType('');
        else setButtonType("textbox");
        setIsAddingTextbox(!isAddingTextbox);
        canvas.isDrawingMode = false; // 그리기 하다가 도형 삽입 클릭시 drawing 모드가 켜져 있으면 도형과 함께 곡선이 그려지는 것을 방지
    }

    function addLine() { //그리기 
        if (buttonType === 'line') setButtonType('');
        else setButtonType("line");
        canvas.off('mouse:down');
    }

    function removeObject() { //객체 삭제
        canvas.remove(canvas.getActiveObject());
    }

    //이미지 추가 
    function addImage(){
        if (buttonType === 'image') setButtonType('');
        else setButtonType("image");
        canvas.off('mouse:down');
    }
    
    function addFilter(){
        if (buttonType === 'filter') setButtonType('');
        else setButtonType("filter");
        canvas.off('mouse:down');
    }
    

    return (
        <div className="editor-menu">
            <Submenu canvas={canvas} buttonType={buttonType} />
            <button id='add-figure' onClick={addFigure}>도형 삽입</button>
            <button id='path' onClick={addLine}>그리기</button>
            <button id='textbox' onClick={addTextBox}>텍스트 박스</button>
            <button id='add-image' onClick ={addImage}>이미지 추가</button>
            <button id='filter' onClick={addFilter}>필터</button>
            <button id='remove-object' onClick={removeObject}>객체 삭제</button>
            <DefaultMenu canvas={canvas} />
        </div>
    )
}