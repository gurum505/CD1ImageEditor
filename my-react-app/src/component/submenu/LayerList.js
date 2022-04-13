import styles from "./LayerList.module.css";
import {DashOutlined} from "@ant-design/icons"

export default function LayerList({Items, delItem}){
    
    return(
        <>
            {Items.map((item,index)=>(
                <div className={styles.Item} key={index}>
                    <>
                    <div onClick={delItem}>
                      <DashOutlined className={styles.ItemButton} />
                    </div>
                    <div className={styles.ItemContent}>
                        {item}/
                    </div>
                    </>
                </div>
            ))}
        </>
    )
}