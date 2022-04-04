import { fabric } from "fabric";
import '../../editor.css';

export default function ImageSubmenu(props) {
    const canvas = props.canvasRef.current;
    const stateRef = props.stateRef;
    const objectNumRef = props.objectNumRef;
    function updateModifications(savehistory) {
        if (savehistory === true) {
            var  myjson = canvas.toJSON();
            stateRef.current.push(myjson);
        }
        
    }

    function addLayer(object) {  //레이어에 객체 추가 
        const div = document.createElement('div');
        div.id = objectNumRef.current;
        div.style.border = ' solid #0000FF';
        div.style.width = '130px';
        const el = document.getElementById('layer');
        
        const objectBtn = document.createElement('button');
        objectBtn.innerHTML = object.type;
        objectBtn.className = "layer-object";
        objectBtn.onclick = () => {
            canvas.setActiveObject(object);
            canvas.renderAll();
        }
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => {
            canvas.remove(object);
            document.getElementById(object.id).remove();
            updateModifications(true);
        }


        div.appendChild(objectBtn);
        div.appendChild(deleteBtn);
        el.insertBefore(div, el.firstChild);  //스택처럼 쌓이게 
    }

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
                        id : `${++objectNumRef.current}`,
                        left: Math.floor(Math.random() * 101),
                        top: Math.floor(Math.random() * 101),
                    });

                    canvas.add(img).setActiveObject(img);
                    updateModifications(true);
                    addLayer(img);
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