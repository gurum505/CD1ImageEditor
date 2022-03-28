import { fabric } from "fabric";
export default function Header(props) {
    const canvas = props.canvas.current;



    function importImage() {
        document.getElementById('import-image-file').addEventListener("change", function (e) {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (f) {
                var data = f.target.result;
                fabric.Image.fromURL(data, function (img) {
                    // add background image
                    canvas.setWidth(img.width);
                    canvas.setHeight(img.height);
                    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                        // scaleX: canvas.width / img.width,  : 이미지 크기를 캔버스 크기로 확장 
                        // scaleY: canvas.height / img.height
                    
                    });
                });
            };
            reader.readAsDataURL(file);
        });
    }

    //새 프로젝트 
    function clearCanvas() { //캔버스 초기화 
        canvas.clear();
        canvas.setBackgroundColor("white");
    }

    //이미지 다운로드
    function downloadImage() {
        var image = canvas.toDataURL();  //canvas 그림을 문자열 형태로 
        var link = document.createElement('a'); //<a> 생성
        link.href = image;
        link.download = "image.png";
        link.click();
    }

    // 직렬화 
    function serialization() {
        var json = JSON.stringify(canvas);
        json = [json];
        var blob = new Blob(json, { type: "text/plain;charset=utf-8" });
        var link = document.createElement('a'); //<a> 생성
        var json = canvas.toJSON(['selectable', 'name', 'ownType', 'ddlValue', 'lockScalingX']);

        link.href = URL.createObjectURL(blob);
        link.download = "image.json";
        link.click();
    }

    // 역직렬화
    function Deserialization() {
        canvas.off('object:added'); //역직렬화 시 object : added가 되면서 객체 삭제 버튼이 누를 수 있게 되는 것을 방지 
        const originalToObject = fabric.Object.prototype.toObject;
        const myAdditional = ['type'];
        fabric.Object.prototype.toObject = function (additionalProperties) {
            return originalToObject.call(this, myAdditional.concat(additionalProperties));
        }
        document.getElementById("Deserialization-json-file").onchange = function (e) {
            var reader = new FileReader();
            reader.onload = function (e) { //onload(): 읽기 성공 시 실행되는 핸들러
                canvas.loadFromJSON(reader.result);
            }
            reader.readAsText(e.target.files[0]); // dataURL 형식으로 파일 읽음
        }
    }


    return (
        <div className="editor-header">
            <div className="logo" >
                <a href="/">
                    <img src={require('../logo.jpg')} />
                </a>
            </div>
            <div className="editor-header-buttons" >
                <button className="new-project" onClick={clearCanvas}>
                    새프로젝트
                </button>
               
                <button className="new-project" onClick={downloadImage}>
                    이미지 다운로드
                </button>
                <button className="serialization" onClick={serialization} >
                    프로젝트 저장하기
                </button>
                <button className="json-file-upload-button">
                    <label htmlFor="Deserialization-json-file">
                        프로젝트 가져오기
                    </label>
                </button>

                <input type="file" id="Deserialization-json-file" name="chooseFile" accept="application/JSON"
                    onClick={Deserialization} />

                <button className="import-image">
                    <label htmlFor="import-image-file">
                        배경 이미지  
                    </label>
                </button>
                <input type="file" id="import-image-file" name="chooseFile" accept="image/*" onClick={importImage} />

            </div>
        </div>
    )
}

