import { fabric } from "fabric";
import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import EditorMenu from "./EditorMenu";
import FigureSubMenu from "./FigureSubMenu";
import LineSubMenu from "./LineSubMenu";
import TextSubMenu from "./TextSubMenu";
import EditorMenuTest from "./EditorMenuTest";
export default function Canvas(props) {
    const canvasRef = useRef(null);  //렌더링 되어도 동일 참조값을 유지, 값이 바뀌어도 렌더링하지 않음 
    const [canvas, setCanvas] = useState(""); //useEffect()후 렌더링 하기 위한 state

    // const [removeButton, setRemoveButton] = useState(true); //removeButton 처음에 disabled, 객체 선택 시 state 변경 
    // const [whichObject, setWhichObject] = useState(" ");
    // const [isSelectChanged,setIsSelectChanged]= useState(false);
    

    useEffect(() => {  //rendering 후 한 번 실행 
        canvasRef.current = new fabric.Canvas("canvas", {
            backgroundColor: "white",
            height: 400,
            width: 800,
        });

        setCanvas(1);
        

    }, []);

    return (
        <>
            <Header canvas={canvasRef} />
            <canvas id="canvas" />
            <EditorMenuTest canvas={canvasRef} />
            {/* <EditorMenu canvas={canvasRef} /> */}
        </>
    );
}
