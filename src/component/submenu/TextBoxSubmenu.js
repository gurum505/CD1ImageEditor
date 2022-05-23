import { CommentOutlined, UnderlineOutlined } from "@ant-design/icons";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import ColorPicker from "./ColorPicker";
import styles from "../../Layout/LeftSidebar.module.css"

import * as common from "./common"
import {
    AlignLeftOutlinedIcon, UnderlineOutlinedIcon
    , AlignCenterOutlinedIcon, AlignRightOutlinedIcon, HighlightOutlinedIcon
    , BoldOutlinedIcon, ItalicOutlinedIcon, FontSizeOutlinedIcon, LineHeightOutlinedIcon
} from "../icons/icons";

export default function TextBoxSubmenu({ canvas, addLayerItem }) {

    // console.log('textbox메뉴')
    const color = useRef('white');
    const [alignChecked, makeAlignChecked] = useState('left');
    const [boldChecked,makeBoldChecked] =useState("");
    const [italicChecked,makeItalicChecked] =useState("");
    const [underlineChecked, makeUnderlineChecked]=useState("");

    // var fontWeight={"bold":false,"italic":false,"underline":false}; //FIXME: default값을 text객체에서 불러와야함 all false가 아니라
    // const [fontChecked,makeFontChecked] =useState(fontWeight);

    function inputTextInfo(textbox) {
        var info = {
            'fill': textbox.fill,
            'fontStyle': textbox.fontStyle,
            'fontWeight': textbox.fontWeight,
            'textAlign': textbox.textAlign,
            'underline': textbox.underline
        }
    }

    function mouseDownHandler(o) {
        const pointer = canvas.getPointer(o.e);
        var textbox = new fabric.Textbox('내용 입력', {
            width: 250,
            fill: `${color.current}`,
            left: pointer.x - 125,
            top: pointer.y - 20,
            id: ++canvas.objectNum,
            type: 'textbox'
        });
        textbox.on('selected',(e)=>{
            common.setMenu(common.getMenuType('textbox'),canvas,true);
            console.log(e.target)
            if(e.target.fontWeight ==='bold') makeBoldChecked(true)
            else makeBoldChecked(false)

            if(e.target.fontStyle==='italic') makeItalicChecked(true);
            else makeItalicChecked(false)

            if(e.target.underline===true) makeUnderlineChecked(true);
            else makeUnderlineChecked(false)

            makeAlignChecked(e.target.textAlign)

            // if(e.target.)
            
        })
        canvas.add(textbox);
        addLayerItem(canvas, textbox.toDataURL())
        canvas.setActiveObject(textbox)
        common.updateStates(canvas);
        canvas.defaultCursor = 'default';
    }

    function mouseUpHandler() {
        canvas.off('mouse:down', mouseDown);
    }

    var mouseDown;

    function addTextBox() {
        canvas.defaultCursor = 'text';
        canvas.on('mouse:down', mouseDown = (o) => mouseDownHandler(o));
        canvas.on('mouse:up', mouseUpHandler);
    }

    //추후 보완할 점 : 드래그 범위 bold 지정, 커서 위치 문자의 bold 여부에 따라 button 변경
    function makeTextBold() {
        var objects = canvas.getActiveObjects();
        if (objects) {
            objects.forEach((object) => {
                if (object.type === 'textbox') {
                    var fontWeight = object.fontWeight === 'bold' ? 'normal' : 'bold';
                    object.set("fontWeight", fontWeight);
                    console.log(fontWeight)
                    canvas.renderAll();
                    if(fontWeight==='normal') makeBoldChecked(false);
                    else makeBoldChecked(true)
                }
            })
            common.updateStates(canvas)
            // fontWeight["bold"]=!fontWeight["bold"];
            // makeFontChecked(fontWeight);
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
        var objects = canvas.getActiveObjects();
        if (objects) {
            objects.forEach((object) => {
                if (object.type === 'textbox') {
                    var fontFamily = object.fontStyle === 'italic' ? 'normal' : 'italic';
                    object.set("fontStyle", fontFamily);
                    if(fontFamily==='normal') makeItalicChecked(false) ; else makeItalicChecked(true)
                    canvas.renderAll();
                    
                }
            })

            common.updateStates(canvas)
        }
    }


    //밑줄
    function underlineText() {
        if (canvas.getActiveObject()) {
            var objects = canvas.getActiveObjects();
            objects.forEach((object) => {
                if (object.type === 'textbox') {
                    var underline = !object.underline;
                    object.set('underline', underline);
                    makeUnderlineChecked(underline)
                    canvas.renderAll();
                }
            })
            // text.set('fontWeight','italic');
            // document.getElementById("bold").style.fontWeight = `${fontWeight}`;
            // text.setSelectionStyles({ underline: underline }, text.selectionStart,99 );
            common.updateStates(canvas)
            // makeUnderlineChecked(true)
        }
    }

    // 정렬 
    const alignText = (to) => {
        var objects = canvas.getActiveObjects();
        if (objects) {
            objects.forEach((object) => {
                if (object.type === 'textbox') {
                    object.set({ textAlign: `${to}` });
                    canvas.renderAll();
                }
            })
            // console.log("to",to);
            
           makeAlignChecked(to);

            common.updateStates(canvas)
        }
        // console.log(to==="left");
    }





    return (
        <div id='text-menu' className={styles.Submenu}>
            <div className={styles.Title}>Add Text</div>
            <p><FontSizeOutlinedIcon id='add-textbox' onClick={addTextBox} /></p>
            <p><label>font color</label> <ColorPicker canvas={canvas} color={color} /></p>
            <label style={{ marginLeft: "15px" }} >align</label>

            <ul>
                <li>
                    <AlignLeftOutlinedIcon onClick={() => alignText('left')} checked={alignChecked === "left"} />
                </li>
                <li>
                    <AlignCenterOutlinedIcon onClick={() => alignText('center')} checked={alignChecked === "center"} />
                </li>
                <li>
                    <AlignRightOutlinedIcon onClick={() => alignText('right')} checked={alignChecked === "right"} />
                </li>
            </ul>
            <label style={{ marginLeft: "15px" }}>font</label>
            <ul>
                <li>
                    <BoldOutlinedIcon  onClick={makeTextBold} checked={boldChecked} />
                </li>
                <li>
                    <ItalicOutlinedIcon onClick={italicizeText} checked={italicChecked}/>
                </li>
                <li>
                    <UnderlineOutlinedIcon onClick={underlineText} checked={underlineChecked}/>
                </li>
            </ul>
        </div>
    );
}