import styles from "./LayerList.module.css";

export default function LayerList({Items}){
    return(
        <div>
            {Items.map((item,index)=>(
                <div className={styles.Item} key={index}>
                    {item}
                </div>
            ))}
        </div>
    )
}