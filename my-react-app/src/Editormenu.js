import { useEffect, useState } from "react";
import Submenu from "./component/Submenu";
import DefaultMenu from "./component/submenu/DefaultSubmenu";
import './editor.css';

export default function EditorMenu(props) {
    const canvas = props.canvasRef.current;
    const state = props.stateRef.current;
    const [buttonType, setButtonType] = useState("");  //어떤 종류의 object를 추가할 것인지 

    canvas.isDrawingMode = false;
<<<<<<< HEAD
    canvas.defaultCursor = 'default'; //커서 모양 기본 
    // canvas.selection = true; //객체 드래그로 만들 때 파란창 다시 뜨도록 (+ 객체 드래그 선택 가능하게)
=======
>>>>>>> c4cfd110b1ad5318633520429bf69d0af9551a90

    function updateModifications(savehistory) {
        if (savehistory === true) {
            var myjson = canvas.toDatalessJSON(['width', 'height']);
            state.push(myjson);
        }
    }


    function colorActiveLayer() {
        var layerElements = document.getElementById('layer');
        for (let i = 0; i < layerElements.children.length; i++) {
            layerElements.children[i].style.border = 'solid blue';
        }
        var objects = canvas.getActiveObjects();
        objects.forEach((object) => {
            if (document.getElementById(object.id))
                document.getElementById(object.id).style.border = 'solid red'
        })
    }

    useEffect(() => {
        var json = JSON.stringify(canvas);
        //var blob = new Blob(json, { type: "text/plain;charset=utf-8" });
        //var link = document.createElement('a'); //<a> 생성
        if (state.length === 0) updateModifications(true);


        const figure = ['rect', 'circle', 'triangle'];
        const line = ['line', 'path'];
        document.getElementById('remove-object').disabled = true;
        var selectType;

        // if (buttonType !== 'crop')
        canvas.on({
            'selection:updated': () => {
                console.log('selection:updated');
                document.getElementById('remove-object').disabled = false
                selectType = canvas.getActiveObject().type;
                if (figure.includes(selectType)) setButtonType('figure');
                else if (line.includes(selectType)) setButtonType('line');
                else if (selectType === 'image') setButtonType('image');
                else if (selectType === 'textbox') setButtonType('textbox');
                colorActiveLayer();
            },
            'object:removed':()=>{
                console.log('object:removed');
            },
            'selection:cleared': () => {
                console.log('selection:cleared');
                document.getElementById('remove-object').disabled = true;
                var layerElements = document.getElementById('layer');
                for (let i = 0; i < layerElements.children.length; i++) {
                    layerElements.children[i].style.border = 'solid blue';
                }
            },
            'selection:created': () => {
                console.log('selection:created');
                document.getElementById('remove-object').disabled = false;
                var objects = canvas.getActiveObjects();
                objects.forEach((object) => {
                    if (document.getElementById(object.id))
                        document.getElementById(object.id).style.border = 'solid red'
                })
            },
            'object:added': () => {
                console.log('object:added');
                canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
                selectType = canvas.getActiveObject().type;
                document.getElementById('remove-object').disabled = false;
            },
            'object:updated': () => {
                console.log('object:updated');
                document.getElementById('remove-object').disabled = false
            },

<<<<<<< HEAD
        });
=======
                    document.getElementById('remove-object').disabled = false
                    selectType = canvas.getActiveObject().type;
                    if (figure.includes(selectType)) setButtonType('figure');
                    else if (line.includes(selectType)) setButtonType('line');
                    else if (selectType === 'image') setButtonType('image');
                    else if (selectType === 'textbox') setButtonType('textbox');
                },
                'selection:cleared': () => {
                    console.log('selection:cleared');
                    document.getElementById('remove-object').disabled = true
                },
                'selection:created': () => {
                    console.log('selection:created');

                    document.getElementById('remove-object').disabled = false
                },
                'object:added': () => {
                    console.log('object:added');
                    console.log(canvas.item(canvas.getObjects().length - 1));
                    canvas.setActiveObject(canvas.item(canvas.getObjects().length - 1));
                    selectType = canvas.getActiveObject().type;
                    document.getElementById('remove-object').disabled = false;
                },
                'object:updated': () => {
                    console.log('object:updated');
                    document.getElementById('remove-object').disabled = false

                },
                'object:modified': () => {
                    console.log('object:modified');
                    updateModifications(true);
                },

            });
>>>>>>> c4cfd110b1ad5318633520429bf69d0af9551a90
    });

    function addFigure() { //도형(삼각형, 원, 직사각형) 추가
        if (buttonType === 'figure') setButtonType(''); //현재 열려있는 submenu 가 figure이면 submenu를 닫음
        else setButtonType("figure");
        canvas.off('mouse:down');
        console.log("it works!")
        canvas.isDrawingMode = false; // 그리기 하다가 도형 삽입 클릭시 drawing 모드가 켜져 있으면 도형과 함께 곡선이 그려지는 것을 방지
    }

    function addTextBox() { //텍스트상자 추가
        if (buttonType === 'textbox') setButtonType('');
        else setButtonType("textbox");
        canvas.isDrawingMode = false; // 그리기 하다가 도형 삽입 클릭시 drawing 모드가 켜져 있으면 도형과 함께 곡선이 그려지는 것을 방지
    }

    function addLine() { //그리기 
        if (buttonType === 'line') setButtonType('');
        else setButtonType("line");
        canvas.off('mouse:down');
    }

    function removeObject() { //객체 삭제
        var o = canvas.getActiveObjects();
        o.forEach((object) => {
            canvas.remove(object);
            document.getElementById(object.id).remove();
        });
        canvas.discardActiveObject();
        updateModifications(true);
    }

    //이미지 추가 
    function addImage() {
        if (buttonType === 'image') setButtonType('');
        else setButtonType("image");
        canvas.off('mouse:down');
    }

    function addFilter() {
        if (buttonType === 'filter') setButtonType('');
        else setButtonType("filter");
        canvas.off('mouse:down');
    }

    //이미지 자르기 (crop)
    function cropImage() {
        if (buttonType === 'crop') setButtonType('');
        else setButtonType('crop');
        canvas.off('mouse:down');
    }


    return (
        <div className="editor-menu">
            <Submenu canvasRef={props.canvasRef} setButtonType={setButtonType} buttonType={buttonType} stateRef={props.stateRef} objectNumRef={props.objectNumRef} />
            <button id='add-figure' onClick={addFigure}  >도형 삽입</button>
            <button id='path' onClick={addLine} >그리기</button>
            <button id='textbox' onClick={addTextBox} >텍스트 박스</button>
            <button id='add-image' onClick={addImage} >이미지 추가</button>
            <button id='filter' onClick={addFilter} >필터</button>
            <button id='crop' onClick={cropImage}>자르기</button>
            <button id='remove-object' onClick={removeObject} >객체 삭제</button>
            <DefaultMenu canvas={canvas} />
        </div>
    )
}
