import styles from "./LeftSidebar.module.css";
import {FontSizeOutlined,MenuOutlined,BorderOutlined,AreaChartOutlined, LineOutlined } from "@ant-design/icons"
//곡선(자유그리기)
//<HighlightOutlined /> <FallOutlined />
//
const LeftSidebar = ({children, wid, toggleMenu, isOpen}) => {
  isOpen=isOpen[0];
  wid=wid[0];

  function page(isOpen){
    if(isOpen){
      return(
        <div className={styles.openContainer}>
          <MenuOutlined className={styles.icon} onClick={()=>toggleMenu(0)}/>
          <details className={styles.detail} >
            <summary>Shape</summary>
            <p><BorderOutlined/> rectangle</p>
            <p><BorderOutlined/> triangle</p>
            <p><BorderOutlined/> circle</p>
          </details>
          <details className={styles.detail}> 
            <summary>Text</summary>
            <p><FontSizeOutlined/> Text</p>
          </details>
          <details className={styles.detail}> 
            <summary>Drawing</summary>
            <p><LineOutlined/> line</p>
            <p><LineOutlined/> curve</p>
          </details>
          <details className={styles.detail}> 
            <summary>Image</summary>
            <p><AreaChartOutlined/> from local repository</p>
            <p><AreaChartOutlined/> from online </p>
          </details>
        </div>
      )
    }
    else{
      return(
        <div>
          <MenuOutlined className={styles.icon} onClick={()=>toggleMenu(0)}/>
          <BorderOutlined className={styles.icon} onClick={()=>toggleMenu(0)}/>
          <FontSizeOutlined className={styles.icon} onClick={()=>toggleMenu(0)}/>
          <LineOutlined className={styles.icon} onClick={()=>toggleMenu(0)}/>
          <AreaChartOutlined className={styles.icon} onClick={()=>toggleMenu(0)}/>
        </div>
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