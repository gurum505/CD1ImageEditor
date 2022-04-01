import { fabric } from "fabric";
export default function CutSubmenu(props) {
    console.log("d");
    //TODO: 자르기 할 때 박스 바깥쪽 어둡게 보이는 것 clip-path property로 할 수 있음.
    //TODO: 자르는 박스가 캔버스 영역 바깥으로 나가지 않게 할 것 
    var selectionRect;
    const canvas = props.canvas;
    canvas.off('selection:updated');
    function crop(ratio) {
        console.log(ratio);
        var rectWidth;
        var rectHeight; 
        if(ratio ==='3:2'){
            console.log("저요");
            rectHeight = canvas.height;
            rectWidth = rectHeight *(3/2);
            console.log(rectHeight);
        }else if(ratio =='4:3'){
            rectHeight = canvas.height;
            rectWidth = rectHeight *(4/3);
        }else if (ratio =='16:9'){
            rectHeight = canvas.height;
            rectWidth = rectHeight *(16/9);
        }
        
        selectionRect = new fabric.Rect({
            fill: 'rgba(0,0,0,0.3)',
            stroke: 'black',
            originX: 'left',
            originY: 'top',
            opacity: 1,
            width: 300,
            height: 200,
            hasRotatingPoint: false,
            transparentCorners: false,
            cornerColor: 'white',
            cornerStrokeColor: 'black',
            borderColor: 'black',
        });
        canvas.add(selectionRect);
    }

    function apply() {
        var image = canvas.backgroundImage;

        image.set({
            left: -selectionRect.left + image.left,
            top: -selectionRect.top + image.top,
        }, () => {
            console.log("함");
        });
        console.log(image.width);


        canvas.remove(selectionRect);


        canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas), {
            // Optionally add an opacity lvl to the image
            // backgroundImageOpacity: 0.5,
            // should the image be resized to fit the container?
            // backgroundImageStretch: false
        });
        console.log(selectionRect.getScaledHeight());
        canvas.setDimensions({
            width: selectionRect.getScaledWidth(),  //.width 로 하면 실시간으로 바뀌는 너비, 높이를 얻지 못함
            height: selectionRect.getScaledHeight(),
        })
        canvas.renderAll();
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