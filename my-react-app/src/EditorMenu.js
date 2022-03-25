import { fabric } from "fabric";
import { useState } from "react";
import SubMenu from "./component/SubMenu";
import DefaultMenu from "./component/submenu/DefaultMenu";

export default function EditorMenuTest(props) {
    console.log("에디터 렌더링");
    const canvas = props.canvas.current;
    const [btnDisabled, setBtnDisabled] = useState(true); //객체 삭제 버튼 disabled 결정 
    const [objectType, setObjectType] = useState("");  //어떤 종류의 object를 추가할 것인지 
    const [isAddingTextbox, setIsAddingTextbox] = useState(false);

    function addFigure() { //도형(삼각형, 원, 직사각형) 추가
        setObjectType("figure");
        canvas.isDrawingMode =false; // 그리기 하다가 도형 삽입 클릭시 drawing 모드가 켜져 있으면 도형과 함께 곡선이 그려지는 것을 방지
    }

    function addTextBox() { //텍스트상자 추가
        setObjectType("textbox");
        setIsAddingTextbox(!isAddingTextbox);
        console.log(!isAddingTextbox);
        canvas.isDrawingMode =false; // 그리기 하다가 도형 삽입 클릭시 drawing 모드가 켜져 있으면 도형과 함께 곡선이 그려지는 것을 방지
    }

    function addPath() { //그리기 
        setObjectType("path");
    }

    function removeObject() { //객체 삭제
        canvas.remove(canvas.getActiveObject());
    }
    return (
        <div className="editor-menu">
            <button onClick={addFigure}>도형 삽입</button>
            <button onClick={addPath}>그리기</button>
            <button onClick={addTextBox}>텍스트 박스</button>
            <button id='remove-object' disabled={btnDisabled} onClick={removeObject}>객체 삭제</button>
            <SubMenu canvas={canvas} objectType={objectType} setObjectType={setObjectType} setBtnDisabled={setBtnDisabled} setIsAddingTextbox={setIsAddingTextbox} isAddingTextbox={isAddingTextbox}/>
            <DefaultMenu canvas={canvas}/>
        </div>
    )
}