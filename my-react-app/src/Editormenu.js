import { useEffect, useState } from "react";
import Submenu from "./component/Submenu";
import DefaultMenu from "./component/submenu/DefaultSubmenu";
import './editor.css';

export default function EditorMenu(props) {
    const canvas = props.canvas;
    console.log(canvas);
    const stateRef = props.stateRef;
    const [buttonType, setButtonType] = useState("");  //어떤 종류의 object를 추가할 것인지 
    canvas.isDrawingMode = false;
    canvas.defaultCursor = 'default'; //커서 모양 기본 
    // canvas.selection = true; //객체 드래그로 만들 때 파란창 다시 뜨도록 (+ 객체 드래그 선택 가능하게)

    if (props.imageRef.current === true){
        props.imageRef.current = false;
        setButtonType('');
    }

    function updateModifications(savehistory) {
        if (savehistory === true) {
            var myjson = canvas.toDatalessJSON(['width', 'height','id','filterListState']);
            stateRef.current.push(myjson);
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

        var objects = canvas.getObjects();
        try {
            objects.forEach((object) => {
                if (object.cropRect) canvas.remove(object);
            })
        } catch (e) { }

        if (stateRef.current.length === 0) {
            updateModifications(true);
        }

        const figure = ['rect', 'circle', 'triangle'];
        const line = ['line', 'path'];
        document.getElementById('remove-object').disabled = true;
        var selectType;

        if (buttonType !== 'crop')
            canvas.on({
                'selection:updated': () => {

                    if (!canvas.getActiveObject().cropRect === true) {//update 된 객체가 crop rect 라면 렌더링되지 않게 함 
                        console.log('selection:updated');
                        document.getElementById('remove-object').disabled = false
                        selectType = canvas.getActiveObject().type;
                        if (figure.includes(selectType)) setButtonType('figure');
                        else if (line.includes(selectType)) setButtonType('line');
                        else if (selectType === 'image') setButtonType('image');
                        else if (selectType === 'textbox') setButtonType('textbox');
                        colorActiveLayer();
                    }
                },
                'object:removed': () => {
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
                'object:modified': () => {
                    console.log('object:modified');
                    // document.getElementById('remove-object').disabled = false
                },
                'object:updated': () => {
                    console.log('object:updated');
                    document.getElementById('remove-object').disabled = false
                },

            });
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
    }

    function removeObject() { //객체 삭제
        var o = canvas.getActiveObjects();
        o.forEach((object) => {
            canvas.remove(object);
            document.getElementById(object.id).remove();
        });
        canvas.discardActiveObject(); // 그룹 삭제 시 빈 sizebox 남아있는 거 제거 
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
            <Submenu canvas={props.canvas} setCanvas={props.setCanvas} setButtonType={setButtonType} buttonType={buttonType} stateRef={props.stateRef} objectNumRef={props.objectNumRef} />
            <button id='add-figure' onClick={addFigure}  >도형 삽입</button>
            <button id='path' onClick={addLine} >그리기</button>
            <button id='textbox' onClick={addTextBox} >텍스트 박스</button>
            <button id='add-image' onClick={addImage} >이미지 추가</button>
            <button id='filter' onClick={addFilter} >필터</button>
            <button id='crop' onClick={cropImage}>자르기</button>
            <button id='remove-object' onClick={removeObject} >객체 삭제</button>
            <DefaultMenu canvas={props.canvas} />
        </div>
    )
}
