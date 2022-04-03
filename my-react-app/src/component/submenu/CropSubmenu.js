import { fabric } from "fabric";
export default function CropSubmenu(props) {
    const stateRef = props.stateRef;
    const canvas = props.canvasRef.current;
    var currentImage;
    var selectionRect;

    function updateModifications(savehistory) {
        if (savehistory === true) {
            var myjson = canvas.toDatalessJSON(['width', 'height', 'id']);
            stateRef.current.push(myjson);
        }

    }

    function addSelectionRect(ratio = '') {
        var height = parseInt(canvas.height);
        var width;
        if (ratio === '3:2') width = height * (3 / 2.0);
        else if (ratio === '4:3') width = height * (4 / 3.0);
        else if (ratio === '16:9') width = height * (16 / 9.0);
        else if (ratio === '1:1') width = height;
        selectionRect = new fabric.Rect({
            fill: 'rgba(0,0,0,0.3)',
            originX: 'left',
            originY: 'top',
            stroke: 'black',
            opacity: 1,
            width: `${width}`,
            height: `${height}`,
            hasRotatingPoint: false,
            transparentCorners: false,
            cornerColor: 'white',
            cornerStrokeColor: 'black',
            borderColor: 'black',
            cornerSize: 12,
            padding: 0,
            cornerStyle: 'circle',
            borderDashArray: [5, 5],
            borderScaleFactor: 1.3,
            cropRect: true
        });
        selectionRect.set({ 'width': width, 'height': height });
        canvas.centerObject(selectionRect);
        canvas.add(selectionRect);
    }

    function crop(ratio) {
        if (canvas.getActiveObject() === selectionRect) canvas.remove(selectionRect);
        addSelectionRect(ratio);
        canvas.setActiveObject(selectionRect);
        var cropBtn = document.querySelectorAll('.crop-button');
        cropBtn.forEach((btn) => {
            btn.disabled = true;
        })
    }

    function apply() {
        if (canvas.getActiveObject() === selectionRect) canvas.remove(selectionRect);
        var prevObjects = canvas.getObjects(); //undo 하기 전에 layer 제거 
        prevObjects.forEach((object) => {
            if (object.cropRect === undefined)
                document.getElementById(object.id).remove();
        });

        fabric.Image.fromURL(canvas.toDataURL(), img => {
            currentImage = img; //현재 캔버스를 currentIamge 로 저장
            currentImage.set({
                // scaleX : canvas.width / currentImage.width,
                // scaleY : canvas.height / currentImage.height,
                cropX: selectionRect.left,
                cropY: selectionRect.top,
                width: selectionRect.getScaledWidth(),
                height: selectionRect.getScaledHeight(),

            });
            canvas.setDimensions({
                width: selectionRect.getScaledWidth(),
                height: selectionRect.getScaledHeight()
            });

            canvas.add(currentImage);
            canvas.setBackgroundImage(currentImage).renderAll();
            var prevObjects = canvas.getObjects();
            prevObjects.forEach((object) => {
                canvas.remove(object);
            });
            canvas.remove(selectionRect);
            var cropBtn = document.querySelectorAll('.crop-button');
            cropBtn.forEach((btn) => {
                btn.disabled = false;
            });
            updateModifications(true); //#FIXME: REDO 할 때 캔버스 크기도 
            props.setButtonType('');
        });




    }


    function cropCustom() {

        var objects = canvas.getObjects();

        canvas.defaultCursor = 'crosshair';
        if (canvas.getActiveObject() === selectionRect) canvas.remove(selectionRect);
        var cropBtn = document.querySelectorAll('.crop-button');
        cropBtn.forEach((btn) => {
            btn.disabled = true;
        })
        canvas.off('mouse:down');
        var isDown, origX, origY;

        canvas.on('mouse:down', function (o) {
            objects.forEach((object) => {     //드래그 하면 기존의 객체까지 group select가 되어서 제대로 된 left, top 을 얻을 수 없음
                object.set('selectable', false);
            })
            isDown = true;
            var pointer = canvas.getPointer(o.e);
            origX = pointer.x; //클릭시 마우스 x좌표
            origY = pointer.y; //클릭시 마우스 y좌표 
            selectionRect = new fabric.Rect({
                fill: 'rgba(0,0,0,0.3)',
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                stroke: 'black',
                opacity: 1,
                width: 1,
                height: 1,
                hasRotatingPoint: false,
                transparentCorners: false,
                cornerColor: 'white',
                cornerStrokeColor: 'black',
                borderColor: 'black',
                cornerSize: 12,
                padding: 0,
                cornerStyle: 'circle',
                borderDashArray: [5, 5],
                borderScaleFactor: 1.3,
                cropRect: true,
            });
            canvas.add(selectionRect);


        });

        canvas.on('mouse:move', function (o) {
            if (!isDown) return;
            var pointer = canvas.getPointer(o.e);

            if (origX > pointer.x) {
                selectionRect.set({ left: Math.abs(pointer.x) });
            }
            if (origY > pointer.y) {
                selectionRect.set({ top: Math.abs(pointer.y) });
            }

            selectionRect.set({ width: Math.abs(origX - pointer.x) });
            selectionRect.set({ height: Math.abs(origY - pointer.y) });
            canvas.renderAll();
        });

        canvas.on('mouse:up', function (o) {
            objects.forEach((object) => {     //드래그 하면 기존의 객체까지 group select가 되어서 제대로 된 left, top 을 얻을 수 없음
                object.set('selectable', true);
            })
            isDown = false;
            // canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.defaultCursor = 'default';
            canvas.off('mouse:down');
            canvas.off('mouse:move');
            canvas.off('mouse:up');
            cropBtn.forEach((btn) => {
                btn.disabled = false;
            })
            canvas.defaultCursor = 'default';

        });

    }

    function cancle() {
        if (canvas.getActiveObject() === selectionRect) canvas.remove(selectionRect);
        var cropBtn = document.querySelectorAll('.crop-button');
        cropBtn.forEach((btn) => {
            btn.disabled = false;
        })
    }



    return (

        <ul style={{ listStyle: "none", }}>
            <li ><button className="crop-button" onClick={cropCustom}>코스튬</button></li>
            <li ><button className="crop-button" onClick={() => crop('1:1')}>정방형</button></li>
            <li ><button className="crop-button" onClick={() => crop('3:2')}>3:2</button></li>
            <li ><button className="crop-button" onClick={() => crop('4:3')}>4:3</button></li>
            <li ><button className="crop-button" onClick={() => crop('16:9')}>16:9</button></li>
            <hr></hr>
            <li><button onClick={apply}>적용</button></li>
            <li><button onClick={cancle}>취소</button></li>
        </ul>

    )
}