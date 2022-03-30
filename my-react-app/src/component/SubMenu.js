import { useEffect } from 'react';
import FigureSubMenu from './SubMenu/FigureSubMenu';
import ImageSubMenu from './SubMenu/ImageSubMenu';
import PathSubMenu from './SubMenu/PathSubMenu';
import TextBoxSubMenu from './SubMenu/TextBoxSubMenu';

export default function SubMenu(props) {
    
        function changeObjectType() { //객체 타입 전환 
        if (canvas.getActiveObject().type === "rect" || canvas.getActiveObject().type === "triangle" || canvas.getActiveObject().type === "circle")
            props.setObjectType("figure");
        else if (canvas.getActiveObject().type === "path") props.setObjectType("path");
        else if (canvas.getActiveObject().type === "textbox") props.setObjectType("textbox");
        else if (canvas.getActiveObject().type === "image") props.setObjectType("image");
        props.setBtnDisabled(false);
        // document.onkeydown = function (e) { // delete, backspace 키로 삭제
        //     {
        //         if (e.key === "Delete" || e.key === "Backspace")
        //             canvas.remove(canvas.getActiveObject());
        //     }
        // }    
    }

    const canvas = props.canvas;
    const objectType = props.objectType;
    const isAddingTextbox = props.isAddingTextbox;

    canvas.on({
        'selection:updated': () => {
            changeObjectType();
            console.log('selection:updated');
        },
        'selection:created': () => {
            changeObjectType();

            console.log('selection:created');
        }
        ,
        'object:removed': () => {
            console.log('object : removed');
            props.setBtnDisabled(true);
        },
        'selection:cleared': () => {
            console.log('selection : cleared'); 
            props.setBtnDisabled(true);
            props.setIsCleared(true);
        },
        'object:added': () => {
            console.log('object : added');
        }

    });

    return (
        <div className="sub-menu">
            {(objectType === 'figure' || objectType === '') && <FigureSubMenu canvas={canvas} />}
            {(objectType === 'image') && <ImageSubMenu canvas={canvas} />}
            {(objectType === 'path') && <PathSubMenu canvas={canvas} />}
            {(objectType === 'textbox') && <TextBoxSubMenu canvas={canvas} setIsAddingTextbox={props.setIsAddingTextbox} isAddingTextbox={isAddingTextbox} />}
        </div>
    );
}