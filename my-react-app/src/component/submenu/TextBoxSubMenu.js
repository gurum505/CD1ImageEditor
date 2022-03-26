import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
export default function TextboxSubmenu(props) {
    const canvas = props.canvas;
    const isAddingTextbox = props.isAddingTextbox;
    const [isBold, setIsBold] = useState(false);
    const [isItalic,setIsItalic] = useState(false);
    const [isUnderlined, setIsUnderlined] = useState(false);

    const textBox = useRef("");
    const color =  useRef("red");

    canvas.on('mouse:down', (o) => {
        var pointer = canvas.getPointer(o.e);

        var textBox = new fabric.Textbox('내용 입력', {
            width: 250,
            fill : `${color.current}`,
            left: pointer.x - 125,
            top: pointer.y - 20,
        });
        if (isAddingTextbox) {
            canvas.add(textBox);
            canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.off('mouse:down');
            props.setIsAddingTextbox(!isAddingTextbox);
        }
    });


    // useEffect(() => {
    //     canvas.on('mouse:down', (o) => {
    //         var pointer = canvas.getPointer(o.e);

    //         var textBox = new fabric.Textbox('내용 입력', {
    //             width: 250,

    //             left: pointer.x - 125,
    //             top: pointer.y - 20,
    //         });
    //         if (isAddingTextbox) {
    //             canvas.add(textBox);
    //             canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
    //             canvas.off('mouse:down');
    //             props.setIsAddingTextbox(!isAddingTextbox);
    //         }
    //     })
    // },);

    //추후 보완할 점 : 드래그 범위 bold 지정, 커서 위치 문자의 bold 여부에 따라 button 변경
    function makeTextBold() {
        if(canvas.getActiveObject()){
        var fontWeight = canvas.getActiveObject().fontWeight === 'bold'? 'normal' : 'bold';
        // document.getElementById("bold").style.fontWeight = `${fontWeight}`;
        const text = canvas.getActiveObject();
        // text.setSelectionStyles({ fontWeight: `${fontWeight}` }, text.selectionStart,99 );
        text.set("fontWeight", fontWeight);
        canvas.renderAll();
        setIsBold(1);

        }
        // if((text.selectionStart === text.selectionEnd)){
        
        //     text.setSelectionStyles({ fontWeight: `${fontWeight}` }, text.selectionStart,99 );
        // }else if(text.selectionStart === text.selectionEnd){
        //     text.setSelectionStyles({ fontWeight: `${fontWeight}` }, text.selectionStart,text.selectionStart );
        // }
        // else {
        // //커서 범위에 스타일 지정 
        // text.setSelectionStyles({ fontWeight:  `${fontWeight}`}, text.selectionStart,text.selectionEnd );
        // }


    }

    function italicizeText(){
        if(canvas.getActiveObject()){
            var fontFamily = canvas.getActiveObject().fontStyle === 'italic'? 'normal' : 'italic';
            console.log(canvas.getActiveObject().fontFamily);
            console.log(fontFamily);
            const text = canvas.getActiveObject();
            // text.setSelectionStyles({ fontWeight: `${fontWeight}` }, text.selectionStart,99 );
            text.set("fontStyle", fontFamily);
            canvas.renderAll();
            setIsItalic(1);
    }
    }
    function underlineText(){
        if(canvas.getActiveObject()){
            var underline = !canvas.getActiveObject().underline;
            console.log(underline);
            // document.getElementById("bold").style.fontWeight = `${fontWeight}`;
            const text = canvas.getActiveObject();
            // text.set('fontWeight','italic');
            // text.setSelectionStyles({ underline: underline }, text.selectionStart,99 );
            text.set('underline',underline);
            canvas.renderAll();
            setIsUnderlined(1);
        }
    }

    // 정렬 
    function alignText(to){
        if(canvas.getActiveObject().type==='textbox'){
        const text = canvas.getActiveObject();
        text.set({textAlign: `${to}`});
        canvas.renderAll();
    }
    }

    //밑줄


    return (<>
        <div className="textbox-submenu">
            <button onClick={makeTextBold} id='bold' >
                진하게
            </button>
            <button onClick={italicizeText} id='italic'>
                이탤릭
            </button>
            <button onClick={underlineText} id='underline'>
                밑줄선
            </button>
            &nbsp; &nbsp;
            <button onClick={()=>alignText('left')}>
                왼쪽정렬
            </button>
            <button onClick={()=>alignText('center')}>
                가운데정렬
            </button>
            <button onClick={()=>alignText('right')}>
                오른쪽정렬
            </button>
            &nbsp; &nbsp;

            <button >
                색상
            </button>
        </div>
    </>)
}