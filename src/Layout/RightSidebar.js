import styles from "./RightSidebar.module.css";
import LayerList from "../component/submenu/LayerList.js"
import { PlusOutlined}from "@ant-design/icons";
import { useState } from "react";
import Modal from "../component/Modal.js"


export default function RightSidebar (props) { 
  const [isDragging,setIsDragging]=useState(false);
  const [isDragOver,setIsDragOver]=useState(false);

  const handleDragStart=(e)=>{
    setIsDragging(true); //내가 현재 drag중인가?
    e.dataTransfer.effectedAllowed = "move"; //드래그시 마우스 아래 생기는 십자가 버튼 막기
    // console.log("handlestart TargetID: ",e.target);
    e.dataTransfer.setData("targetId",e.target.id); //잡은 item의 data를 담는다.[key],[value]
  }
  const handleDragOver = (e) => {
    e.preventDefault(); // touch같은 기본으로 발동하는 다른 이벤트를 막는다.


    // console.log(e.target);

  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    let newId = e.dataTransfer.getData('targetId'); // Start에서 저장한 데이터 풀어준다
    // console.log("newId",newId);
    // console.log(e.target.innerText);

    let oriId=e.target.id.substr(5,);
    // console.log("oriId",oriId);
    // item의 위치를 바꿔주는 함수
    props.moveItem(props.Items,newId,oriId);
  };


  
  
  const [isModalOpen,setIsModalOpen]=useState(false);
  const openModal= ()=>{
      setIsModalOpen(true);
  }
  const closeModal= ()=>{
      setIsModalOpen(false);
  }
  

  return (
    <>
    <div id ="rightsidebar" className={styles.container}>
      <div className={styles.itemList}>
      {/* props.addLayerItem */}
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} canvas={props.canvas} addLayerItem={props.addLayerItem} />
        <div className={styles.addItem} onClick={openModal}>
          <PlusOutlined style={{fontSize:"20pt", color:"gray"}} />
        </div>
        <div id='rightsidebar-item-scroll'className={styles.itemScroll}>
          <div id='layer-list' >

          </div>
        </div>
      </div>
    </div>
    </>
  );
};
