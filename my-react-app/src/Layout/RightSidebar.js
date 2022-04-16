import styles from "./RightSidebar.module.css";
import LayerList from "../component/submenu/LayerList.js"
import { PlusOutlined}from "@ant-design/icons";
import { useState } from "react";


//drag start 에서 새 list를 하나 만들고 다른 것을 지운뒤 집어넣을 건지
//item을 재정렬할건지 item.id를 바꿔치기하고 나머지를 아래로 하나씩 미룬다던가
//id를 div에 직접 추가해서 구현했는데 이게 맞나
export default function RightSidebar (props) { 

  const [isDragging,setIsDragging]=useState(false);
  const [isDraggOver,setIsDragOver]=useState(false);
  

  const handleDragStart=(e)=>{
    setIsDragging(true); //내가 현재 drag중인가?
    e.dataTransfer.effectedAllowed = "move"; //드래그시 마우스 아래 생기는 십자가 버튼 막기
    e.dataTransfer.setData("text/html",e.target.id); //잡은 item의 data를 담는다.[key],[value]
    console.log(props.Items.findIndex(obj=>obj.id === Number(e.target.id)));
  }
  const handleDragOver = (e) => {
    e.preventDefault(); // touch같은 기본으로 발동하는 다른 이벤트를 막는다.
    setIsDragOver(true);
    // console.log(e) // 현재 요소가 드래그 요소의 아래 깔려있음을 알려준다
    //e.target은 아래깔린 아이템
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setIsDragOver(false);
    let newId = e.dataTransfer.getData('text/html'); // Start에서 저장한 데이터 풀어준다
    // item의 위치를 바꿔주는 함수
    // console.log(newId); //내가 잡은 아이템의 고유ID
    console.log(e);
    props.moveDown(props.Items,newId);
  };

  const swapItems=(Items,oriId,newId)=>{
    Items.map((item)=>{
      if(oriId < newId){ 
        
      }else if(oriId > newId){

      }
    })
  }

  
  const moveUp =(contents, value)=>{
    const index= contents.indexOf(value);
    let newPos=index-1;
    const newContents=[...contents];
    if(newPos<=0){
      newPos = 0;
    }
    newContents.splice(index,1);
    newContents.splice(newPos,0,value);
  }

  return (
    <>
    <div id ="rightsidebar" className={styles.container}>
      <div className={styles.itemList}>
      {/* props.addLayerItem */}
        <div className={styles.addItem} onClick={props.addLayerItem}>
          <PlusOutlined style={{fontSize:"20pt", color:"gray"}} />
        </div>
        <div className={styles.itemScroll}>
          <LayerList 
              Items={props.Items} 
              delItem={props.delItem} 
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              moveUp={moveUp}/>
        </div>
      </div>
    </div>
    </>
  );
};
