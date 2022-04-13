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
    // console.log(Items);
    // console.log(id);
    // nextId.current-=1;
  }

  //TODO: 객체도 되는지
  function addLayerItem(){
    setItems([
      ...Items,
      {name:"items"+(nextId.current),
      id:(nextId.current)}
    ]);
    nextId.current+=1;
    // console.log(Items);
  }

  return (
    <>
    <div className={styles.container}>
      {/* <p className={styles.title}>
        Layer
      </p> */}
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