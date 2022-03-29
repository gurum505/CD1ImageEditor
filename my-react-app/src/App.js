import { fabric } from "fabric";
import React, { useState, useEffect, useRef } from "react";
import Header from "./component/Header";
import EditorMenu from "./EditorMenu";

export default function App(props) {
    function updateModifications(savehistory) {
        if (savehistory === true) {
            var  myjson = canvasRef.current.toJSON();
            state.current.push(myjson);
        }
        console.log(state.current.length);
       
    }
    const canvasRef = useRef(new fabric.Canvas("canvas", {
        backgroundColor: "white",
        height: 400,
        width: 700,
    
    }));  //렌더링 되어도 동일 참조값을 유지, 값이 바뀌어도 렌더링하지 않음 

    const state = useRef([]);
    const mods = useRef(0);

    const [canvas, setCanvas] = useState(""); //useEffect()후 렌더링 하기 위한 state


    useEffect(() => {  //rendering 후 한 번 실행 
        canvasRef.current = (new fabric.Canvas("canvas", {
            backgroundColor: "white",
            height: 400,
            width: 700,
        }));

        document.onkeydown = function (e) { // delete, backspace 키로 삭제
            {
                if (e.key === "Delete" || e.key === "Backspace")
                canvasRef.current.remove( canvasRef.current.getActiveObject());
                updateModifications(true);
            }
        }
        
        setCanvas(canvasRef);
        

    },[] );

    return (
        <>
            <Header canvasRef={canvasRef}  canvas={canvas} state={state} mods={mods}/>
            <div className="wrap"><canvas id="canvas" /></div>
            <EditorMenu canvasRef={canvasRef} state={state} />
        </>
    );
}