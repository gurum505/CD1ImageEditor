import { fabric } from "fabric";
import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import EditorMenu from "./EditorMenu";
export default function Canvas(props) {
    const canvasRef = useRef(null);  //렌더링 되어도 동일 참조값을 유지, 값이 바뀌어도 렌더링하지 않음 
    const [canvas, setCanvas] = useState(""); //useEffect()후 렌더링 하기 위한 state


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
                console.log(canvasRef.current.getActiveObject());

            });

        canvasRef.current.on(
            'object:modified', function () {
                console.log("수정");
            });
        canvasRef.current.on(
            'selection:created', function (opt) {
                console.log("선택");
                // const input = document.getElementById('colorWell');
                // input.hidden = false;
                // colorWell = document.querySelector("#colorWell");
                // // colorWell.value = "black"; 디폴트 칼라
                // colorWell.addEventListener("input", updateColor, false);
                // // colorWell.select();


                console.log("선택 생성");

                var button = document.getElementById('remove-object');
                button.disabled = false;

                document.onkeydown = function (e) { // delete, backspace 키로 삭제
                    {
                        if (e.which == 46 || e.which == 8)
                            canvas.remove(canvas.getActiveObject());
                    }
                }
            });
        canvasRef.current.on(
            'selection:updated', function (opt) {
                console.log("선택 업데이트");
                const button = document.getElementById('remove-object');
                button.disabled = false;
            });

        canvasRef.current.on(
            'selection:cleared', function (opt) {
                console.log("선택 없음");
                // const button = document.getElementById('remove-object');
                // button.disabled = true;
                // const input = document.getElementById('colorWell');
                // input.hidden = true;
            });



    }, []);

    return (
        <>
            <Header canvas={canvas} />
            <canvas id="canvas" />
            <EditorMenu canvas={canvas} />
        </>
    );
}
