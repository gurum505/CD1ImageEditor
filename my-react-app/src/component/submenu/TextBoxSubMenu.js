import { fabric } from "fabric";
import { useEffect, useState } from "react";
export default function TextBoxSubMenu(props) {

    const canvas = props.canvas;
    const isAddingTextbox = props.isAddingTextbox;
    console.log(isAddingTextbox);
    useEffect(()=>{
        canvas.on('mouse:down', (o) => {
            var pointer = canvas.getPointer(o.e);
    
            var textBox = new fabric.Textbox('Text Box', {
                width: 250,
    
                left: pointer.x - 125,
                top: pointer.y - 20,
            });
            if(isAddingTextbox){
            console.log('마우스다운');
            canvas.add(textBox);
            canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.off('mouse:down');
            props.setIsAddingTextbox(!isAddingTextbox);
            }
        })
    })
   


    return (<>
        <div>
            <button>
                진하게
            </button>
            <button>
                이탤릭
            </button>
            <button>
                말풍선
            </button>
            <button>
                왼쪽정렬
            </button>
            <button>
                가운데정렬
            </button>
            <button>
                오른쪽정렬
            </button>
            <button>
                색상
            </button>
        </div>
    </>)
}