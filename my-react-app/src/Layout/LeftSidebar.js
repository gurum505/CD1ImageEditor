import styles from "./LeftSidebar.module.css";
import LeftSidebarClosed from "../component/submenu/LeftSidebarClosed";
import LeftSidebarOpened from "../component/submenu/LeftSidebarOpened";

const LeftSidebar = ({children, wid, toggleMenu, isOpen}) => {
  isOpen=isOpen[0];
  wid=wid[0];

  function page(isOpen){
    if(isOpen){
      return(
        <div>
          <LeftSidebarOpened toggleMenu={toggleMenu}/>
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
      <div style={{ width: `${wid}px`, height: '100%',  transform: `translatex(-200px)`, transition:'0.4s ease'}}>
        
        <div className={styles.content}>
          {children}
          {page(isOpen)}
        </div>
      </div>
    </div>
  );
};


export default LeftSidebar;
