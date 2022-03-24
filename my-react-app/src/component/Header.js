import { fabric } from "fabric";
import { useState } from "react";
export default function Header(props) {
    console.log("헤더 렌더링");
    const canvas = props.canvas.current;
    const [isDeserializaion, setIsDeserializaion] = useState(false);
    console.log(props.whichObject);
    //이미지 가져오기 
    function importImage() {
        document.getElementById("import-image-file").onchange = function (e) {
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
        const originalToObject = fabric.Object.prototype.toObject;
        const myAdditional = ['type'];
        fabric.Object.prototype.toObject = function (additionalProperties) {
            return originalToObject.call(this, myAdditional.concat(additionalProperties));
        }
        document.getElementById("Deserialization-json-file").onchange = function (e) {
            var reader = new FileReader();
            reader.onload = function (e) { //onload(): 읽기 성공 시 실행되는 핸들러
                canvas.loadFromJSON(reader.result);
                // canvas.setActiveObject();
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
                <button className="import-image">
                    <label htmlFor="import-image-file">
                        이미지 가져오기
                    </label>
                </button>
                <input type="file" id="import-image-file" name="chooseFile" accept="image/*" onClick={importImage} />

                <button className="new-project" onClick={downloadImage}>
                    이미지 다운로드
                </button>
                <button className="serialization" onClick={serialization} >
                    직렬화
                </button>
                <button className="json-file-upload-button">
                    <label htmlFor="Deserialization-json-file">
                        역직렬화
                    </label>
                </button>
                <input type="file" id="Deserialization-json-file" name="chooseFile" accept="application/JSON"
                    onClick={Deserialization} />
            </div>
        </div>
    )
}

