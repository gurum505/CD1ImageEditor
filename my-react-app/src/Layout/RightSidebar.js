import styles from "./RightSidebar.module.css";
import {FontSizeOutlined,SettingOutlined,BorderOutlined,AreaChartOutlined, LineOutlined } from "@ant-design/icons"

//속성들-정렬은 header에 가는게 맞을수도 있다.
//정렬 좌
//<AlignLeftOutlined />
//정렬 중앙
//<AlignCenterOutlined />
//정렬 우측
//<AlignRightOutlined />
//색 적용
//<BgColorsOutlined />
//text font size
//<LineHeightOutlined />
//font color
//<FontColorsOutlined />
//width
//<ColumnWidthOutlined />
//height
//<ColumnHeightOutlined />

const RightSidebar = ({children, wid,  toggleMenu, isOpen}) => { 
  /** 화면 바깥을 클릭시 닫히도록 하는 함수
   * const handleClose = async e => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(-width); 
      await setOpen(false);
    }
  }

  useEffect(()=> {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  })
   */

  /*하나를 열었을때 다른 폴더가 접히도록 하는 함수
  window.addEventListener('DOMContentLoaded', function(){//하나의 목록만 접었다 펼 수 있도록
    document.querySelectorAll('details').forEach(function(item){
        item.addEventListener("toggle", event => {/detail은 접었다펼때 toggle발생 
        let toggled = event.target;
        if (toggled.attributes.open) {// 열었으면 
          // 나머지 다른 열린 아이템을 닫음 
          document.querySelectorAll('details[open]').forEach(function(opened){
              if(toggled !== opened) // 현재 열려있는 요소가 아니면 
                opened.removeAttribute('open'); // 열림 속성 삭제 
          });
        }
      })
    });
  });*/
  
  isOpen=isOpen[1];
  wid=wid[1];

  const page=(isOpen)=>{
    if(isOpen){
      return(
        <div>
          <details className={styles.detail}>
            <summary>Canvas</summary>
            <p>width</p>
            <p>height</p>            
          </details>
          <details className={styles.detail}>
            <summary>Figure</summary>
            <p>width</p>
            <p>height</p>    
            <p>Color</p>         
          </details>
          <details className={styles.detail}> 
            <summary>Text</summary>
            <p>Color</p>
            <p>Size or fontSize</p>
            <p>Bold</p>
            <p>Italic</p>
            <p>Underline</p>
            <p>Align-Left</p>
            <p>Align-Center</p>
            <p>Align-Right</p>
          </details>
          <details className={styles.detail}>
            <summary>Drawing</summary>
            <p>width</p>
            <p>Color</p>         
          </details>
          <details className={styles.detail}>
            <summary>Image</summary>
            <p>width</p>
            <p>height</p>
            <p>blur</p>   
            <p>opacity</p>
            <p>brightness</p>
            <p>pixelate</p>         
          </details>
        </div>
      );
    }
  }

  return (
    <div className={styles.container}>
      <div style={{ width: `${wid}px`, height: '100%',  transform: `translatex(-200px)`, transition:'0.4s ease'}}>
        <div className={styles.iconContainer}>
          <SettingOutlined className={styles.icon} onClick={()=>toggleMenu(1)} />
          <BorderOutlined className={styles.icon} onClick={()=>toggleMenu(1)}/>
          <FontSizeOutlined className={styles.icon} onClick={()=>toggleMenu(1)}/>
          <LineOutlined className={styles.icon} onClick={()=>toggleMenu(1)}/>
          <AreaChartOutlined className={styles.icon} onClick={()=>toggleMenu(1)}/>
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