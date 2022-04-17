import styles from "./RightSidebar.module.css";
import LayerList from "../component/submenu/LayerList.js"
import { PlusOutlined}from "@ant-design/icons";
import { useState } from "react";


//drag start 에서 새 list를 하나 만들고 다른 것을 지운뒤 집어넣을 건지
//item을 재정렬할건지 item.id를 바꿔치기하고 나머지를 아래로 하나씩 미룬다던가
//id를 div에 직접 추가해서 구현했는데 이게 맞나
export default function RightSidebar (props) { 

  const [isDragging,setIsDragging]=useState(false);
  const [isDragOver,setIsDragOver]=useState(false);
  // var isDragOver=-1;

  const handleDragStart=(e)=>{
    setIsDragging(true); //내가 현재 drag중인가?
    e.dataTransfer.effectedAllowed = "move"; //드래그시 마우스 아래 생기는 십자가 버튼 막기
    e.dataTransfer.setData("targetId",e.target.id); //잡은 item의 data를 담는다.[key],[value]
    // console.log(props.Items.findIndex(obj=>obj.id === Number(e.target.id)));
  }
  const handleDragOver = (e) => {
    e.preventDefault(); // touch같은 기본으로 발동하는 다른 이벤트를 막는다.
    // isDragOver=(e.target.id);
    // console.log(e.target) // 현재 요소가 드래그 요소의 아래 깔려있음을 알려준다
    //e.target은 아래깔린 아이템

    console.log(e.target.innerText.substr(5,));

  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    //  setIsDragOver(false);

    let newId = e.dataTransfer.getData('targetId'); // Start에서 저장한 데이터 풀어준다
    // console.log(e.target.innerText);//FIXME:ID가안잡혀서 innerText로 했다.
    let oriId=e.target.innerText.substr(5,)
    // let oriId=Number(oriName.substr(5,))
    // item의 위치를 바꿔주는 함수
    props.moveItem(props.Items,newId,oriId);
  };

  const dragOverItem=()=>{

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
              isDragOver={isDragOver}
              handleDrop={handleDrop}
              canvas={props.canvas}/>
        </div>
      </div>
    </div>
    </>
  );
};
