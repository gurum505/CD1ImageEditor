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
const LeftSidebar = ({ canvas, imageRef, image }) => {

  const recentSize = useRef('');
  const [menu, setMenu] = useState('');
  const menuRef = useRef('');
  const [isOpened,setIsOpened] =useState(false);

  const figure = ['rect', 'triangle', 'circle', 'image'];


  useEffect(() => {
    window.onkeydown=(e)=>common.keyDownEvent(canvas,e)
    canvas.componentSize = common.initialComponentSize(); // 최초 렌더링 이후 canvas에 componentSize 값 저장 
    canvas.zoomInfo = '';
  }, [])

  useEffect(()=>{
    canvas.off('mouse:wheel')
    canvas.on({
      'mouse:wheel': (opt) => {
        console.log('ㅋ')
           var delta = opt.e.deltaY;
          if(delta<0){
              common.zoom(canvas,1.1);
              let num=Number(canvas.zoomInfo.slice(0,-1));
              canvas.zoomInfo=(num*1.1).toFixed(0).toString() + "%";
          }else{
              common.zoom(canvas,0.9);
              let num=Number(canvas.zoomInfo.slice(0,-1));
              canvas.zoomInfo=(num*0.9).toFixed(0).toString() + "%";
          }
    
      }
  });
  
  })
  useEffect(() => {  //이후 메뉴를 여닫으며 렌더링 될 때마다 canvas component의 size값을 바꾸고 캔버스 중앙 위치 
    var leftbar = document.querySelector('#leftbar').offsetWidth;
    canvas.componentSize['leftbar'] = leftbar;
    if (common.getCanvasStyleWidth() > common.getInnerSize(canvas)['innerWidth']) {
      recentSize.current = { 'width': common.getCanvasStyleWidth(), 'height': common.getCanvasStyleHeight() }; //사이즈 조절 전 캔버스 크기 저장 
      common.fitToProportion(canvas); //leftbar 열었을 때 캔버스 style width 가 가려진다면 
    }

    if (recentSize.current !== '' && leftbar === 48) { //저장한 캔버스 크기로 돌아감
      common.setCanvasStyleSize(recentSize.current['width'], recentSize.current['height']);
      recentSize.current = ''
    }

  
    common.setCanvasCenter(canvas);
  },[isOpened])

 
  function changeMenu(menutype){
    if(menu === menutype) {
      setMenu('');
      setIsOpened(false)
    }else{
      setMenu(menutype);
      setIsOpened(true);
    }
  }
  return (
    <div id='leftbar' className={styles.container}>

      <div style={{ display: "flex", flexDirection: "column", outline: "none" }} >
        {/* <MenuOutlinedIcon onClick={() => {SetCurrentRoute("Menu");toggleMenu();}} style={{ userSelect: "none" }}/> */}
        <AppstoreOutlinedIcon onClick={() => { changeMenu('object-menu') }} />
        <FontSizeOutlinedIcon onClick={() => { changeMenu('text-menu') }} />
        <LineOutlinedIcon onClick={() => { changeMenu('drawing-menu') }} />
        <AreaChartOutlinedIcon onClick={() => {changeMenu('filter-menu')}} />
        <ScissorOutlinedIcon onClick={() => { changeMenu('crop-menu')}} />
      </div>

      {/* submenu */}
      <div id='submenu' className={menu === '' ? styles.SubmenuClosed : styles.Submenu} >    {/* 메뉴가 열려있지 않으면 style 적용 x */}
        {menu === 'object-menu' && <FigureSubmenu canvas={canvas} menu={menu} setMenu={setMenu} />}
        {menu === 'text-menu' && <TextBoxSubmenu canvas={canvas} menu={menu} setMenu={setMenu} />}
        {menu === 'drawing-menu' && <LineSubmenu canvas={canvas} menu={menu} setMenu={setMenu} />}
        {menu === 'filter-menu' && <FilterSubmenu canvas={canvas}  menu={menu} setMenu={setMenu} />}
        {menu === 'crop-menu' && <CropSubmenu canvas={canvas}  menu={menu} setMenu={setMenu}/>}
      </div>
    </div>
  );
};


export default LeftSidebar;