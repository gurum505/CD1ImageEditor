import { fabric } from "fabric";
import {FolderOpenOutlined,CloudDownloadOutlined,UploadOutlined,
    FileImageOutlined,RedoOutlined,UndoOutlined,DownloadOutlined} from "@ant-design/icons"

//2번째 줄- 즉시 효과를 갖는, 사이드바를 구성하기에 부적합한 부가적인 기능들    
//앞으로 가져오기 -rotate(90)
//<DownOutlined />
//맨 앞으로 가져오기-rotate(90)
//<DoubleRightOutlined />
//뒤로보내기-rotate(90)
//<UpOutlined /> 
//맨 뒤로 보내기-rotate(90)
//<DoubleLeftOutlined />
//이미지 자르기
//<ScissorOutlined />
//이미지 자르기 적용
//<CheckOutlined />
//이미지 자르기 취소
//<CloseOutlined />
//복사 
//<CopyOutlined />
//삭제
//<DeleteOutlined />

export default function Header(props) {
    const state = props.state;
    const mods = props.mods;
    var canvas = props.canvasRef.current;

    //FIXME:불러오는 이미지가 캔버스보다 클 때 submenu를 넘어가는 것 수정 필요 
    function importImage(e) {
        e.target.value = ''

        document.getElementById('import-image-file').onchange = function (e) {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (f) {
                var data = f.target.result;
                fabric.Image.fromURL(data, function (img) {
                    canvas.setHeight(img.height);
                    canvas.setWidth(img.width);
                    canvas.setBackgroundImage(img);
                    canvas.renderAll();
                    state.current = [];
                    var myjson = canvas.toDatalessJSON(['width', 'height']);
                    state.current.push(myjson);

                    mods.current = 0;
                });
            };
            reader.readAsDataURL(file);
        };

        if (document.getElementById('filter-list') != null) {
            document.getElementById('opacity').value = 5;
            document.getElementById('blur').value = 0;
            document.getElementById('brightness').value = 0;
            document.getElementById('pixelate').value = 0;
        }
    }

    //새 프로젝트 
    function clearCanvas() { //캔버스 초기화 
        window.location.reload();

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

        link.href = URL.createObjectURL(blob);
        link.download = "image.json";
        link.click();
    }

    // 역직렬화
    function Deserialization() {
        canvas.off('object:added'); //역직렬화 시 object : added가 되면서 객체 삭제 버튼이 누를 수 있게 되는 것을 방지 

        document.getElementById("Deserialization-json-file").onchange = function (e) {
            var reader = new FileReader();
            reader.onload = function (e) { //onload(): 읽기 성공 시 실행되는 핸들러
                canvas.loadFromJSON(reader.result, canvas.renderAll.bind(canvas));
                var test = canvas.toDatalessJSON(['width', 'height']);
                let data = JSON.parse(reader.result);

                state.current = [];
                mods.current = 0;
                if (data.backgroundImage !== undefined) {
                    canvas.setWidth(data.backgroundImage.width);
                    canvas.setHeight(data.backgroundImage.height);

                    fabric.Image.fromURL(data.backgroundImage.src, function (img) {
                        canvas.setBackgroundImage(img);
                        var myjson = canvas.toDatalessJSON(['width', 'height', 'backgroundImage']);
                        state.current.push(myjson);
                    });

                }
            }
            reader.readAsText(e.target.files[0]); // dataURL 형식으로 파일 읽음
        }
    }
    function undo() {
        if (mods.current < state.current.length - 1 && state.current.length > 1) {
            canvas.clear().renderAll();
            var json = state.current[state.current.length - 2 - mods.current];
            canvas.loadFromJSON(json, () => {
                if (json.width) {
                    if (json.width) canvas.setWidth(json.width);
                    if (json.height) canvas.setHeight(json.height);
                }
                canvas.renderAll.bind(canvas);

            });
            //After loading JSON it’s important to call canvas.renderAll(). In the 2nd parameter of canvas.loadFromJSON(json, callback) you can define a cllback function which is invoked after all objects are loaded/added.
            mods.current += 1;
        }
    }

    function redo() {
        if (mods.current > 0) {
            canvas.clear().renderAll();
            canvas.loadFromJSON(state.current[state.current.length - mods.current], canvas.renderAll.bind(canvas));
            mods.current -= 1;
        }
    }


    return (
        <div className="editor-header">

            <div className="editor-header-buttons" >
                <button className="new-project" onClick={clearCanvas}>
                    <FolderOpenOutlined />새프로젝트
                </button>

                <button className="new-project" onClick={downloadImage}>
                    <FileImageOutlined /> 이미지 저장
                </button>
                <button className="serialization" onClick={serialization} >
                    <DownloadOutlined />프로젝트 다운로드
                </button>
                <button className="json-file-upload-button">
                    <label htmlFor="Deserialization-json-file">
                        <UploadOutlined />프로젝트 업로드
                    </label>
                </button>

                <input type="file" id="Deserialization-json-file" name="chooseFile" accept="application/JSON"
                    onClick={Deserialization} />

                <button className="import-image">
                    <label htmlFor="import-image-file">
                        <CloudDownloadOutlined />이미지 가져오기
                    </label>
                </button>
                <input type="file" id="import-image-file" name="chooseFile" accept="image/*" onClick={importImage} />
                <button id='undo' onClick={undo}><UndoOutlined />이전</button>
                <button id='redo' onClick={redo}><RedoOutlined />되돌리기</button>
            </div>
        </div>
    )
}

