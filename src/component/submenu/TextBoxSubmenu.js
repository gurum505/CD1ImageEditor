import { CommentOutlined, UnderlineOutlined } from "@ant-design/icons";
import { fabric } from "fabric";
import {  useEffect, useRef } from "react";
import ColorPicker from "./ColorPicker";
import * as common from "./common"
import {AlignLeftOutlinedIcon,UnderlineOutlinedIcon
    , AlignCenterOutlinedIcon, AlignRightOutlinedIcon, HighlightOutlinedIcon
    , BoldOutlinedIcon, ItalicOutlinedIcon, FontSizeOutlinedIcon, LineHeightOutlinedIcon}from "../icons/icons";

export default function TextBoxSubmenu(props) {
    // console.log('textbox메뉴')
    const canvas = props.canvas;
    const color = useRef('white');
    canvas.isDrawingMode =false;
    useEffect(()=>{
        canvas.off('mouse:down');
        canvas.defaultCursor = 'default';
    })

    function addTextBox() {
        // document.getElementById('add-textbox').disabled =true;
        canvas.defaultCursor = 'text';
        canvas.on('mouse:down', (o) => {
            const pointer = canvas.getPointer(o.e);
            addTextBox();
            var textbox = new fabric.Textbox('내용 입력', {
                width: 250,
                fill: `${color.current}`,
                left: pointer.x - 125,
                top: pointer.y - 20,
                id : ++canvas.objectNum,
                type:'textbox'
            });
            canvas.add(textbox);
            // document.getElementById('add-textbox').disabled =false;
            common.updateStates(canvas);
            common.addLayer(canvas,textbox);
            canvas.off('mouse:down');
            canvas.defaultCursor = 'default';

        });
    }

    //추후 보완할 점 : 드래그 범위 bold 지정, 커서 위치 문자의 bold 여부에 따라 button 변경
    function makeTextBold() {
        var objects = canvas.getActiveObjects();
        objects.forEach((object)=>{
            if(object.type==='textbox'){
                var fontWeight = object.fontWeight === 'bold' ? 'normal' : 'bold';    
                object.set("fontWeight", fontWeight);
                canvas.renderAll();
            }
        })
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
        var objects = canvas.getActiveObjects();
        objects.forEach((object)=>{
            if(object.type==='textbox'){
                var fontFamily = object.fontStyle ==='italic' ? 'normal' : 'italic';
                object.set("fontStyle", fontFamily);
                canvas.renderAll();
            }
        })
    }


    //밑줄
    function underlineText() {
        if (canvas.getActiveObject()) {
            var objects = canvas.getActiveObjects();
            objects.forEach((object)=>{
                if(object.type==='textbox'){
                    var underline = !object.underline;
                    object.set('underline', underline);
                    canvas.renderAll();
                }
            })
            // text.set('fontWeight','italic');
            // document.getElementById("bold").style.fontWeight = `${fontWeight}`;
            // text.setSelectionStyles({ underline: underline }, text.selectionStart,99 );
        }
    }
    
    // 정렬 
    function alignText(to) {
        var objects = canvas.getActiveObjects();
        objects.forEach((object)=>{
            if(object.type==='textbox'){
                object.set({ textAlign: `${to}` });
                canvas.renderAll();
            }
        })
    }

    
    return(
    <>
        <div className="textbox-submenu">
            
            <p><FontSizeOutlinedIcon id='add-textbox' onClick={addTextBox} /></p>
            <p><label>font color</label> <ColorPicker canvas={canvas} color={color}/></p> 
            <label style ={{marginLeft:"15px"}} >align</label>

            <ul>
                <li>
                    <AlignLeftOutlinedIcon onClick={() => alignText('left')}/>
                </li>
                <li>
                    <AlignCenterOutlinedIcon onClick={() => alignText('center')}/>
                </li>
                <li>
                    <AlignRightOutlinedIcon onClick={() => alignText('right')}/>
                </li>
            </ul>
            <label style={{marginLeft:"15px"}}>font</label>
            <ul>
                <li>
                    <BoldOutlinedIcon onClick={makeTextBold}/>
                </li>
                <li>
                    <ItalicOutlinedIcon onClick={italicizeText}/>
                </li>
                <li>
                    <UnderlineOutlinedIcon onClick={underlineText}/>
                </li>
            </ul>         
        </div>
    </>);
}