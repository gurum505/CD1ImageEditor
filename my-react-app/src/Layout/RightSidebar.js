import styles from "./RightSidebar.module.css";
import {FontSizeOutlinedIcon,SettingOutlinedIcon,BorderOutlinedIcon
  ,AreaChartOutlinedIcon, LineOutlinedIcon } from "../component/icons/icons"
import RightSidebarOpened from "../component/submenu/RightSidebarOpened";

const RightSidebar = ({children, wid,  toggleMenu, isOpen}) => { 
  isOpen=isOpen[1];
  wid=wid[1];

  const page=(isOpen)=>{
    if(isOpen){
      return(
        <RightSidebarOpened/>
      );
    }
  }

  return (
    <div className={styles.container}>
      <div style={{ width: `${wid}px`, height: '100%',  transform: `translatex(-200px)`, transition:'0.4s ease'}}>
        <div className={styles.iconContainer}>
          <div style={{display:"flex",flexDirection:"column"}}>
          <SettingOutlinedIcon onClick={()=>toggleMenu(1)} />
          <BorderOutlinedIcon  onClick={()=>toggleMenu(1)}/>
          <FontSizeOutlinedIcon  onClick={()=>toggleMenu(1)}/>
          <LineOutlinedIcon onClick={()=>toggleMenu(1)}/>
          <AreaChartOutlinedIcon onClick={()=>toggleMenu(1)}/>
          </div>
        </div>
        <div className={styles.content}>
          {children}
          {page(isOpen)}
        </div>
      </div>
    </div>
  );
};


export default RightSidebar;