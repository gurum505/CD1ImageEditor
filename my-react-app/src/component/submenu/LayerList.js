import styles from "./LayerList.module.css";
import {DashOutlined} from "@ant-design/icons"

export default function LayerList(props){
    const {Items, delItem,handleDragStart, handleDragOver, handleDrop}=props
    
    return(
        <>
            {Items.map((Item)=>(
                <div draggable 
                    className={styles.Item}
                    key={Item.id} 
                    id={Item.id} 
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <>
                    <div onClick={()=>delItem(Item.id)}>
                      <DashOutlined className={styles.ItemButton} />
                    </div>
                    <div className={styles.ItemContent}>
                        {Item.name}
                    </div>
                    </>
                </div>
            ))}
        </>
    )
}