import { fabric } from "fabric";
export default function CutSubmenu(props) {
    //TODO: 자르기 할 때 박스 바깥쪽 어둡게 보이는 것 clip-path property로 할 수 있음.
    //TODO: 자르는 박스가 캔버스 영역 바깥으로 나가지 않게 할 것 
    const canvas =props.canvas;
    function crop(){
        var selectionRect = new fabric.Rect({
            fill: 'rgba(0,0,0,0.3)',
            originX: 'left',
            originY: 'top',
            stroke: 'black',
            opacity: 1,
            width: 300,
            height: 200,
            hasRotatingPoint: false,
            transparentCorners: false,
            cornerColor: 'white',
            cornerStrokeColor: 'black',
            borderColor: 'black',
          });
        console.log(selectionRect);
        canvas.add(selectionRect);
    }

    function apply(){

    }
    return (
    
        <ul style={{  listStyle: "none", }}>
            <button onClick={crop}>정방형</button>
            <button onClick={crop}>3:2</button>
            <button onClick={crop}>4:3</button>
            <button onClick={crop}>16:9</button>
            <button onClick={apply}>적용</button>
            <button onClick={crop}>취소</button>
        </ul>

    )
}