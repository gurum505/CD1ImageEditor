import { fabric } from "fabric";
import {  useEffect, useRef } from "react";
import ColorPicker from "./ColorPicker";
export default function TextboxSubmenu(props) {
    const canvas = props.canvas;
    const state = props.state;
    const color = useRef('black');
    function updateModifications(savehistory) {
        if (savehistory === true) {
            var  myjson = canvas.toJSON();
            state.current.push(myjson);
        }        
    }

    useEffect(()=>{
        canvas.off('mouse:down');
        canvas.defaultCursor = 'default';
    })

    function addTextBox() {
        canvas.defaultCursor = 'text';
        canvas.on('mouse:down', (o) => {
            const pointer = canvas.getPointer(o.e);
            addTextBox();
            var textbox = new fabric.Textbox('내용 입력', {
                width: 250,
                fill: `${color.current}`,
                left: pointer.x - 125,
                top: pointer.y - 20,
            });
            canvas.add(textbox);
            updateModifications(true);
            canvas.off('mouse:down');
            canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
            canvas.defaultCursor = 'default';

        });
    }

    //추후 보완할 점 : 드래그 범위 bold 지정, 커서 위치 문자의 bold 여부에 따라 button 변경
    function makeTextBold() {
        if (canvas.getActiveObject()) {
            var fontWeight = canvas.getActiveObject().fontWeight === 'bold' ? 'normal' : 'bold';
            // document.getElementById("bold").style.fontWeight = `${fontWeight}`;
            const text = canvas.getActiveObject();
            // text.setSelectionStyles({ fontWeight: `${fontWeight}` }, text.selectionStart,99 );
            text.set("fontWeight", fontWeight);
            canvas.renderAll();
        }
    }

        //TODO:커서 범위에 따라 스타일 지정
        // if((text.selectionStart === text.selectionEnd)){

        //     text.setSelectionStyles({ fontWeight: `${fontWeight}` }, text.selectionStart,99 );
        // }else if(text.selectionStart === text.selectionEnd){
        //     text.setSelectionStyles({ fontWeight: `${fontWeight}` }, text.selectionStart,text.selectionStart );
        // }
        // else {
        // //커서 범위에 스타일 지정 
        // text.setSelectionStyles({ fontWeight:  `${fontWeight}`}, text.selectionStart,text.selectionEnd );
        // }
    

    function italicizeText() {
        if (canvas.getActiveObject()) {
            var fontFamily = canvas.getActiveObject().fontStyle === 'italic' ? 'normal' : 'italic';
            const text = canvas.getActiveObject();
            // text.setSelectionStyles({ fontWeight: `${fontWeight}` }, text.selectionStart,99 );
            text.set("fontStyle", fontFamily);
            canvas.renderAll();
        }
    }


    //밑줄
    function underlineText() {
        if (canvas.getActiveObject()) {
            var underline = !canvas.getActiveObject().underline;
            const text = canvas.getActiveObject();
            text.set('underline', underline);
            canvas.renderAll();
            // text.set('fontWeight','italic');
            // document.getElementById("bold").style.fontWeight = `${fontWeight}`;
            // text.setSelectionStyles({ underline: underline }, text.selectionStart,99 );
        }
    }
    
    // 정렬 
    function alignText(to) {
        if (canvas.getActiveObject().type === 'textbox') {
            const text = canvas.getActiveObject();
            text.set({ textAlign: `${to}` });
            canvas.renderAll();
        }
    }

    return(
    <>
        <div className="textbox-submenu">
            <button onClick = {addTextBox}>텍스트상자 추가 </button>
            &nbsp; &nbsp;
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
            <button onClick={() => alignText('left')}>
                왼쪽정렬
            </button>
            <button onClick={() => alignText('center')}>
                가운데정렬
            </button>
            <button onClick={() => alignText('right')}>
                오른쪽정렬
            </button>
            &nbsp; &nbsp;
            {/* <input id="color" type="color" onChange={selectColor} /> */}
            <ColorPicker  canvas={canvas} color ={color}/>
        </div>
    </>);
}