import { fabric } from "fabric";
import '../../editor.css';

export default function ImageSubMenu(props) {
    const canvas = props.canvas;

    function addLocalImage() {
        canvas.isDrawingMode = false;
        document.getElementById("add-local-image-file").onchange = function (e) {
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

                    canvas.add(img).setActiveObject(img);

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
            <button id="add-image">
                <label htmlFor="add-local-image-file">
                    로컬 이미지 추가
                </label>
            </button>
            <input type="file" id="add-local-image-file" name="chooseFile" accept="image/*" onClick={addLocalImage} />

            <button disabled onClick={addOnlineImage}>
                온라인에서 가져오기
            </button>
        </>
    )
}