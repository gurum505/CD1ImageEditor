import { fabric } from "fabric";
import '../../editor.css';
import OnlineImage from "./OnlineImage";
import * as common from './common'

export default function ImageSubmenu(props) {
    const canvas = props.canvas;

    function addLocalImage(e) {
        e.target.value = ''
        canvas.isDrawingMode = false;
        document.getElementById("add-local-image-file").onchange = function (e) {
            var reader = new FileReader();
            reader.onload = function (e) { //onload(): 읽기 성공 시 실행되는 핸들러
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    var img = new fabric.Image(image);
                    img.set({
                        id : ++canvas.objectNum,
                        left: Math.floor(Math.random() * 101),
                        top: Math.floor(Math.random() * 101),
                    });

                    if (img.width > canvas.width || img.height > canvas.height) {
                        img.scaleToWidth(canvas.width / 2);
                        img.scaleToHeight(canvas.height / 2);
                    }

                   
                    canvas.add(img).setActiveObject(img);
                    common.updateStates(canvas);
                    common.addLayer(canvas,img);
                    
                    var objects = canvas.getActiveObjects();
                    objects.forEach((object) => {
                        if (document.getElementById(object.id))
                            document.getElementById(object.id).style.border = 'solid red'
                    })

                    canvas.renderAll();

                }
            }
            reader.readAsDataURL(e.target.files[0]); // dataURL 형식으로 파일 읽음
        }
    }

    function addOnlineImage() {
        console.log("미구현");
    }
    return (
        <>
        <OnlineImage />
            <button id="add-image">
                <label htmlFor="add-local-image-file">
                    로컬 이미지 추가
                </label>
            </button>
            <input type="file" id="add-local-image-file" name="chooseFile" accept="image/*" onClick={addLocalImage} />

            <button  onClick={addOnlineImage}>
                온라인에서 가져오기
            </button>
        </>
    )
}