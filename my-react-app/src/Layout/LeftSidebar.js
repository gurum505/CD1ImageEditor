import styles from "./LeftSidebar.module.css";
import LeftSidebarClosed from "../component/submenu/LeftSidebarClosed";
import LeftSidebarOpened from "../component/submenu/LeftSidebarOpened";
import { useState, useEffect,useRef } from "react";

const LeftSidebar = ({children, canvas}) => {
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
  


  function toggleMenu() {
      if (wid > 50) {
          setX(50);
          setOpen(false);
      }
      else {
          setX(200);
          setOpen(true);
      }
  }
  function page(isOpen){
    
    if(isOpen){
      return(
        <div>
          <LeftSidebarOpened toggleMenu={toggleMenu} currentRoute={currentRoute} canvas={canvas}/>
        </div>
      )
    }
    else{
      return(
        <LeftSidebarClosed toggleMenu={toggleMenu} SetCurrentRoute={SetCurrentRoute}/>
      )
    }
  }

  return (
    <div className={styles.container}>
      <div style={{ width: `${wid}px`, height: '100%', transition:'0.3s ease' ,overflow:"auto"}}>
        
        <div className={styles.content}>
          {children}
          {page(isOpen)}
        </div>
      </div>
    </div>
  );
};


export default LeftSidebar;