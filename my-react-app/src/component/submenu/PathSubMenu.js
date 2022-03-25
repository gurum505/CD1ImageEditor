import { useState } from "react";

export default function PathSubMenu(props) {
    const canvas = props.canvas;
    const [isDrawingCurve, setIsDrawingCurve] = useState(false);
    
    function drawCurve() {
        if (!isDrawingCurve){ //곡선 그리기가 꺼져있는 상태에서 곡선버튼을 눌렀을 때  
            canvas.isDrawingMode = true;
            setIsDrawingCurve(true);
            document.getElementById("draw-curve-button").style.color= "red";
        }

        if(isDrawingCurve) {
            canvas.isDrawingMode = false;
            setIsDrawingCurve(false);
            document.getElementById("draw-curve-button").style.color= "black";

        }
    }
    return (<>
        <div>
            <button id = "draw-curve-button" onClick={drawCurve}>
                곡선
            </button>
            <button disabled>
                직선
            </button>
            <button disabled>
                색상
            </button>

        </div>
    </>)
}