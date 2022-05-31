import styles from "./LayerList.module.css";
import {CloseOutlined} from "@ant-design/icons"

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

    const selectFromLayer=(canvas,id)=>{
        let objects = canvas.getObjects();
        let obj;
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].id === id) {
                obj=objects[i];
                break;
            }
        }
        console.log(obj);
        canvas.setActiveObject(obj);
        canvas.renderAll(); //이게 없으면 화면에 보이지 않음
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
                    
                    {/* <div onClick={()=>delItem(canvas,Item.id)}>
                      <CloseOutlined className={styles.ItemButton} />
                    </div> */}
                    <div id ={"layer"+Item.id} className={styles.select} onClick={()=>selectFromLayer(canvas,Item.id)}>
                        {/* 선택용 투명 레이어 */}
                    </div>
                    {/* <div id='layer-list' className={styles.ItemContent}> */}
                        {renderImg(Item)}   
                        
                    {/* </div> */}
                    
                    </>
                </div>
            ))}
        </>
    )
}