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
       
    }
    const [canvas, setCanvas] = useState(""); //useEffect()후 렌더링 하기 위한 state

    const canvasRef = useRef(new fabric.Canvas("canvas", {
        backgroundColor: "white",
        height: 400,
        width: 700,
    
    }));  //렌더링 되어도 동일 참조값을 유지, 값이 바뀌어도 렌더링하지 않음 

    const state = useRef([]);
    const mods = useRef(0);


    useEffect(() => {  //rendering 후 한 번 실행 
        canvasRef.current = (new fabric.Canvas("canvas", {
            backgroundColor: "white",
            height: 400,
            width: 700,
        }));


        function zoom(event) {
            event.preventDefault();
            console.log("ㅋㅋ");
            scale += event.deltaY * -0.001;

            // Restrict scale
            scale = Math.min(Math.max(.125, scale), 4);

            // Apply scale transform
            el.style.transform = `scale(${scale})`;
        }

        let scale = 1;
        const el = document.querySelector('.wrap');
        console.log(el);
        el.addEventListener('wheel', zoom);

        document.onkeydown = function (e) { // delete, backspace 키로 삭제
            {
                if (e.key === "Delete" || e.key === "Backspace")
                canvasRef.current.remove( canvasRef.current.getActiveObject());
                updateModifications(true);
            }
        }
        
        canvasRef.current.on('selection:created',()=>{
            console.log("ㅋ");
        })
        canvasRef.current.on('mouse:wheel',(e)=>{
            console.log(e);
            console.log('zz');
        })
        setCanvas(canvasRef);
       
    },[]);


    return (
        <>
            <Header canvasRef={canvasRef}  canvas={canvas} state={state} mods={mods}/>
            <div className="wrap"><canvas id="canvas" /></div>
            <EditorMenu canvasRef={canvasRef} state={state} />
        </>
    );
}