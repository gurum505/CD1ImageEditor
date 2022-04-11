import styles from "./RightSidebar.module.css";
import { useState,useRef } from "react";
import LayerList from "../component/submenu/LayerList.js"
import { PlusOutlinedIcon,CloseOutlinedIcon } from "../component/icons/icons";

const RightSidebar = () => { 
  //https://velog.io/@fltxld3/React-%EB%B0%B0%EC%97%B4-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-List-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%A1%B0%ED%9A%8C

  const [Items,setItems]=useState([]);
  const nextId=useRef(1);

  function delItem(){
    let newItems=[...Items];
    newItems.pop();
    setItems(newItems);
    nextId.current-=1;
    // console.log(Items);
  }

  function addLayerItem(){
    setItems([
      ...Items,
      "items"+(nextId.current)
    ]);
    nextId.current+=1;
    // console.log(Items);
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        <h4>레이어</h4>
      </p>
      <div className={styles.addItem}>
        <PlusOutlinedIcon  onClick={addLayerItem}/>
      </div>
      <CloseOutlinedIcon onClick={delItem}/>
      <LayerList Items={Items}/>
    </div>
  );
};


export default RightSidebar;