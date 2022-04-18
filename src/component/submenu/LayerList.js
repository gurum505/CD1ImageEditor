import styles from "./LayerList.module.css";
import {DashOutlined, NodeExpandOutlined} from "@ant-design/icons"
import { render } from "@testing-library/react";

export default function LayerList(props){
    const {Items, delItem,handleDragStart,handleDragOver,handleDrop,idDragOver,canvas}=props

    function renderImg(props){//Item.img
        
        return(
            // <button disabled style={{backgroundColor:"#202020", border:"none",outline:"none", cursor:"default"}}>
            <div >
            <img src={props.img} className={styles.Img} crossOrigin="annoymous"/>
            {/* </button> */}
            </div>
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
                    {/* <div>
                        {Item.name}
                    </div> */}
                    <div onClick={()=>delItem(Item.id)}>
                      <DashOutlined className={styles.ItemButton} />
                    </div>
                    <div id ={"layer"+Item.id} className={styles.select}>
                        {/* 선택용 투명 레이어 */}
                    </div>
                    <div className={styles.ItemContent}>
                        {renderImg(Item)}   
                        {/* <canvas height={"30px"} width={"30px"}/> */}
                        {/* {console.log(typeof(Item.div))} */}
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