import styles from "./LeftSidebar.module.css";


import FigureSubmenu from "../component/submenu/FigureSubmenu";
import TextBoxSubmenu from "../component/submenu/TextBoxSubmenu";
import FilterSubmenu from "../component/submenu/FilterSubmenu";
import LineSubmenu from "../component/submenu/LineSubmenu";
import CropSubmenu from "../component/submenu/CropSubmenu";

import {
  FontSizeOutlinedIcon, MenuOutlinedIcon, AppstoreOutlinedIcon
  , AreaChartOutlinedIcon, LineOutlinedIcon, ScissorOutlinedIcon
} from "../component/icons/icons";

import { useEffect, useRef, useState } from "react";
import * as common from "../component/submenu/common"
import { ConsoleSqlOutlined } from "@ant-design/icons";
const LeftSidebar = ({ canvas, imageRef, image,addLayerItem}) => {

  
  const addObjectRef = useRef(false);  
  const figure = ['rect', 'triangle', 'circle', 'image'];


  useEffect(() => {

    canvas.on({
      'selection:cleared':(e)=>{
        console.log(e)
        if (e.deselected)
        e.deselected.forEach((object)=>{if (!object.cropRect)common.modifyLayer(object)});
      },
      'object:added': (e) => {
        // canvas.setActiveObject(e.target)
        // if(e.target.type==='path') canvas.discardActiveObject();
      },
      'object:modified':(e)=>{
        if(e.target._objects){
          console.log('그룹 선택')
          var group= e.target;
          group.forEachObject((object)=>{
            object.canvasRelativePosition = {'left':group.left+object.left+group.width/2, 'top': group.top+object.top+group.height/2};
            common.modifyLayer(object)
          })
        }else{
          common.modifyLayer(e.target)
          
        }
        
          if(!e.target.cropRect) common.updateStates(canvas);
      },
      // 'selection:updated': (e) => {
      //   console.log('update')
      //   setMenu(common.getMenuType(e.selected[0]), true)
      //   console.log("나다")
      //   common.inputObjectInfo(e.selected[0])
      // },
      'selection:created': (e) => {
        if(e.selected.length!==1) return ; // 여러 객체 선택 시 menu 전환 안되게  

        if(e.selected[0].cropRect || e.selected[0].main ) return ;
        setMenu(common.getMenuType(e.selected[0]), true)
        common.inputObjectInfo(e.selected[0])
      },
      'object:scaling': (e) => {
        common.inputObjectInfo(e.target)
      },
    })
  }, [])

  
  function setMenu(type,canvasEvent=false) {
    if(type ==='') return;
    if(!canvasEvent){
      common.mouseEventOff(canvas);
      canvas.isDrawingMode = false; 
    }
    canvas.defaultCursor = 'default';
  
    var display = document.getElementById(type).style.display;

    if (display === 'block' && !canvasEvent) {
      document.getElementById(type).style.display = '';
      canvas.componentSize['leftbar'] = 48;
    }
    else {
      var nodes = document.getElementById('submenu').childNodes;
      nodes.forEach(node => node.style.display = '');
      document.getElementById(type).style.display = 'block'
      canvas.componentSize['leftbar'] = 248;

      if(common.getCanvasStyleWidth()> common.getInnerSize(canvas)['innerWidth']) common.fitToProportion(canvas);
    }
    common.setCanvasCenter(canvas);
  }
  return (
  
      <div id='leftbar' className={styles.container}>

        <div style={{ display: "flex", flexDirection: "column", outline: "none" }} >
          <AppstoreOutlinedIcon onClick={()=>setMenu('figure-menu')} />
          <FontSizeOutlinedIcon onClick={()=>setMenu('text-menu')} />
          <LineOutlinedIcon onClick={()=>setMenu('line-menu')} />
          <AreaChartOutlinedIcon onClick={()=>setMenu('filter-menu')} />
          <ScissorOutlinedIcon onClick={()=>setMenu('crop-menu')} />
        </div>

      <div id='submenu' className ={styles.SubmenuWrap}>   
        <FigureSubmenu canvas={canvas} addLayerItem={addLayerItem} />
        <TextBoxSubmenu canvas={canvas}  addLayerItem={addLayerItem}/>
        <LineSubmenu canvas={canvas}  addLayerItem={addLayerItem}/>
        <FilterSubmenu canvas={canvas} />
        <CropSubmenu canvas={canvas} />
      </div>

      </div>
  );
};


export default LeftSidebar;