import { fabric } from "fabric";
import {
    FolderOpenOutlined, CloudDownloadOutlined, UploadOutlined,
    FileImageOutlined, RedoOutlined, UndoOutlined, DownloadOutlined
} from "@ant-design/icons"
//새프로젝트
//<FileAddOutlined />
//<FolderOpenOutlined />
//이미지 가져오기 
//<CloudDownloadOutlined />
//이미지 저장! 다운로드 말고
// <FileImageOutlined />
//REDO UNDO
//<RedoOutlined /> <UndoOutlined />
//프로젝트 업로드 다운로드
//<DownloadOutlined /> <UploadOutlined />

export default function Header(props) {
    const state = props.state;
    const mods = props.mods;
    var canvas = props.canvasRef.current;

    //FIXME:불러오는 이미지가 캔버스보다 클 때 submenu를 넘어가는 것 수정 필요 

    function addLayer(object) {  //레이어에 객체 추가 
        const div = document.createElement('div');
        div.id = object.id;
        div.style.border=' solid #0000FF';
        div.style.width = '130px';
        const el = document.getElementById('layer');

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = ()=>{
            canvas.remove(object);
            document.getElementById(object.id).remove();
        }

        const objectBtn = document.createElement('button');
        objectBtn.innerHTML = object.type;
        objectBtn.className = "layer-object";
        objectBtn.onclick = () => {
            canvas.setActiveObject(object);
            canvas.renderAll();
        }

        div.appendChild(objectBtn);
        div.appendChild(deleteBtn);
        el.insertBefore(div,el.firstChild);  //스택처럼 쌓이게 
        
    }
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
        console.log(canvas);
        var json = canvas.toDatalessJSON(['id'])
        json = JSON.stringify(json);

        
        var blob = new Blob([json], { type: "text/plain;charset=utf-8" });
        var link = document.createElement('a'); //<a> 생성

        link.href = URL.createObjectURL(blob);
        link.download = "image.json";
        link.click();
        
    }

    // 역직렬화
    function Deserialization() {

        document.getElementById("Deserialization-json-file").onchange = function (e) {
            var reader = new FileReader();
            reader.onload = function (e) { //onload(): 읽기 성공 시 실행되는 핸들러
                canvas.loadFromJSON(reader.result, ()=>{
                    canvas.renderAll.bind(canvas);
                    console.log(canvas);
                    var objects = canvas.getObjects();
                    objects.forEach((object)=>{
                        addLayer(object);
                    })
                    
                });
                let data = JSON.parse(reader.result);
                var myjson;
                state.current = [];
                mods.current = 0;
                if (data.backgroundImage !== undefined) {
                    canvas.setWidth(data.backgroundImage.width);
                    canvas.setHeight(data.backgroundImage.height);

                    fabric.Image.fromURL(data.backgroundImage.src, function (img) {
                        canvas.setBackgroundImage(img);
                        myjson = canvas.toDatalessJSON(['width', 'height', 'backgroundImage']);
                        console.log(myjson);
                        state.current.push(myjson);
                    });
                }
                else{
                    state.current.push(canvas.toJSON());
                }
                canvas.renderAll();
            }
            reader.readAsText(e.target.files[0]); // dataURL 형식으로 파일 읽음
        }
    }
    function undo() {
        var prevObjects = canvas.getObjects(); //undo 하기 전에 layer 제거 
        console.log(prevObjects);
        prevObjects.forEach((object)=>{
            document.getElementById(object.id).remove();
        })
        if (mods.current < state.current.length - 1 && state.current.length > 1) {
            canvas.clear().renderAll();
            var json = state.current[state.current.length - 2 - mods.current];
            canvas.loadFromJSON(json, () => {
                if (json.width) {
                    if (json.width) canvas.setWidth(json.width);
                    if (json.height) canvas.setHeight(json.height);
                }
                canvas.renderAll.bind(canvas);
                console.log(canvas.getObjects());


            });
            //After loading JSON it’s important to call canvas.renderAll(). In the 2nd parameter of canvas.loadFromJSON(json, callback) you can define a cllback function which is invoked after all objects are loaded/added.
            mods.current += 1;
        }
        var objects= canvas.getObjects();
        

        objects.forEach((object)=>{
            addLayer(object);
            }
        )
        
     
    }

    function redo() {
        var prevObjects = canvas.getObjects(); //undo 하기 전에 layer 제거 
        prevObjects.forEach((object)=>{
            document.getElementById(object.id).remove();
        })
        if (mods.current > 0) {
            canvas.clear().renderAll();
            canvas.loadFromJSON(state.current[state.current.length - mods.current], canvas.renderAll.bind(canvas));

            mods.current -= 1;
        }
        var objects= canvas.getObjects();
        

        objects.forEach((object)=>{
           addLayer(object);
            }
        )
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
