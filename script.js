//html 파일 로드 되었을 때(초기화면)
window.addEventListener("load",()=>{
    var canvas = document.getElementById('canvas');
    canvas.height = 400;
    canvas.width = 800;
    if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(0,0,1500, 600);
    }
})

//이미지 첨부
function selectImage(){
    var canvas =document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var reader = new FileReader();
    var img = new Image(); //이미지 처리 객체 생성 
    const uploadImage = (e) =>{
        reader.onload = () =>{
            img.onload = () =>{
                canvas.width= img.width;
                canvas.height=img.height;
                // ctx.drawImage(img,(canvas.width-img.width)/2,(canvas.height-img.height)/2); //캔버스에 이미지 write 
                ctx.drawImage(img,0,0); //캔버스에 이미지 write 
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    const imageLoader = document.getElementById("choose-file");
    imageLoader.addEventListener("change",uploadImage);
}

//이미지 다운로드
function downloadImage(){
    var image = canvas.toDataURL();  //canvas 그림을 문자열 형태로 
    var link = document.createElement('a'); //<a> 생성
    link.href= image;
    link.download= "image.png";
    link.click();
}

// document.querySelector("button").addEventListener("click",downloadImage);


//그리기(펜)
var painting =false; 

function changeCursor(){
    document.getElementById("canvas").style.cursor = "crosshair";
}

function startPosition(e){
    
    painting = true; 
    draw(e);
}

function finishedPosition(){
    painting=  false;
    ctx.beginPath();    
}

function draw(e){
    if(!painting) return ;
    ctx.lineWidth = 5 ; 
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY-canvas.offsetTop);
    ctx.stroke(); //그리기 
    ctx.beginPath(); //경로 시작 
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY-canvas.offsetTop);
}

function drawLine(){
    changeCursor();
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    canvas.addEventListener("mousedown",startPosition);
    canvas.addEventListener("mouseup",finishedPosition);
    canvas.addEventListener("mousemove",draw);

}

