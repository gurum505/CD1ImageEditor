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
    canvas.on(
        'selection:created', function (opt) {
            console.log("선택 생성");
            var button = document.getElementById('remove-object');
            button.disabled = false;

            document.onkeydown = function (e) { // delete, backspace 키로 삭제
                {
                    if (e.which == 46 || e.which == 8)
                        canvas.remove(canvas.getActiveObject());
                }

            }
        });
    canvas.on(
        'selection:updated', function (opt) {
            console.log("선택 업데이트");
            const button = document.getElementById('remove-object');
            button.disabled = false;
        });
    canvas.on(
        'selection:cleared', function (opt) {
            console.log("선택 없음");
            const button = document.getElementById('remove-object');
            button.disabled = true;
        });
})




function clearCanvas() { //캔버스 초기화 
    canvas.clear();
    canvas.setBackgroundColor("white");
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
    var text = new fabric.Textbox('text box',
        {
            left: Math.floor(Math.random() * 101),
            top: Math.floor(Math.random() * 101),
            width: 200
        });
    canvas.add(text);
}


//개체 삭제 
function removeObject() {
    console.log(canvas.getActiveObject());
    canvas.remove(canvas.getActiveObject());

}


// 직렬화 
function serialization() {
    json = JSON.stringify(canvas);
    json = [json];
    var blob = new Blob(json, { type: "text/plain;charset=utf-8" });
    var link = document.createElement('a'); //<a> 생성
    link.href = URL.createObjectURL(blob);
    link.download = "image.json";
    link.click();


}

// 역직렬화
function Deserialization() {
    document.getElementById("choose-json-file").onchange = function (e) {
        var reader = new FileReader();
        reader.onload = function (e) { //onload(): 읽기 성공 시 실행되는 핸들러
            canvas.loadFromJSON(reader.result);
        }
        reader.readAsText(e.target.files[0]); // dataURL 형식으로 파일 읽음
    }

}