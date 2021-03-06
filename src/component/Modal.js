import React from 'react';
import styles from './Modal.module.css';
import { fabric } from "fabric";
import  * as common from './submenu/common'
import { computeHeadingLevel } from '@testing-library/react';
import {
  TriangleIcon, CircleIcon, ImageIcon, ImageFromInternetIcon
  , RectangleIcon, FontSizeOutlinedIcon
} from "./icons/icons";
import { FontSizeOutlined } from "@ant-design/icons"

const Modal = (props) => {
  const canvas = props.canvas;
  const { isModalOpen, closeModal } = props;

  function addRect() {
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      noScaleCache: true,
      angle: 0,
      fill: 'white',
      type: 'rect',
      id: ++canvas.objectNum,
    });
    canvas.add(rect);
    canvas.centerObject(rect)
    props.addLayerItem(canvas, rect.toDataURL())
    canvas.setActiveObject(rect)
    common.addLayer(canvas,rect);
    closeModal();
  }

  function addCircle() {
    const circle = new fabric.Circle({
      width: 100,
      height: 100,
      radius: 50,
      noScaleCache: true,
      angle: 0,
      fill: 'white',
      type: 'circle',
      id: ++canvas.objectNum,
    });
    canvas.add(circle);
    canvas.centerObject(circle)
    props.addLayerItem(canvas, circle.toDataURL())
    canvas.setActiveObject(circle)
    common.addLayer(canvas,circle);
    closeModal();
  }

  function addTriangle() {
    const triangle = new fabric.Triangle({
      width: 100,
      height: 100,
      noScaleCache: true,
      angle: 0,
      fill: 'white',
      type: 'triangle',
      id: ++canvas.objectNum,
    });
    canvas.add(triangle);
    canvas.centerObject(triangle)
    canvas.setActiveObject(triangle)
    common.addLayer(canvas,triangle)
    // props.addLayerItem(canvas, triangle)
    closeModal();
  }

  function addTextBox() {
    var textbox = new fabric.Textbox('내용 입력', {
      width: 250,
      id: ++canvas.objectNum,
      fill: 'white',
      type: 'textbox'
    });
    canvas.add(textbox);
    canvas.centerObject(textbox)
    props.addLayerItem(canvas, textbox.toDataURL())
    canvas.setActiveObject(textbox)
    // props.addLayerItem(canvas, textbox);
    common.addLayer(canvas,textbox)
    closeModal();
  }

  function addLocalImage(e) {
    e.target.value = ''
    canvas.isDrawingMode = false;
    
    document.getElementById("add-local-image").onchange = function (e) {
        var reader = new FileReader();
        reader.onload = function (e) { //onload(): 읽기 성공 시 실행되는 핸들러
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                var img = new fabric.Image(image);
                img.set({
                    id: ++canvas.objectNum,

                });

                if (img.width > canvas.width || img.height > canvas.height) {
                    var ratio = img.height/img.width;
                    img.scaleToWidth(canvas.width / 2);
                    img.scaleToHeight(canvas.width / 2 * ratio);
                }


                canvas.add(img).setActiveObject(img);
                common.updateStates(canvas);
                canvas.setActiveObject(img);
                common.addLayer(canvas,img)
                closeModal()
              }
            }
            reader.readAsDataURL(e.target.files[0]); // dataURL 형식으로 파일 읽음
          }
}



  return (
    <>
      {isModalOpen ? (
        <div className={styles.modal}>
          <div className={styles.section}>
            <button className={styles.button} onClick={closeModal}>
              x
            </button>
            <div className={styles.main}>
              <div>
                <RectangleIcon onClick={addRect} />
                <CircleIcon onClick={addCircle} />
                <TriangleIcon onClick={addTriangle} />
              </div>
              <div>
                <ImageIcon htmlFor={"add-local-image"} />
                <input type="file" id="add-local-image" name="chooseFile" accept="image/*" onClick={addLocalImage} style={{ display: 'none' }} />
                <span className={styles.textIcon}>
                  <FontSizeOutlinedIcon  onClick={addTextBox}/>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Modal;