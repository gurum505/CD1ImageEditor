import styles from "./RightSidebar.module.css";
import LayerList from "../component/submenu/LayerList.js"
import { PlusOutlined}from "@ant-design/icons";


export default function RightSidebar (props) { 
  return (
    <>
    <div id ="rightsidebar" className={styles.container}>
      <div className={styles.itemList}>
        <div className={styles.addItem} onClick={props.addLayerItem}>
          <PlusOutlined style={{fontSize:"20pt", color:"gray"}} />
        </div>
        <div className={styles.itemScroll}>
          <LayerList Items={props.Items} delItem={props.delItem}/>
        </div>
      </div>
    </div>
    </>
  );
};
