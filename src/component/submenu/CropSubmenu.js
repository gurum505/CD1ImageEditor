import { fabric } from "fabric";
import * as common from './common'
import backgroundImage from '../../img/background.png'
import {
    BorderOutlinedIcon,FormOutlinedIcon
} from "../icons/icons";
// import styles from "./LeftSidebarSubmenu.module.css"
import styles from "../../Layout/LeftSidebar.module.css"

import { useEffect } from "react";

export default function CropSubmenu({canvas,menu,setMenu}) {
    useEffect(()=>{
        canvas.isDrawingMode = false;
        canvas.off();
    },[menu])
    var currentImage;
    var selectionRect;
    // console.log('crop')
    // var left1 = 0;
    // var top1 = 0;
    // var scale1x = 0;
    // var scale1y = 0;
    // var width1 = 0;
    // var height1 = 0;

    //crop 상자가 범위를 초과하지 않게 
    // canvas.on('object:scaling', function (e) {
    //     var obj = e.target;
    //     obj.setCoords();
    //     var brNew = obj.getBoundingRect();

    //     if (((brNew.width + brNew.left) >= obj.canvas.width) || ((brNew.height + brNew.top) >= obj.canvas.height) || ((brNew.left < 0) || (brNew.top < 0))) {
    //         obj.left = left1;
    //         obj.top = top1;
    //         obj.scaleX = scale1x;
    //         obj.scaleY = scale1y;
    //         obj.width = width1;
    //         obj.height = height1;
    //     }
    //     else {
    //         left1 = obj.left;
    //         top1 = obj.top;
    //         scale1x = obj.scaleX;
    //         scale1y = obj.scaleY;
    //         width1 = obj.width;
    //         height1 = obj.height;
    //     }
    // });

    // canvas.on('object:moving', function (e) {
    //     console.log("ㅎㅇㅋ")
    //     var obj = e.target;
    //     // if object is too big ignore
    //     if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
    //         return;
    //     }
    //     obj.setCoords();
    //     // top-left  corner
    //     if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
    //         obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
    //         obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
    //     }
    //     // bot-right corner
    //     if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
    //         obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
    //         obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
    //     }
    // });

    function getCanvasStyleWidth(){
        var upperCanvas = document.getElementsByClassName('upper-canvas')[0];
        return upperCanvas.style.width.substr(0,upperCanvas.style.width.length-2);
    }
    function getCanvasStyleHeight(){
        var upperCanvas = document.getElementsByClassName('upper-canvas')[0];
        return upperCanvas.style.height.substr(0,upperCanvas.style.height.length-2);
    }
    function addSelectionRect(ratio = '') {
        cancle();

        canvas.discardActiveObject();
        if(selectionRect) canvas.remove(selectionRect);
        var ratio;
        if (ratio === '3:2') ratio = 3 / 2
        else if (ratio === '4:3') ratio = 4 / 3
        else if (ratio === '16:9') ratio = 16 / 9
        else if (ratio === '1:1') ratio = 1 / 1
        selectionRect = new fabric.Rect({
            fill: 'rgba(0,0,0,0.3)',
            originX: 'left',
            originY: 'top',
            stroke: 'black',
            opacity: 1,
            width: canvas.height * ratio,
            height: canvas.height - 3,
            hasRotatingPoint: true,
            cornerColor: 'white',
            cornerStrokeColor: 'black',
            borderColor: 'black',
            cornerSize: 12,
            padding: 0,
            cornerStyle: 'circle',
            borderDashArray: [5, 5],
            borderScaleFactor: 1.3,
            cropRect: true
        });
        // selectionRect.set({ 'width': width, 'height': height });
        canvas.add(selectionRect);
        canvas.centerObject(selectionRect);
    }

    function crop(ratio) {
        canvas.discardActiveObject();
        if (canvas.getActiveObject() === selectionRect) canvas.remove(selectionRect);
        addSelectionRect(ratio);
        canvas.setActiveObject(selectionRect);
        
    }

    function apply() {
        var mainImage = common.getMainImage(canvas);
        console.log(selectionRect)
        canvas.remove(selectionRect)
        
        canvas.undoStack[canvas.undoStack.length-1].recentStyleSize = {'width': common.getCanvasStyleWidth(), 'height':common.getCanvasStyleHeight(),'mainImage':mainImage}
        canvas.setBackgroundImage(null);

        fabric.Image.fromURL(canvas.toDataURL(), img => {
            currentImage = img; //현재 캔버스를 currentIamge 로 저장
            currentImage.set({
                cropX: selectionRect.left,
                cropY: selectionRect.top,
                width: selectionRect.getScaledWidth(),
                height: selectionRect.getScaledHeight(),
                main:true,
                selectable:false,
                
            });

            common.removeAllObjects(canvas,true);

            canvas.setDimensions({ //캔버스 크기 조절
                width: selectionRect.getScaledWidth(),
                height: selectionRect.getScaledHeight()
            });

            canvas.initialWidth = currentImage.width;
            canvas.initialHeight = currentImage.height;
            canvas.add(currentImage);
            canvas.discardActiveObject(currentImage);
            common.updateStates(canvas,true);
            common.setCanvasCenter(canvas);
        });

        fabric.Image.fromURL(backgroundImage,(img)=>{
            img.default = true;
            canvas.setBackgroundImage(img,canvas.renderAll.bind(canvas),{
            });
            canvas.renderAll();
        })

        
    }


    function cropCustom() {
        cancle();
        canvas.discardActiveObject();
        if(selectionRect) canvas.remove(selectionRect)
        // canvas.selection = false; 
        var objects = canvas.getObjects();

        canvas.defaultCursor = 'crosshair';
        if (canvas.getActiveObject() === selectionRect) canvas.remove(selectionRect);
        var cropBtn = document.querySelectorAll('.crop-button');
 

        var isDown, origX, origY;

        canvas.on('mouse:down:before',()=>{
            objects.forEach((object) => {     //드래그 하면 기존의 객체까지 group select가 되어서 제대로 된 left, top 을 얻을 수 없음
                object.set({'selectable':false})
            })
        })
        canvas.on('mouse:down', function (o) {
          
            isDown = true;
            var pointer = canvas.getPointer(o.e);
            origX = pointer.x; //클릭시 마우스 x좌표
            origY = pointer.y; //클릭시 마우스 y좌표 
            selectionRect = new fabric.Rect({
                fill: 'rgb(0,0,0,0)',
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                stroke: '#ccc',
                strokeDashArray: [2, 2],
                opacity: 1,
                width: 1,
                height: 1,
                hasRotatingPoint: false,
                transparentCorners: false,
                cornerColor: 'white',
                cornerStrokeColor: 'black',
                borderColor: 'black',
                cornerSize: 12,
                padding: 0,
                cornerStyle: 'circle',
                borderDashArray: [5, 5],
                borderScaleFactor: 1.3,
                cropRect: true,
            });
            canvas.add(selectionRect);
            console.log(selectionRect)


        });

        canvas.on('mouse:move', function (o) {

            if (!isDown) return;
            var pointer = canvas.getPointer(o.e);
            if (pointer.x > canvas.width || pointer.x < 0) {
            }
            if (origX > pointer.x && pointer.x > 0) {
                selectionRect.set({ left: Math.abs(pointer.x) });
            }
            if (origY > pointer.y && pointer.y > 0) {
                selectionRect.set({ top: Math.abs(pointer.y) });
            }
            if (!(pointer.x > canvas.width || pointer.x < 0))
                selectionRect.set({ width: Math.abs(origX - pointer.x) });

            if (!(pointer.y > canvas.height || pointer.y < 0))
                selectionRect.set({ height: Math.abs(origY - pointer.y) });
            canvas.renderAll();
        });

        canvas.on('mouse:up', function (o) {

            canvas.selection=true;
            objects.forEach((object) => {     //드래그 하면 기존의 객체까지 group select가 되어서 제대로 된 left, top 을 얻을 수 없음
                if(!object.main)
                object.set('selectable', true);
            })
            isDown = false;
            // canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.defaultCursor = 'default';
            canvas.off('mouse:down');
            canvas.off('mouse:move');
            canvas.off('mouse:up');
   
            canvas.defaultCursor = 'default';
            canvas.on('mouse:down:before',()=>{
                objects.forEach((object) => {     //드래그 하면 기존의 객체까지 group select가 되어서 제대로 된 left, top 을 얻을 수 없음
                    if(!object.main)
                    object.set({'selectable':true})
                })
            })
        });


    }

    function cancle() {
        if (canvas.getActiveObject() === selectionRect) canvas.remove(selectionRect);

    }



    return (
        <div id='crop-menu' className={styles.Submenu}>
            <div className={styles.Title}>Cut</div>
        <p>
            <FormOutlinedIcon onClick={cropCustom} children={"custom cut"}/>
            <BorderOutlinedIcon onClick={() => crop('1:1')} children={"1:1"}/>
        </p>
        <p>
            <button className="crop-button" onClick={()=>crop('3:2')}>3:2</button>
            <button className="crop-button" onClick={() => crop('4:3')}>4:3</button>
            <button className="crop-button" onClick={() => crop('16:9')}>16:9</button>
        </p>
            <hr></hr>
            <p id = "crop-bottom">
                <button onClick={apply}>apply</button>
                <button onClick={cancle}>cancel</button>
            </p>
            </div>
    )
}