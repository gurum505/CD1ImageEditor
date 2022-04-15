import styles from "./RightSidebar.module.css";
import { useState,useRef } from "react";
import LayerList from "../component/submenu/LayerList.js"
import { PlusOutlined}from "@ant-design/icons";

const RightSidebar = () => { 

  const [Items,setItems]=useState([]);
  const nextId=useRef(1);

  function delItem(id){
    setItems(
      Items=>(Items.filter(Item=>Item.id !== id))
    )

  }

  //TODO: 객체도 되는지
  function addLayerItem(){
    let newItems=[
      ...Items,
      {name:"items"+(nextId.current),
      id:(nextId.current)}
    ];
    newItems=sortItems(newItems);
    setItems(newItems);
    nextId.current+=1;

  }

  //id 내림차순으로 정렬
  function sortItems(Items){
    Items.sort((a,b)=>(b.id-a.id));
    return Items;
  }

  return (
    <>
    <div id ="rightsidebar" className={styles.container}>
      <div className={styles.itemList}>
        <div className={styles.addItem} onClick={addLayerItem}>
          <PlusOutlined style={{fontSize:"20pt", color:"gray"}} />
        </div>
        <div className={styles.itemScroll}>
          <LayerList Items={Items} delItem={delItem}/>
        </div>
        
      </div>
      
    </div>
    </>
  );
};


export default RightSidebar;