import styles from "./LayerList.module.css";
import {DashOutlined} from "@ant-design/icons"

export default function LayerList(props){
    const {Items, delItem,handleDragStart,handleDragOver,handleDrop,idDragOver,canvas}=props

    return(
        <>
            {Items.map((Item)=>(
                <div draggable 
                    // className={idDragOver? styles.ItemDragOver : styles.Item}
                    className={styles.Item}
                    key={Item.id} 
                    id={Item.id} 
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}>
                    <>
                    <div onClick={()=>delItem(Item.id)}>
                      <DashOutlined className={styles.ItemButton} />
                    </div>
                    <div className={styles.ItemContent}>
                        <canvas height={"30px"} width={"30px"}/>
                        {Item.name}
                    </div>
                    </>
                </div>
            ))}
        </>
    )
}