import { CommentOutlined, UnderlineOutlined } from "@ant-design/icons";
import { fabric } from "fabric";
import { useEffect, useRef } from "react";
import ColorPicker from "./ColorPicker";
import styles from "../../Layout/LeftSidebar.module.css"

import * as common from "./common"
import {
    AlignLeftOutlinedIcon, UnderlineOutlinedIcon
    , AlignCenterOutlinedIcon, AlignRightOutlinedIcon, HighlightOutlinedIcon
    , BoldOutlinedIcon, ItalicOutlinedIcon, FontSizeOutlinedIcon, LineHeightOutlinedIcon
} from "../icons/icons";

export default function TextBoxSubmenu({canvas,addLayerItem}) {

    // console.log('textbox메뉴')
    const color = useRef('white');

    function inputTextInfo(textbox) {
        console.log("텍스트정보를 텍스트박스 메뉴에 입력하는 함수 실행")
        var info = {
            'fill':textbox.fill, 
            'fontStyle':textbox.fontStyle,
            'fontWeight':textbox.fontWeight,
            'textAlign':textbox.textAlign,
            'underline':textbox.underline
        }
        console.log(info)
    }

    function mouseDownHandler(o){
        const pointer = canvas.getPointer(o.e);
        var textbox = new fabric.Textbox('내용 입력', {
            width: 250,
            fill: `${color.current}`,
            left: pointer.x - 125,
            top: pointer.y - 20,
            id: ++canvas.objectNum,
            type: 'textbox'
        });
        canvas.add(textbox);
        addLayerItem(canvas,textbox.toDataURL())
        canvas.setActiveObject(textbox)
        common.updateStates(canvas);
        canvas.defaultCursor = 'default';
    }

    function mouseUpHandler(){
        canvas.off('mouse:down',mouseDown);
    }

    var mouseDown;

    function addTextBox() {
        canvas.defaultCursor = 'text';
        canvas.on('mouse:down', mouseDown = (o)=>mouseDownHandler(o));  
        canvas.on('mouse:up',mouseUpHandler);
    }

    //추후 보완할 점 : 드래그 범위 bold 지정, 커서 위치 문자의 bold 여부에 따라 button 변경
    function makeTextBold() {
        var objects = canvas.getActiveObjects();
        objects.forEach((object) => {
            if (object.type === 'textbox') {
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
        objects.forEach((object) => {
            if (object.type === 'textbox') {
                var fontFamily = object.fontStyle === 'italic' ? 'normal' : 'italic';
                object.set("fontStyle", fontFamily);
                canvas.renderAll();
            }
        })
    }


    //밑줄
    function underlineText() {
        if (canvas.getActiveObject()) {
            var objects = canvas.getActiveObjects();
            objects.forEach((object) => {
                if (object.type === 'textbox') {
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
        objects.forEach((object) => {
            if (object.type === 'textbox') {
                object.set({ textAlign: `${to}` });
                canvas.renderAll();
            }
        })
    }


    return (
        <div id='text-menu' className={styles.Submenu}>
            <div className={styles.Title}>Add Text</div>
            <p><FontSizeOutlinedIcon id='add-textbox' onClick={addTextBox} /></p>
            <p><label>font color</label> <ColorPicker canvas={canvas} color={color} /></p>
            <label style={{ marginLeft: "15px" }} >align</label>

            <ul>
                <li>
                    <AlignLeftOutlinedIcon onClick={() => alignText('left')} />
                </li>
                <li>
                    <AlignCenterOutlinedIcon onClick={() => alignText('center')} />
                </li>
                <li>
                    <AlignRightOutlinedIcon onClick={() => alignText('right')} />
                </li>
            </ul>
            <label style={{ marginLeft: "15px" }}>font</label>
            <ul>
                <li>
                    <BoldOutlinedIcon onClick={makeTextBold} />
                </li>
                <li>
                    <ItalicOutlinedIcon onClick={italicizeText} />
                </li>
                <li>
                    <UnderlineOutlinedIcon onClick={underlineText} />
                </li>
            </ul>
        </div>
    );
}