import { fabric } from "fabric";
import {
    FolderOpenOutlinedIcon, CloudDownloadOutlinedIcon, UploadOutlinedIcon,
    FileImageOutlinedIcon, RedoOutlinedIcon, UndoOutlinedIcon, DownloadOutlinedIcon,
    DiffOutlinedIcon,CopyOutlinedIcon

} from "./icons/icons"
import { useEffect } from "react";
import styles from "./Header.module.css"
import backgroundImage from '../img/background.png'


import * as common from  './submenu/common'
// import { CommentOutlined } from "@ant-design/icons";
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
    const canvas = props.canvas;
   
    useEffect(() => {
        document.onkeydown = function (e) { 
            if (e.ctrlKey && e.shiftKey && e.key==='Z') {  
                redo();  
            }else if (e.ctrlKey && e.key === 'z') { 
                undo();
            }else if (e.ctrlKey && e.key==='c'){
                copy();
            }else if (e.ctrlKey && e.key ==='v'){
                paste();
            }
        }
       
    },[]);


    function importImage(e) {
        e.target.value = '' //같은 이름의 이미지 파일 업로드가 안되는 것 방지 
        var innerWidth = common.getInnerSize(canvas)['innerWidth'];
        var innerHeight = common.getInnerSize(canvas)['innerHeight'];

        document.getElementById('import-image-file').onchange = function (e) {
            // common.initalCanvas(canvas);
            var file = e.target.files[0];
            var reader = new FileReader();
            
            reader.onload = function (f) {
                props.setImage(!props.image);
                props.imageRef.current = true;
                var data = f.target.result;
                fabric.Image.fromURL(data, function (img) {
                    canvas.setWidth(img.width);
                    canvas.setHeight(img.height);
                    img.main=true;
                    img.selectable=false;
                    // // img.evented =false;
                    // img.hasBorders=false;
                    // img.hasControls=false;
                    canvas.add(img)        
                    canvas.discardActiveObject(img);
                    canvas.renderAll();
                    // canvas.setBackgroundImage(backgroundImage); 
                    canvas.initialWidth = img.width;
                    canvas.initialHeight= img.height

                    if(img.width>innerWidth || img.height>innerHeight) common.fitToProportion(canvas)

                    common.setCanvasCenter(canvas);
                    common.updateStates(canvas);
                    canvas.renderAll();

                });
            };
            reader.readAsDataURL(file);
        };
    }

    //새 프로젝트 
    function clearCanvas() { //캔버스 초기화 
        common.removeAllObjects(canvas,true);
        common.initalCanvas(canvas);
        common.updateStates(canvas);
        common.setCanvasCenter(canvas);
        canvas.renderAll();

    }

    //이미지 다운로드
    function downloadImage() {
        if(canvas.backgroundImage.default)
        canvas.clone((clonedCanvas) => {
            clonedCanvas.setBackgroundImage(null, () => {
                var image = clonedCanvas.toDataURL();  //canvas 그림을 문자열 형태로 
                var link = document.createElement('a'); //<a> 생성
                link.href = image;
                link.download = "image.png";
                link.click();
            })
        });
        else{
            var image = canvas.toDataURL();  //canvas 그림을 문자열 형태로 
            var link = document.createElement('a'); //<a> 생성
            link.href = image;
            link.download = "image.png";
            link.click();
        }
    }
    // 직렬화 
    function serialization() {
        var json = canvas.toDatalessJSON(['initialWidth', 'initialHeight', 'objectNum', 'id','mods','filterValues']);
        // states는 순환 참조가 발생하므로 보낼 수 없음 
        json = JSON.stringify(json);


        var blob = new Blob([json], { type: "text/plain;charset=utf-8" });
        var link = document.createElement('a'); //<a> 생성

        link.href = URL.createObjectURL(blob);
        link.download = "image.json";
        link.click();

    }

    // 역직렬화
    function Deserialization(e) {
        e.target.value = '' //같은 이름의 이미지 파일 업로드가 안되는 것 방지 
        document.getElementById("Deserialization-json-file").onchange = function (e) {
            var reader = new FileReader();
            reader.onload = function (e) { //onload(): 읽기 성공 시 실행되는 핸들러
                canvas.loadFromJSON(reader.result, () => {
                    common.initalCanvas(canvas,true);
                    canvas.setWidth(canvas.initialWidth);
                    canvas.setHeight(canvas.initialHeight);
                    common.setCanvasCenter(canvas);
                    common.updateStates(canvas);
                    var Objects = canvas.getObjects();
                    Objects.forEach((object)=>{
                        common.addLayer(canvas,object);
                    })
                    common.colorActiveLayer(canvas);
                    canvas.renderAll();
                });
            }
            reader.readAsText(e.target.files[0]); // dataURL 형식으로 파일 읽음
        }
    }

    function undo(){
        if(canvas.undoStack.length>1){
            console.log('맞냐')
            common.removeAllObjects(canvas);
            var current = canvas.undoStack.pop();
            canvas.redoStack.push(current);

            var json = canvas.undoStack[canvas.undoStack.length-1]; 
            var objects  = json['objects'];
            objects.forEach((object)=>{
                if(!object.main){
                canvas.add(object)
                }
            })

            var filters = json['filters'];
            var mainImage = json['image'];
            mainImage.applyFilters(filters);
            canvas.renderAll();

            common.setCanvasCenter(canvas);
            if(json['recentStyleSize']){
                common.removeAllObjects(canvas,true);
                canvas.setWidth(json['initialWidth']);
                canvas.setHeight(json['initialHeight']);
                canvas.add(json['recentStyleSize']['mainImage']);
                canvas.discardActiveObject(mainImage);
                common.setCanvasStyleSize(json['recentStyleSize']['width'],json['recentStyleSize']['height']);
                common.setCanvasCenter(canvas);
 
                }
            // canvas.loadFromJSON(json, () => {
            //     if(canvas.recentStyleSize){
            //     canvas.setWidth(canvas.initialWidth);
            //     canvas.setHeight(canvas.initialHeight);
            //     common.setCanvasStyleSize(canvas.recentStyleSize[0],canvas.recentStyleSize[1])
            //     }
            //     common.setCanvasCenter(canvas);
            //     canvas.renderAll();
            //     // if (canvas.backgroundImage) {
            //     //     canvas.backgroundImage.scaleX =  canvas.initialWidth / canvas.backgroundImage.width
            //     //     canvas.backgroundImage.scaleY = canvas.initialHeight / canvas.backgroundImage.height
            //     // }
                try { // 이전 state의 filter value들 값 할당 
                    var state = json['filterRangeState'];
                    var inputNodes = document.getElementById('filter-list').getElementsByTagName('input');
                    if(!state){
                        for (var i = 0; i < inputNodes.length; i++) {
                            inputNodes[i].checked = false;
                            inputNodes[i].value = inputNodes[i].defaultValue;
                        }

                    }
                    for (var j = 0; j < inputNodes.length; j++) {
                       
                        var id = inputNodes[j].id;
                        if (inputNodes[j].type === 'checkbox') {
                            document.getElementById(id).checked = state[0][id];
                        } else if (inputNodes[j].type === 'range') {
                           
                            document.getElementById(id).value = Number(state[1][id]);
                        } else {
                            document.getElementById(id).value = state[2][id];
                        }

                    }
                } catch (e) { 
                }


            //     var objects = canvas.getObjects();
            //     if(objects.length!==0){
            //     objects.forEach((object) => {
            //         if(object.type!=='path' && object.type!=='group' &&object.type!=='selection')
            //         common.addLayer(canvas,object);
            //     });
            //     common.colorActiveLayer(canvas);
            // }                  canvas.renderAll();    

            //  });
        }
    }

    function redo(){
        if(canvas.redoStack.length>0){
            common.removeAllObjects(canvas);
            var json = canvas.redoStack.pop();
            canvas.undoStack.push(json);

            var objects = json['objects'];
            var filters = json['filters']
            objects.forEach((object)=>{
                if(!object.main)
                canvas.add(object)
            })
            common.getMainImage(canvas).applyFilters(filters);
            canvas.renderAll();
            if(json['isCropped']){
                        common.removeAllObjects(canvas,true);
                        canvas.setWidth(json['initialWidth']);
                        canvas.setHeight(json['initialHeight']);
                        canvas.add(json['image']);
                        // canvas.discardActiveObject(json['image']);
                        common.setCanvasCenter(canvas);
                        canvas.renderAll();
                        }

                try {
                    var state = json['filterRangeState'];
                    var inputNodes = document.getElementById('filter-list').getElementsByTagName('input');
                    if(!state){
                        for (var i = 0; i < inputNodes.length; i++) {
                            inputNodes[i].checked = false;
                            inputNodes[i].value = inputNodes[i].defaultValue;
                        }
                    }
                    for (var j = 0; j < inputNodes.length; j++) {
                        var id = inputNodes[j].id;
                        if (inputNodes[j].type === 'checkbox') {
                            document.getElementById(id).checked = state[0][id];
                        } else if (inputNodes[j].type === 'range') {
                            document.getElementById(id).value = Number(state[1][id]);
                        } else {
                            document.getElementById(id).value = state[2][id];
                        }

                    }
                } catch (e) { }
            }        
    }

    var _clipboard;
    function copy() {
        if(canvas.getActiveObject())
        canvas.getActiveObject().clone(function(cloned) {
            _clipboard = cloned;
        });
    }
    
    function paste() {
        if(_clipboard)
        _clipboard.clone(function(clonedObj) {
            clonedObj.set({
                left: clonedObj.left + 10,
                top: clonedObj.top + 10,
                evented: true,
            });
            if (clonedObj.type === 'activeSelection') {
                clonedObj.canvas = canvas;
                clonedObj.destroy()

                clonedObj.forEachObject(function(obj) {
                    
                    obj.set({
                        id: ++canvas.objectNum,
                    })

                    canvas.add(obj);
                    canvas.setActiveObject(obj);
                    common.addLayer(canvas,obj);
                    common.colorActiveLayer(canvas);
                    common.updateStates(canvas);
                });
                canvas.renderAll();
                // this should solve the unselectability
                clonedObj.setCoords();
            } else {
                clonedObj.set({ id:++canvas.objectNum,
            })
                canvas.add(clonedObj);
                canvas.setActiveObject(clonedObj);
                common.addLayer(canvas,clonedObj);
                common.colorActiveLayer(canvas);
                common.updateStates(canvas);
                canvas.requestRenderAll();
            }

            _clipboard.top += 10;
            _clipboard.left += 10;
           
            // canvas.setActiveObject(clonedObj);
        });
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
            
            <UploadOutlinedIcon htmlFor="Deserialization-json-file" onClick={Deserialization} children={"프로젝트 업로드"}/>
            <input type="file" id="Deserialization-json-file" name="chooseFile" accept="application/JSON"
                    onClick={Deserialization} />

            {/* 이미지 가져오기 */}
            <CloudDownloadOutlinedIcon htmlFor="import-image-file" children={"이미지 가져오기"} />
            <input type="file" id="import-image-file" name="chooseFile" accept="image/*"
                    onClick={importImage} />
                    
            <CopyOutlinedIcon id='copy' onClick={copy} children={"복사"}/>
            <DiffOutlinedIcon id='paste' onClick={paste} children={"붙여넣기"}/>
            {/* 이전 */}
            <UndoOutlinedIcon id='undo' onClick={undo} children={"이전"} />
            {/* 되돌리기 */}
            <RedoOutlinedIcon id='redo' onClick={redo} children={"되돌리기"} />
        </div>
    )
}