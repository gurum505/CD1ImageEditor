import { fabric } from "fabric";
import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import EditorMenu from "./EditorMenu";
import FigureSubMenu from "./FigureSubMenu";
import LineSubMenu from "./LineSubMenu";
import TextSubMenu from "./TextSubMenu";

export default function Canvas(props) {
    const canvasRef = useRef(null);  //렌더링 되어도 동일 참조값을 유지, 값이 바뀌어도 렌더링하지 않음 
    const [canvas, setCanvas] = useState(""); //useEffect()후 렌더링 하기 위한 state

    const [removeButton,setRemoveButton] =useState(true); //removeButton 처음에 disabled, 객체 선택 시 state 변경 
    const [whichObject, setWhichObject] = useState("");


    useEffect(() => {  //rendering 후 한 번 실행 
        canvasRef.current = new fabric.Canvas("canvas", {
            backgroundColor: "white",
            height: 400,
            width: 800,
        });
        setCanvas(canvasRef);

        canvasRef.current.on(
            'object:added', function () {
                console.log("추가");
                canvasRef.current.setActiveObject(canvasRef.current.item(canvasRef.current.getObjects().length - 1)); //객체 생성 시 setActive
                setWhichObject(canvasRef.current.getActiveObject());
                console.log(canvasRef.current.getActiveObject());

            });

        canvasRef.current.on(
            'object:modified', function () {
                console.log("수정");
            });
        canvasRef.current.on(
            'selection:created', function (opt) {
                console.log("선택");
                setWhichObject(canvasRef.current.getActiveObject());
                console.log(canvasRef.current.getActiveObject().type);
                // const input = document.getElementById('colorWell');
                // input.hidden = false;
                // colorWell = document.querySelector("#colorWell");
                // // colorWell.value = "black"; 디폴트 칼라
                // colorWell.addEventListener("input", updateColor, false);
                // // colorWell.select();
               
                var button = document.getElementById('remove-object');
                button.disabled = false;
                setRemoveButton(false);

                document.onkeydown = function (e) { // delete, backspace 키로 삭제
                    {
                        if (e.which == 46 || e.which == 8)
                        canvasRef.current.remove(canvasRef.current.getActiveObject());
                    }
                }
            });
        canvasRef.current.on(
            'selection:updated', function (opt) {
                
                console.log("선택 업데이트");
                setWhichObject(canvasRef.current.getActiveObject());
                console.log(canvasRef.current.getActiveObject().type);
                const button = document.getElementById('remove-object');
                button.disabled = false;
                setWhichObject(canvasRef.current.getActiveObject());
            });

        canvasRef.current.on(
            'selection:cleared', function (opt) {
                console.log("선택 없음");
                const button = document.getElementById('remove-object');
                button.disabled = true;
                setWhichObject("");
                // const input = document.getElementById('colorWell');
                // input.hidden = true;
            });



    }, []);

    
    return (
        <>
            <Header canvas={canvasRef} />
            <canvas id="canvas" />
            <EditorMenu canvas={canvasRef} removeButton = {removeButton}/>
            { whichObject.type ==="figure" && <FigureSubMenu  canvas={canvasRef} whichObject= {whichObject}  />}
            { whichObject.type ==="text" && <TextSubMenu  canvas={canvasRef} whichObject= {whichObject}  />}
            { whichObject.type ==="path" && <LineSubMenu  canvas={canvasRef} whichObject= {whichObject}  />}

        </>
    );
}
