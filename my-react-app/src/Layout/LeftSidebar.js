import styles from "./LeftSidebar.module.css";
import LeftSidebarClosed from "../component/submenu/LeftSidebarClosed";
import LeftSidebarOpened from "../component/submenu/LeftSidebarOpened";
import { useEffect, useRef, useState} from "react";
import * as common from "../component/submenu/common"
const LeftSidebar = ({children, canvas, imageRef,image}) => {
  const [wid, setX] = useState(50)
  const [isOpen, setOpen] = useState(false);
  const [currentRoute,SetCurrentRoute] =useState("Menu");

  //사이드바 바깥을 클릭했을 때 닫히도록
  //sidebar, canvas안에서는 안닫히고 나머지에서는 닫히도록
  // const side=useRef();
  // const handleClose = (e)=> {
  //   let sideArea = side.current; //sidebar크기
  //   let sideCildren = side.current.contains(e.target); //sidebar에 e.target이 들어가나
  //   if(isOpen&&(!sideArea|| !sideCildren)){
  //     toggleMenu();
  //   }
  // }

  // useEffect(()=> {
  //   window.addEventListener('click', handleClose);
  //   return () => {
  //     window.removeEventListener('click', handleClose);
  //   };
  // })
  

  const beforeLeftbarOpenedSize = useRef(''); //leftbar 닫았을 때 닫기 전 캔버스 크기 유지를 위한 변수 
  
  useEffect(()=>{
    if( imageRef.current){
      console.log(imageRef.current)
      imageRef.current = !imageRef.current;
    setX(50);
    setOpen(false);
      canvas.componentSize['leftbar']=50;
    }
  },[image])

  function toggleMenu() {
      if (wid > 50) {
          setX(50);
          setOpen(false);
          canvas.componentSize['leftbar']=50;
      }
      else {
        beforeLeftbarOpenedSize.current = {'width':common.getCanvasStyleWidth(), 'height' : common.getCanvasStyleHeight()}
          setX(200);
          setOpen(true);
          canvas.componentSize['leftbar']=200;
      }
  }


  function page(isOpen){
    if(isOpen){
      common.setCanvasCenter(canvas);
      if(common.getCanvasStyleWidth()>common.getInnerSize(canvas)['innerWidth']){ //leftbar 열렸을 때 캔버스 크기를 넘으면 
         common.fitToProportion(canvas)
      }
      return( 
        <LeftSidebarOpened toggleMenu={toggleMenu} currentRoute={currentRoute} canvas={canvas} />
      )

    }
    else{
      common.setCanvasStyleSize(beforeLeftbarOpenedSize.current['width'],beforeLeftbarOpenedSize.current['height'])
      common.setCanvasCenter(canvas);
      return(
        <LeftSidebarClosed toggleMenu={toggleMenu} SetCurrentRoute={SetCurrentRoute} canvas={canvas}/>
      )
    }
  }

  return (
    <div className={styles.container} >
      <div id='leftbar'style={{ width: `${wid}px`, height: '100%', transition:'0.5s ease' ,overflow:"hidden"}}>
        
        <div className={styles.content}>
          {children}
          {page(isOpen)}
        </div>
      </div>
    </div>
  );
};


export default LeftSidebar;