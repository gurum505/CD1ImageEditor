import { useState } from "react";

export default function PathSubMenu(props) {
    const canvas = props.canvas;
    const [isDrawingCurve, setIsDrawingCurve] = useState(false);
    const [isDrawingStraight, setIsDrawingStraight] = useState(false);
    
    function drawCurve() {
        if (!isDrawingCurve){ //곡선 그리기가 꺼져있는 상태에서 곡선버튼을 눌렀을 때  
            canvas.isDrawingMode = true;
            setIsDrawingCurve(true);
            document.getElementById("curve").style.color= "red";
        }

        if(isDrawingCurve) {
            canvas.isDrawingMode = false;
            setIsDrawingCurve(false);
            document.getElementById("curve").style.color= "black";

        }
    }

    function drawStraight(){

    }
    return (<>
        <div>
            <button id = "curve" onClick={drawCurve}>
                곡선
            </button>
            <button id='straight' onClick = {drawStraight}>
                직선
            </button>
            <button disabled>
                색상
            </button>

        </div>
    </>)
}