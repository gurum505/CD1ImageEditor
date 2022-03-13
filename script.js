var canvas;
var ctx;

function draw() {
     canvas = document.getElementById('canvas');
    if (canvas.getContext) {
       ctx = canvas.getContext('2d');

      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.fillRect(0,0,1500, 600);


     
    }
  }

//사진 첨부
function selectImage(){
    var reader = new FileReader();
    var img = new Image();
    const uploadImage = (e) =>{
        reader.onload = () =>{
            img.onload = () =>{
                
                ctx.drawImage(img,0,0);
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
    var image = canvas.toDataURL();
    var link = document.createElement('a');
    link.href= image;
    link.download= "image.png";
    link.click();
    document.querySelector("button").addEventListener("click",download);

}

