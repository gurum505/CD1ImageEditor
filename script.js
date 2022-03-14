var canvas;

//마우스 위치
var currentMouseX;
var currentMouseY;

//html 파일 로드 되었을 때(초기화면)
window.addEventListener("load", () => { //canvas : fabric 객체를 관리하는 객체
    canvas = new fabric.Canvas('c', {
        backgroundColor: "white"
    });
    canvas.setHeight(400);
    canvas.setWidth(800);

    canvas.on(
        'object:added', function () {
            console.log("추가");
            canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1)); //객체 생성 시 setActive
        });
    canvas.on(
        'object:modified', function () {
            console.log("수정");
        });

    canvas.on('mouse:wheel', function (opt) {
        var delta = opt.e.deltaY;
        var zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
    });

})



function clearCanvas() { //캔버스 초기화 
    canvas.clear();
    canvas.setBackgroundColor("white");
    // canvas = new fabric.Canvas('c', {
    //     backgroundColor: "white"
    // });
    // canvas.setHeight(400);
    // canvas.setWidth(800);
}

//이미지 첨부
function selectImage() {

    document.getElementById("choose-file").onchange = function (e) {
        var reader = new FileReader();
        reader.onload = function (e) { //onload(): 읽기 성공 시 실행되는 핸들러
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                var img = new fabric.Image(image);
                img.set({

                    left: 100,
                    top: 60
                });
                img.scaleToWidth(200);
                canvas.add(img).setActiveObject(img).renderAll();
            }
        }
        reader.readAsDataURL(e.target.files[0]); // dataURL 형식으로 파일 읽음
    }
}

//이미지 다운로드
function downloadImage() {
    var image = canvas.toDataURL();  //canvas 그림을 문자열 형태로 
    var link = document.createElement('a'); //<a> 생성
    link.href = image;
    link.download = "image.png";
    link.click();
}

// document.querySelector("button").addEventListener("click",downloadImage);


//그리기(펜)

function drawLine() {
    console.log(canvas);
    canvas.isDrawingMode = true;
    if (canvas.isDrawingMode == true) {
        console.log("켜짐");
    }
    canvas.on('mouse:up', function () {
        canvas.isDrawingMode = false;
    });

}


//도형삽입 
function drawRectangle() {
    canvas.add(new fabric.Rect({
        left: Math.floor(Math.random() * 101),
        top: Math.floor(Math.random() * 101),
        fill: '#f55',
        width: 50,
        height: 50
    }));

}

function drawCircle() {
    canvas.add(new fabric.Circle({
        radius: 30, fill: '#f55',
        top: Math.floor(Math.random() * 101),
        left: Math.floor(Math.random() * 101)
    }));
}


function test() {
    console.log("ㅇㅋ");
    console.log(disableMovement);
    console.log(selection);
    canvas.on('mouse:down', function (o) {
        if (disableMovement || selection) return;
        isDown = true;
        console.log('down')
        var pointer = canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        var pointer = canvas.getPointer(o.e);
        rect = new fabric.Rect({
            left: origX,
            top: origY,
            originX: 'left',
            originY: 'top',
            width: pointer.x - origX,
            height: pointer.y - origY,
            angle: 0,
            fill: 'rgba(255,0,0,0.5)',
            transparentCorners: false,
        });
        canvas.add(rect);
    });
}
//text박스 삽입
function textBox() {
    var text = new fabric.Textbox('A Computer Science Portal',
        {
            width: 450
        });
    canvas.add(text);
}