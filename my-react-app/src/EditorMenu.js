import { fabric } from "fabric";
import { useState } from "react";
import SubMenu from "./component/Submenu";
import DefaultMenu from "./component/submenu/DefaultSubmenu";

export default function EditorMenuTest(props) {

    const canvas = props.canvas.current;
    const [btnDisabled, setBtnDisabled] = useState(true); //객체 삭제 버튼 disabled 결정 
    const [objectType, setObjectType] = useState("");  //어떤 종류의 object를 추가할 것인지 
    const [isAddingTextbox, setIsAddingTextbox] = useState(false);
    const [isCleared, setIsCleared] = useState(true);

    function addFigure() { //도형(삼각형, 원, 직사각형) 추가
        canvas.off('mouse:down');
        setObjectType("figure");
        canvas.isDrawingMode = false; // 그리기 하다가 도형 삽입 클릭시 drawing 모드가 켜져 있으면 도형과 함께 곡선이 그려지는 것을 방지
    }

    function addTextBox() { //텍스트상자 추가
        setObjectType("textbox");
        setIsAddingTextbox(!isAddingTextbox);
        canvas.isDrawingMode = false; // 그리기 하다가 도형 삽입 클릭시 drawing 모드가 켜져 있으면 도형과 함께 곡선이 그려지는 것을 방지
    }

    function addPath() { //그리기 
        canvas.off('mouse:down');
        setObjectType("path");
    }

    function removeObject() { //객체 삭제
        canvas.remove(canvas.getActiveObject());
    }
    return (
        <div className="editor-menu">
            <SubMenu canvas={canvas} isCleared={isCleared} setIsCleared={setIsCleared} objectType={objectType} setObjectType={setObjectType} setBtnDisabled={setBtnDisabled} setIsAddingTextbox={setIsAddingTextbox} isAddingTextbox={isAddingTextbox} />
            <button onClick={addFigure}>도형 삽입</button>
            <button onClick={addPath}>그리기</button>
            <button onClick={addTextBox}>텍스트 박스</button>
            <button id='remove-object' disabled={btnDisabled} onClick={removeObject}>객체 삭제</button>
            <DefaultMenu canvas={canvas} />
        </div>
    )
}