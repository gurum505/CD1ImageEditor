import styles from "./LayerList.module.css";
import {DashOutlined} from "@ant-design/icons"

export default function LayerList({Items, delItem}){
    
    return(
        <>
            {Items.map((Item)=>(
                <div className={styles.Item} key={Item.id}>
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