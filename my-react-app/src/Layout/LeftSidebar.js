import styles from "./LeftSidebar.module.css";
import LeftSidebarClosed from "../component/submenu/LeftSidebarClosed";
import LeftSidebarOpened from "../component/submenu/LeftSidebarOpened";

import { useState } from "react";
const LeftSidebar = ({children, canvasRef}) => {
  const [wid, setX] = useState(50)
  const [isOpen, setOpen] = useState(false);

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
          <LeftSidebarOpened toggleMenu={toggleMenu} canvasRef={canvasRef}/>
        </div>
      )
    }
    else{
      return(
        <LeftSidebarClosed toggleMenu={toggleMenu}/>
      )
    }
  }

  return (
    <div className={styles.container}>
      <div style={{ width: `${wid}px`, height: '100%', transition:'1s ease'}}>
        
        <div className={styles.content}>
          {children}
          {page(isOpen)}
        </div>
      </div>
    </div>
  );
};


export default LeftSidebar;
