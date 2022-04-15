import { fabric } from "fabric";
import OnlineImage from "./OnlineImage";
import * as common from './common'
import {ImageIcon,ImageFromInternetIcon}from "../icons/icons";
import styles from "./LeftSidebarOpened.module.css"
import { useState } from "react";


export default function ImageSubmenu(props) {
    const canvas = props.canvas;
    const [onlineImageOption,setOnlineImageOption] = useState(false);

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

                    canvas.renderAll();

                }
            }
            reader.readAsDataURL(e.target.files[0]); // dataURL 형식으로 파일 읽음
        }
    }

    function addOnlineImage() {
        setOnlineImageOption(!onlineImageOption)
    }
    return (
        <>
         <p><ImageIcon htmlFor={"add-local-image-file"} children={"from file"}/>
            <input type="file" id="add-local-image-file" name="chooseFile" accept="image/*" onClick={addLocalImage} style={{display:'none'}}/>
         <ImageFromInternetIcon htmlFor={"put htmlFor"} children={"from internet"} onClick={addOnlineImage}/>
         </p>
      
        {onlineImageOption&& <OnlineImage  canvas={canvas}/>}
           
        </>
    )
}