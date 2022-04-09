import { fabric } from "fabric";
import {
    FolderOpenOutlinedIcon, CloudDownloadOutlinedIcon, UploadOutlinedIcon,
    FileImageOutlinedIcon, RedoOutlinedIcon, UndoOutlinedIcon, DownloadOutlinedIcon
} from "./icons/icons"
import { useEffect } from "react";
import styles from "./Header.module.css"

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
    const canvas = props.canvas;

    //FIXME:불러오는 이미지가 캔버스보다 클 때 submenu를 넘어가는 것 수정 필요 
    var filterList = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
        'brightness', 'contrast', 'saturation', 'vibrance', 'noise', 'vintage',
        'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
        'polaroid', 'blend-color', 'gamma', 'kodachrome',
        'blackwhite', 'blend-image', 'hue', 'resize'];

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

    function updateModifications(savehistory) {
        if (savehistory === true) {
            var myjson = canvas.toDatalessJSON(['width', 'height', 'id']);
            stateRef.current.push(myjson);
        }
        //getRangeState();
    }

    function setCanvasCenter(canvas) { //캔버스를 div 내 가운데에 위치 시키는 함수 
        var wrapWidth = document.getElementsByClassName('wrap')[0].offsetWidth;
        var wrapHeight = document.getElementsByClassName('wrap')[0].offsetHeight;

        var canvasLeft = (wrapWidth - canvas.width) / 2 + 'px';
        var canvasTop = (wrapHeight - canvas.height) / 2 + 'px';

        var canvases = document.getElementsByTagName('canvas')
        for (var i = 0; i < canvases.length; i++) {
            canvases[i].style.left = canvasLeft
            canvases[i].style.top = canvasTop
        }
    }

    function addLayer(object) {  //레이어에 객체 추가 
        const div = document.createElement('div');
        div.id = object.id;
        div.style.border = ' solid #0000FF';
        div.style.width = '130px';
        const el = document.getElementById('layer');

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => {
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
        el.insertBefore(div, el.firstChild);  //스택처럼 쌓이게 (최근 것이 위로)   
    }

    function colorActiveLayer() {
        var layerElements = document.getElementById('layer');
        for (let i = 0; i < layerElements.children.length; i++) {
            layerElements.children[i].style.border = 'solid blue';
        }
        var objects = canvas.getActiveObjects();
        objects.forEach((object) => {
            if (document.getElementById(object.id))
                document.getElementById(object.id).style.border = 'solid red'
        })
    }

    function removeAllLayer() {
        var prevObjects = canvas.getObjects(); //undo 하기 전에 layer 제거 
        prevObjects.forEach((object) => {
            try {
                document.getElementById(object.id).remove();
            } catch (e) {
            }
        })
    }
    function importImage(e) {
        props.imageRef.current = true;
        props.setImage(!props.image);
        e.target.value = '' //같은 이름의 이미지 파일 업로드가 안되는 것 방지 
        document.getElementById('import-image-file').onchange = function (e) {
            var file = e.target.files[0];
            var reader = new FileReader();
            var prev_objects = canvas.getObjects();
            removeAllLayer(); //이전 객체들의 layer 삭제  
            prev_objects.forEach((object) => {  //이미지를 불러오면 이전의 캔버스의 객체들을 다 지움 
                canvas.remove(object);
            })
            reader.onload = function (f) {
                var data = f.target.result;
                fabric.Image.fromURL(data, function (img) {
                    canvas.setHeight(img.height);
                    canvas.setWidth(img.width);
                    canvas.setBackgroundImage(img);
                    canvas.renderAll();
                    var myjson = canvas.toDatalessJSON(['width', 'height']);
                    stateRef.current.push(myjson);
                    stateRef.current = [];
                    modsRef.current = 0;
                    setCanvasCenter(img);


                });
            };
            reader.readAsDataURL(file);
        };


        //필터 값들 기본 값으로 설정 
        var filters = document.getElementsByClassName('filter');
        for (var i = 0; i < filters.length; i++) {
            filters[i].value = document.getElementsByClassName('filter')[0].defaultValue;
            filters[i].checked = false;
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
        var json = canvas.toDatalessJSON(['id', 'width', 'height', 'objectNum'])
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
        prevObjects.forEach((object) => {
            document.getElementById(object.id).remove();
        })
        document.getElementById("Deserialization-json-file").onchange = function (e) {
            var reader = new FileReader();
            reader.onload = function (e) { //onload(): 읽기 성공 시 실행되는 핸들러
                canvas.loadFromJSON(reader.result, () => {
                    canvas.setHeight(canvas.height);
                    canvas.setWidth(canvas.width);
                    var prevCanvasObjects = canvas.getObjects().length;
                    objectNumRef.current = prevCanvasObjects;
                    stateRef.current = [];
                    modsRef.current = 0;
                    canvas.renderAll.bind(canvas);
                    var objects = canvas.getObjects();
                    objects.forEach((object) => {
                        addLayer(object);
                    })
                    stateRef.current.push(canvas.toDatalessJSON(['width', 'height', 'id']));
                    var objects = canvas.getActiveObjects();
                    objects.forEach((object) => {
                        if (document.getElementById(object.id))
                            document.getElementById(object.id).style.border = 'solid red'
                    })
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

                var state = canvas.filterListState;

                try {
                    var inputNodes = document.getElementById('filter-list').getElementsByTagName('input');
                    for (var i = 0; i < inputNodes.length; i++) {
                        var id = inputNodes[i].id;
                        var value = inputNodes[i].value;

                        if (inputNodes[i].type === 'checkbox') {
                            document.getElementById(id).checked = state[0][id];
                        } else if (inputNodes[i].type === 'range') {
                            document.getElementById(id).value = Number(state[1][id]);
                        } else {
                            document.getElementById(id).value = state[2][id];
                        }

                    }
                } catch (e) { }

                if (json.width) {
                    if (json.width) canvas.setWidth(json.width);
                    if (json.height) canvas.setHeight(json.height);
                    setCanvasCenter(json);

                }
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
            var json = stateRef.current[stateRef.current.length - modsRef.current];
            canvas.loadFromJSON(json, () => {
                var filters = canvas.backgroundImage.filters;
                var state = canvas.filterListState;
                try {
                    var inputNodes = document.getElementById('filter-list').getElementsByTagName('input');
                    for (var i = 0; i < inputNodes.length; i++) {
                        var id = inputNodes[i].id;
                        var value = inputNodes[i].value;

                        if (inputNodes[i].type === 'checkbox') {
                            document.getElementById(id).checked = state[0][id];
                        } else if (inputNodes[i].type === 'range') {
                            document.getElementById(id).value = Number(state[1][id]);
                        } else {
                            document.getElementById(id).value = state[2][id];
                        }

                    }
                } catch (e) { }

                setCanvasCenter(json);
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
        <div className={styles.editorHeader}>
            {/* 새프로젝트 */}
            <FolderOpenOutlinedIcon onClick={clearCanvas} className="new-project" children={"새 프로젝트"} />

            {/* 이미지 저장 */}
            <FileImageOutlinedIcon className="new-project" onClick={downloadImage} children={"이미지 저장"} />

            {/* 프로젝트 다운로드 */}
            <DownloadOutlinedIcon className="serialization" onClick={serialization} children={"프로젝트 다운로드"} />

            {/* 프로젝트 업로드 */}
            <label htmlFor="Deserialization-json-file">
                <input type="file" id="Deserialization-json-file" name="chooseFile" accept="application/JSON"
                    onClick={Deserialization} />
                <UploadOutlinedIcon name="chooseFile" accept="application/JSON" onClick={Deserialization} children={"프로젝트 업로드"} />
            </label>

            {/* 이미지 가져오기 */}
            <label htmlFor="import-image-file">
                <input type="file" id="import-image-file" name="chooseFile" accept="image/*"
                    onClick={importImage} />
                <CloudDownloadOutlinedIcon onClick={importImage} children={"이미지 가져오기"} />
            </label>

            {/* 이전 */}
            <UndoOutlinedIcon id='undo' onClick={undo} children={"이전"} />
            {/* 되돌리기 */}
            <RedoOutlinedIcon id='redo' onClick={redo} children={"되돌리기"} />
        </div>
    )
}
