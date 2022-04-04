import { fabric } from "fabric";
import {FolderOpenOutlined,CloudDownloadOutlined,UploadOutlined,
    FileImageOutlined,RedoOutlined,UndoOutlined,DownloadOutlined} from "@ant-design/icons"
import { useEffect } from "react";

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
    const stateRef = props.stateRef;
    const modsRef = props.modsRef;
    const objectNumRef = props.objectNumRef;
    var canvas = props.canvasRef.current;

    //FIXME:불러오는 이미지가 캔버스보다 클 때 submenu를 넘어가는 것 수정 필요 

    function updateModifications(savehistory) {
        if (savehistory === true) {
            var myjson = canvas.toDatalessJSON(['width','height']);
            stateRef.current.push(myjson);
        }
    }

    useEffect(() => {
        document.onkeydown = function (e) { // delete, backspace 키로 삭제
            if (e.ctrlKey && e.key === 'z') {
                undo()  // ctrl+ z로 undo 
            }
            //FIXME:  세 키 한 번에 입력할 때 안됨 
            else if (e.ctrlKey && e.shiftKey) {
                redo(); //ctrl + shift + z 로 redo
            }
        }

    });

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
            updateModifications(true);
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
        el.insertBefore(div,el.firstChild);  //스택처럼 쌓이게 (최근 것이 위로)   
    }

    function colorActiveLayer(){
        var layerElements = document.getElementById('layer');
        for (let i = 0; i < layerElements.children.length; i++) {
            layerElements.children[i].style.border ='solid blue';
          }
        var objects = canvas.getActiveObjects();
        objects.forEach((object)=>{
            console.log(object);
            if(document.getElementById(object.id))
           document.getElementById(object.id).style.border ='solid red'
       })
    }

    function removeAllLayer(){
        var prevObjects = canvas.getObjects(); //undo 하기 전에 layer 제거 
        prevObjects.forEach((object)=>{
            document.getElementById(object.id).remove();
        })
    }
    function importImage(e) {
        e.target.value = '' //같은 이름의 이미지 파일 업로드가 안되는 것 방지 
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
                    stateRef.current = [];
                    var myjson = canvas.toDatalessJSON(['width', 'height']);
                    stateRef.current.push(myjson);

                    modsRef.current = 0;
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
        var json = canvas.toDatalessJSON(['id','width','height','objectNum'])
        console.log(json)
        json = JSON.stringify(json);

        
        var blob = new Blob([json], { type: "text/plain;charset=utf-8" });
        var link = document.createElement('a'); //<a> 생성

        link.href = URL.createObjectURL(blob);
        link.download = "image.json";
        link.click();
        
    }

    // 역직렬화
    function Deserialization() {
        var prevObjects = canvas.getObjects(); //undo 하기 전에 layer 제거 
        console.log(prevObjects);
        prevObjects.forEach((object)=>{
            document.getElementById(object.id).remove();
        })
        document.getElementById("Deserialization-json-file").onchange = function (e) {
            var reader = new FileReader();
            reader.onload = function (e) { //onload(): 읽기 성공 시 실행되는 핸들러
                canvas.loadFromJSON(reader.result, ()=>{
                    canvas.setHeight(canvas.height);
                    canvas.setWidth(canvas.width); 
                    var prevCanvasObjects = canvas.getObjects().length;
                    objectNumRef.current = prevCanvasObjects;
                    stateRef.current = [];
                    modsRef.current= 0;
                    canvas.renderAll.bind(canvas);
                    console.log(canvas);
                    var objects = canvas.getObjects();
                    objects.forEach((object)=>{
                        addLayer(object);
                    })
                    stateRef.current.push(canvas.toDatalessJSON())

                    var objects = canvas.getActiveObjects();
                    objects.forEach((object) => {
                        if (document.getElementById(object.id))
                            document.getElementById(object.id).style.border = 'solid red'
                    })

                // if (data.backgroundImage !== undefined) {
                //     canvas.setWidth(data.backgroundImage.width);
                //     canvas.setHeight(data.backgroundImage.height);

                //     fabric.Image.fromURL(data.backgroundImage.src, function (img) {
                //         canvas.setBackgroundImage(img);
                //         myjson = canvas.toDatalessJSON(['width', 'height', 'backgroundImage']);
                //         console.log(myjson);
                //         state.current.push(myjson);
                //         console.log(state.current.length);

                //     });
                // }
                // else{
                //     state.current.push(canvas.toJSON());
                // }
                // canvas.renderAll();
                });
                canvas.renderAll();
            }
            reader.readAsText(e.target.files[0]); // dataURL 형식으로 파일 읽음
        }
    }
    function undo() {
        if (modsRef.current < stateRef.current.length - 1 && stateRef.current.length > 1) {
            removeAllLayer();
            canvas.clear().renderAll();
            var json = stateRef.current[stateRef.current.length - 2 - modsRef.current];
            canvas.loadFromJSON(json, () => {
                if (json.width) {
                    if (json.width) canvas.setWidth(json.width);
                    if (json.height) canvas.setHeight(json.height);
                }
                canvas.renderAll.bind(canvas);
                modsRef.current += 1;
                var objects = canvas.getObjects();
                objects.forEach((object) => {
                    addLayer(object);
                    colorActiveLayer();

                }
                )
            });
            //After loading JSON it’s important to call canvas.renderAll(). In the 2nd parameter of canvas.loadFromJSON(json, callback) you can define a cllback function which is invoked after all objects are loaded/added.

        }

    }

    function redo() {
        if (modsRef.current > 0) {
            removeAllLayer();
            canvas.clear().renderAll();
            canvas.loadFromJSON(stateRef.current[stateRef.current.length - modsRef.current], () => {
                canvas.renderAll.bind(canvas);
                modsRef.current -= 1;
                var objects = canvas.getObjects();
                objects.forEach((object) => {
                    addLayer(object);
                    document.getElementById('layer')
                    colorActiveLayer();

                }
                )
            });
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
