import FigureSubmenu from './FigureSubmenu';
import ImageSubmenu from './ImageSubmenu';
import LineSubmenu from './LineSubmenu';
import TextBoxSubmenu from './TextBoxSubmenu';
import FilterSubmenu from './FilterSubmenu';
import CropSubmenu from './CropSubmenu';
import styles from "./LeftSidebarSubmenu.module.css"
import * as common from './common'
import { useEffect } from 'react';
export default function Submenu({menu,canvas,setMenu}) {    
    useEffect(()=>{

        canvas.on('object:added',()=>{console.log(menu)})

    },[])
    const figure = ['rect','triangle','circle','image'];
    function changeMenu(type){
        if(figure.includes(type)) setMenu('object-menu')
        if(type==='textbox') setMenu('text-menu');
        if(type==='line'|| type==='path') setMenu('drawing-menu')
        console.log(menu)
    }

    function inputFigureInfo(object) { // figure-width, figure-height id를 갖는 input 영역에 도형의 크기 정보 입력  
        if (!object) {
            document.getElementById('figure-width').value = '';
            document.getElementById('figure-height').value = '';
        }
        else {
            document.getElementById('figure-width').value = Math.round(object.width);
            document.getElementById('figure-height').value = Math.round(object.height);
            document.getElementById('color').value = object.fill;
        }
    }
    
    useEffect(()=>{
    canvas.on({
    //     'mouse:wheel': (opt) => {
    //         var delta = opt.e.deltaY;
    //        if(delta<0){
    //            common.zoom(canvas,1.1);
    //            let num=Number(zoomInfo.current.value.slice(0,-1));
    //            zoomInfo.current.value=(num*1.1).toFixed(0).toString() + "%";
    //        }else{
    //            common.zoom(canvas,0.9);
    //            let num=Number(zoomInfo.current.value.slice(0,-1));
    //            zoomInfo.current.value=(num*0.9).toFixed(0).toString() + "%";
    //        }
    //        common.setCanvasCenter(canvas);
    //    },
       'selection:updated':(e)=>{
           console.log('updated')
           changeMenu(e.selected[0].type);
           console.log(e.selected[0])
            if(menu==='object-menu') {
                inputFigureInfo(e.selected[0]);
            }
       },
       'object:removed': () => {
           console.log('object:removed');
       },
       'selection:cleared': () => {
           console.log('selection:cleared');
           if(menu==='object-menu'){console.log("오브젝")}
           
       },
       'selection:created': (e) => {
           if(e.selected.length===1){
               var type =e.selected[0].type;
               console.log(type)
               changeMenu(type);
           }
           console.log('selection:created');
       },
       'object:added': (e) => {
        //    canvas.setActiveObject(e.target);
        //    console.log('object:added');
        //    var objects = canvas.getObjects();
        //    var object = objects[objects.length-1];
        //    if(object.type!=='path'&& object.type!=='selection' && object.type!=='group' && object.cropRect!==true)
        //    {   
        //        canvas.setActiveObject(object);
        //        // console.log(object.toDataURL());
        //        // console.log(common.addLayer(canvas,object));
               // addLayerItem(canvas,object.toDataURL());
        //    }

           // if(object.main) canvas.discardActiveObject(object);
           // document.getElementById('remove-object').disabled = false;

       },
       'object:modified': () => {
           console.log('object:modified');
        //    var objects  = canvas.getActiveObjects();
        //   if (!canvas.getActiveObject().cropRect) {//crop을 위해 생성된 사각형은 modified되어도 undo stack에 쌓이면 안됨
        //    common.updateStates(canvas);
        //    // objects.forEach((object)=>{
        //    //     common.modifyLayer(object);
        //    // })
        //   }
           // document.getElementById('remove-object').disabled = false
       },
      
    })
    },[])

    return (
        <div className={menu===''? null: styles.Submenu} >    {/* 메뉴가 열려있지 않으면 style 적용 x */}
            {menu ==='object-menu' && <FigureSubmenu canvas={canvas} />}
            {menu === 'drawing-menu' && <LineSubmenu canvas={canvas}/>}
            {menu === 'text-menu' && <TextBoxSubmenu canvas={canvas} />}
            {menu === 'filter-menu' && <FilterSubmenu canvas={canvas} />}
            {menu === 'crop-menu' && <CropSubmenu canvas={canvas}/>} 
        </div>
    );
}