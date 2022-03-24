import { useState, useEffect } from "react";
import FigureSubMenu from "./FigureSubMenu";
import TextBoxSubMenu from "./TextBoxSubMenu";
import PathSubMenu from "./PathSubMenu";
export default function EditorMenuTest(props) {
    const canvas = props.canvas.current;
    // const [selectedObject, setSelectedObject] = useState(false);
    const [menu, setMenu] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true); //객체 삭제 버튼 disabled 결정 

    if (canvas != null) {
        canvas.on({
            'selection:updated': () => {   //선택한 객체의 종류가 바뀔 때 
                if (canvas.getActiveObject().type === "rect" || canvas.getActiveObject().type === "triangle" || canvas.getActiveObject().type === "circle")
                    setMenu("figure");
                else if (canvas.getActiveObject().type === "path") setMenu("path");
                else if (canvas.getActiveObject().type === "textbox") setMenu("textbox");
                setBtnDisabled(false);

            },
        });

        canvas.on({
            'selection:created': () => {  //json 불러왔을 때 
                if (canvas.getActiveObject().type === "rect" || canvas.getActiveObject().type === "triangle" || canvas.getActiveObject().type === "circle")
                    setMenu("figure");
                else if (canvas.getActiveObject().type === "path") setMenu("path");
                else if (canvas.getActiveObject().type === "textbox") setMenu("textbox");

                setBtnDisabled(false);

                document.onkeydown = function (e) { // delete, backspace 키로 삭제
                    {
                        if (e.key == "Delete" || e.key == "Backspace")
                            canvas.remove(canvas.getActiveObject());
                    }
                }
            },
        });

        canvas.on({
            'selection:cleared': () => {
                setBtnDisabled(true);
            }
        })


    }
    function addFigure() {
        setMenu("figure");
    }

    function addTextBox() {
        setMenu("textbox");
    }

    function addPath() {
        setMenu("path");
    }

    function removeObject() {
        const button = document.getElementById('remove-object');
        canvas.remove(canvas.getActiveObject());

    }
    return (
        <>
            <button onClick={addFigure}>도형 삽입</button>
            <button onClick={addPath}>그리기</button>
            <button onClick={addTextBox}>텍스트 박스</button>
            <button id='remove-object' disabled={btnDisabled} onClick={removeObject}>객체 삭제</button>
            {menu == "figure" && <FigureSubMenu canvas={canvas} />}
            {menu == "textbox" && <TextBoxSubMenu canvas={canvas} />}
            {menu == "path" && <PathSubMenu canvas={canvas} />}
        </>
    )
}