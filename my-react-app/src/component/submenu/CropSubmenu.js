import { fabric } from "fabric";

export default function CropSubmenu(props) {
    const stateRef = props.stateRef;
    const canvas = props.canvasRef.current;
    var currentImage;
    var selectionRect;
    canvas.off();
    var left1 = 0;
    var top1 = 0;
    var scale1x = 0;
    var scale1y = 0;
    var width1 = 0;
    var height1 = 0;

    //crop 상자가 범위를 초과하지 않게 
    canvas.on('object:scaling', function (e) {
        var obj = e.target;
        obj.setCoords();
        var brNew = obj.getBoundingRect();

        if (((brNew.width + brNew.left) >= obj.canvas.width) || ((brNew.height + brNew.top) >= obj.canvas.height) || ((brNew.left < 0) || (brNew.top < 0))) {
            obj.left = left1;
            obj.top = top1;
            obj.scaleX = scale1x;
            obj.scaleY = scale1y;
            obj.width = width1;
            obj.height = height1;
        }
        else {
            left1 = obj.left;
            top1 = obj.top;
            scale1x = obj.scaleX;
            scale1y = obj.scaleY;
            width1 = obj.width;
            height1 = obj.height;
        }
    });
    canvas.on('object:moving', function (e) {
        var obj = e.target;
        // if object is too big ignore
        if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
            return;
        }
        obj.setCoords();
        // top-left  corner
        if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
            obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
            obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
        }
        // bot-right corner
        if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
            obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
            obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
        }
    });

    function updateModifications(savehistory) {
        if (savehistory === true) {
            var myjson = canvas.toDatalessJSON(['width', 'height', 'id']);
            stateRef.current.push(myjson);
        }

    }

    function addSelectionRect(ratio = '') {
        var height = parseInt(canvas.height);
        var ratio;
        if (ratio === '3:2') ratio = 3 / 2
        else if (ratio === '4:3') ratio = 4 / 3
        else if (ratio === '16:9') ratio = 16 / 9
        else if (ratio === '1:1') ratio = 1 / 1
        selectionRect = new fabric.Rect({
            fill: 'rgba(0,0,0,0.3)',
            originX: 'left',
            originY: 'top',
            stroke: 'black',
            opacity: 1,
            width: canvas.height * ratio,
            height: canvas.height - 3,
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
        // selectionRect.set({ 'width': width, 'height': height });
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

        var isDown, origX, origY;

        canvas.on('mouse:down', function (o) {
            canvas.selection = false;

            objects.forEach((object) => {     //드래그 하면 기존의 객체까지 group select가 되어서 제대로 된 left, top 을 얻을 수 없음
                object.set('selectable', false);
            })
            isDown = true;
            var pointer = canvas.getPointer(o.e);
            origX = pointer.x; //클릭시 마우스 x좌표
            origY = pointer.y; //클릭시 마우스 y좌표 
            selectionRect = new fabric.Rect({
                fill: 'transparent',
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                stroke: '#ccc',
                strokeDashArray: [2, 2],
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
            if (pointer.x > canvas.width || pointer.x < 0) {
            }
            if (origX > pointer.x && pointer.x > 0) {
                selectionRect.set({ left: Math.abs(pointer.x) });
            }
            if (origY > pointer.y && pointer.y > 0) {
                selectionRect.set({ top: Math.abs(pointer.y) });
            }
            if (!(pointer.x > canvas.width || pointer.x < 0))
                selectionRect.set({ width: Math.abs(origX - pointer.x) });

            if (!(pointer.y > canvas.height || pointer.y < 0))
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
            canvas.selection = true;


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