import styles from "./LayerList.module.css";
import {DashOutlined} from "@ant-design/icons"
import { render } from "@testing-library/react";

export default function LayerList(props){
    const {Items, delItem,handleDragStart,handleDragOver,handleDrop,idDragOver,canvas}=props

    function renderImg(props){//Item.img
        
        return(
            <img src={props} crossOrigin="annoymous" 
            style={{width:"30pt", height:"30pt", objectFit:"contain"}}/>
        )
    }

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
                        {/* <canvas height={"30px"} width={"30px"}/> */}
                        {/* {console.log(typeof(Item.div))} */}
                        {renderImg(Item.img)}
                        {/* {Item.name} */}
                        {/* <renderElement dangerouslySetInnerHTML={{__html:Item.div}}/> */}
                        {/* <Item.div dangerouslySetInnerHTML={{__html:Item.div}}/> */}
                        {/* {createJSX(Array.from(Item.div))} */}
                    </div>
                    </>
                </div>
            ))}
        </>
    )
}