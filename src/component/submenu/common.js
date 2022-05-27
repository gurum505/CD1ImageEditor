

//캔버스 관련
import { CommentOutlined } from "@ant-design/icons";
import { fabric } from "fabric";
import backgroundImage from '../../img/background.png'
import styles from "./LayerList.module.css";
import { CloseOutlined } from "@ant-design/icons"


//delete , backspace 눌렀을 때 객체 제거 
export function keyDownEvent(canvas, e) {
    if (!canvas.getActiveObject()) return //선택된 객체가 없으면 종료 

    if (canvas.getActiveObject().isEditing) {
        // modifyLayer(canvas.getActiveObject())
    }

    if (e.key === 'Delete' || e.key === 'Backspace') {   // 텍스트 입력 중 backspace눌러도 객체 삭제 되지 않도록 
        if (canvas.getActiveObject().type === 'textbox' && canvas.getActiveObject().isEditing) {
            return;
        }
        var o = canvas.getActiveObjects();
        o.forEach((object) => {
            canvas.remove(object);
            document.getElementById('layer' + object.id).remove();
            // document.getElementById(object.id).remove();
        });

        canvas.discardActiveObject(); // 그룹 삭제 시 빈 sizebox 남아있는 거 제거 
        updateStates(canvas);
    }
}
export function initialComponentSize() { //현재 페이지 구성요소들의 크기 
    var dict = {};
    dict['leftbar'] = document.getElementById('leftbar').offsetWidth;
    dict['rightbar'] = document.getElementById('rightsidebar').offsetWidth;
    dict['titleHeader'] = document.getElementById('title').offsetHeight;
    dict['editorHeader'] = document.getElementById('header').offsetHeight;
    dict['footer'] = document.getElementById('footer').offsetHeight;
    return dict;
}

export function getInnerSize(canvas) { //캔버스가 포함되는 영역의 크기(회색부분)
    var dict = {};

    var component = canvas.componentSize;
    dict['innerWidth'] = window.innerWidth - (component['leftbar'] + component['rightbar']);
    dict['innerHeight'] = window.innerHeight - (component['titleHeader'] + component['editorHeader'] + component['footer']);
    return dict;
}

export function setCanvasCenter(canvas) { //캔버스를 내 가운데에 위치 시키는 함수 
    if (canvas) {

        var inner = getInnerSize(canvas);
        var innerWidth = inner['innerWidth'];
        var innerHeight = inner['innerHeight'];
        var upperCanvas = document.getElementsByClassName('upper-canvas')[0];
        var lowerCanvas = document.getElementsByClassName('lower-canvas')[0];

        var styleWidth = upperCanvas.style.width.substr(0, upperCanvas.style.width.length - 2)
        var styleHeight = upperCanvas.style.height.substr(0, upperCanvas.style.height.length - 2)

        var left = (innerWidth - styleWidth) / 2;
        var top = (innerHeight - styleHeight) / 2;

        // if(top<100) top =100;
        upperCanvas.style.left = left + 'px';
        upperCanvas.style.top = top + 'px';

        lowerCanvas.style.left = left + 'px';
        lowerCanvas.style.top = top + 'px';
    }
}

export function zoom(canvas, ratio) {
    var canvasElem = document.getElementsByTagName('canvas');
    for (var i = 0; i < canvasElem.length; i++) {
        canvasElem[i].style.width = Math.floor(getCanvasStyleWidth() * ratio) + 'px';
        canvasElem[i].style.height = Math.floor(getCanvasStyleHeight() * ratio) + 'px';
    }

    document.getElementById('zoom-info').value = Math.floor(canvas.zoomInfo * 100) + '%'
    setCanvasCenter(canvas);

}

export function initalCanvas(canvas, loadPrevCanvas = false) {
    canvas.set({
        undoStack: [],
        redoStack: [],
    });

    fabric.Image.fromURL(backgroundImage, (img) => {
        img.default = true;
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        });
        canvas.renderAll();
    })

    if (!loadPrevCanvas) {
        canvas.objectNum = 0;
        canvas.set({
            width: 600,
            height: 400,
        })
    }
    canvas.setWidth(600);
    canvas.setHeight(400);
    setCanvasStyleSize(600, 400);
    canvas.zoomInfo = 1;
    document.getElementById('zoom-info').value = '100%'
    setCanvasCenter(canvas);
}

export function getCanvasStyleWidth() {
    var upperCanvas = document.getElementsByClassName('upper-canvas')[0];
    return upperCanvas.style.width.substr(0, upperCanvas.style.width.length - 2);
}
export function getCanvasStyleHeight() {
    var upperCanvas = document.getElementsByClassName('upper-canvas')[0];
    return upperCanvas.style.height.substr(0, upperCanvas.style.height.length - 2);
}
export function setCanvasStyleSize(width, height) {
    var upperCanvas = document.getElementsByClassName('upper-canvas')[0];
    var lowerCanvas = document.getElementsByClassName('lower-canvas')[0];

    upperCanvas.style.width = width + 'px';
    upperCanvas.style.height = height + 'px';
    lowerCanvas.style.width = width + 'px';
    lowerCanvas.style.height = height + 'px';
}

export function fitToProportion(canvas) { // 사진이 다른 컴포넌트를 넘지 않는 선에서 최대한 꽉 차게 비율을 맞춤
    var innerWidth = getInnerSize(canvas)['innerWidth'];
    var innerHeight = getInnerSize(canvas)['innerHeight'];
    canvas.zoomInfo = 1

    if (getCanvasStyleWidth() > innerWidth || getCanvasStyleHeight() > innerHeight) {
        while (1) {
            if (getCanvasStyleWidth() < getInnerSize(canvas)['innerWidth'] && getCanvasStyleHeight() < getInnerSize(canvas)['innerHeight']) break;
            canvas.zoomInfo -= 0.1;
            zoom(canvas, 0.9);
        }
        canvas.zoomInfo -= 0.1;
        zoom(canvas, 0.9);

    }

    if (getCanvasStyleWidth() < innerWidth || getCanvasStyleHeight() < innerHeight) {
        while (1) {
            if (getCanvasStyleWidth() * 1.1 < innerWidth && getCanvasStyleHeight() * 1.1 < innerHeight) {
                zoom(canvas, 1.1);
                canvas.zoomInfo += 0.1;
            }
            else return;
        }
    }
}

export function getRangeState() {
    var list = [];
    var checkbox = {};
    var range = {};
    var button = {};

    if (document.getElementById('filter-list')) {
        var inputNodes = document.getElementById('filter-list').getElementsByTagName('input');
        for (var i = 0; i < inputNodes.length; i++) {
            var id = inputNodes[i].id;
            var isChecked = inputNodes[i].checked;
            var value = inputNodes[i].value;

            if (inputNodes[i].type === 'checkbox') {
                checkbox[id] = isChecked;
            } else if (inputNodes[i].type === 'range') {
                range[id] = value;
            } else {
                button[id] = value;
            }

        }
        list.push(checkbox);
        list.push(range)
        list.push(button);
        return list;
    }

}
export function updateStates(canvas, isCropped = false) {
    canvas.currentWidth = canvas.width;
    canvas.currentHeight = canvas.Height;
    var newFilters = [];
    var newObjects = [];
    var filters = getMainImage(canvas) ? getMainImage(canvas).filters : [];
    var objects = canvas.getObjects();
    if (objects.length > 0)
        for (var j = 0; j < objects.length; j++) {
            // let clonedOject = Object.assign(Object.create(Object.getPrototypeOf(objects[j])), objects[j])
            objects[j].clone((cloned) => { newObjects.push(cloned) }, ['id', 'main', 'cropRect', 'canvasRelativePosition'])
        }

    if (filters) {
        for (var i = 0; i < filters.length; i++) {
            if (!filters[i]) continue;
            else {
                let clonedFilter = Object.assign(Object.create(Object.getPrototypeOf(filters[i])), filters[i])
                newFilters[i] = clonedFilter;
            }
        }
    }
    canvas.undoStack.push({ 'objects': newObjects, 'filters': newFilters, 'filterRangeState': getRangeState(), 'isCropped': isCropped, 'initialWidth': canvas.initialWidth, 'initialHeight': canvas.initialHeight, 'image': getMainImage(canvas) });
}



//객체 관련 

export function getMenuType(object) { //해당 객체의 type을 바탕으로 어떤 메뉴 창을 띄울 것인지 메뉴 이름을 반환 
    const figureList = ['rect', 'triangle', 'image', 'circle'];
    const lineList = ['line'];
    if (object === 'figure') return 'figure-menu'
    if (figureList.includes(object.type)) return 'figure-menu';
    else if (lineList.includes(object.type)) return 'line-menu';
    else if (object.type === 'textbox') return 'text-menu';
    else return ('');
}
export function getMainImage(canvas) { //필터할 이미지 반환 
    var result = null;
    if (!canvas) return;
    var objects = canvas.getObjects();
    for (var i = 0; i < objects.length; i++) {
        if (objects[i].main === true) {
            result = objects[i];
        }
    }
    return result
}

export function getActiveObjectsByType(canvas, objectType) {
    var results = []
    var objects = canvas.getObjects();
    objects.forEach((object) => {
        if (object.type === objectType) results.push(object);
    })
    return results;
}

//캔버스 위의 모든 객체, 레이어 제거 
export function removeAllObjects(canvas, clear = false) {  //clear = true일 때 main Image까지 제거 
    var objects = canvas.getObjects();
    objects.forEach((object) => {
        if (!object.main || clear)
            canvas.remove(object); // 캔버스 위의 객체 제거

        try {
            if (!object.main)
                document.getElementById('layer' + object.id).remove(); // 레이어 제거
        } catch (e) {
        }
    })
}


//모든 레이어 제거 
export function removeAllLayer(canvas) {
    var prevObjects = canvas.getObjects();
    prevObjects.forEach((object) => {
        try {
            document.getElementById('layer' + object.id).remove();
        } catch (e) {
        }
    })
}


// 활성화(선택) 되어 있는 layer 빨간색으로 표시 
export function colorActiveLayer(canvas) {
    //FIXME:모든 objectNum을 돌기 때문에 + 매 클릭마다 === 성능걱정이 좀 됌
    for (let i = 1; i <= canvas.objectNum; i++) {
        let layerElement = document.getElementById('layer-list');
        layerElement.childNodes.forEach(child => child.style.borderColor = '#666565')


        // console.log("layerElement:",layerElements);
        // if (layerElement)
        // layerElement.style.border = 'solid 2px gray';
    }
    var objects = canvas.getActiveObjects();
    objects.forEach((object) => {
        if (document.getElementById('layer' + object.id))
            document.getElementById('layer' + object.id).style.border = 'solid 2px white'
    })

}

export function modifyLayer(object) {
    if (object.cropRect) return;
    var layer = document.getElementById('layer' + object.id);
    // var layer = document.getElementById('rightsidebar-item-scroll');
    var img = layer.querySelector('img');
    var src;
    try {
        src = object.toDataURL();
    } catch (e) {
        src = object.src;
    }
    img.src = src;
}

var flag = false;

function dragStart(e) {
    var index = e.target.index()
    e.dataTransfer.setData('text/plain', index)
}

function dropped(e) {
    cancelDefault(e)

    // get new and old index
    let oldIndex = e.dataTransfer.getData('text/plain')
    let target = (e.target)
    let newIndex = target.index()

    // remove dropped items at old place
    let dropped = e.target.parent().children().eq(oldIndex).remove()

    // insert the dropped items at new place
    if (newIndex < oldIndex) {
        target.before(dropped)
    } else {
        target.after(dropped)
    }
}

function cancelDefault(e) {
    e.preventDefault()
    e.stopPropagation()
    return false
}

var dragged = null;

export function addLayer(canvas, object) {  //레이어에 객체 추가 
    if (object.main || object.type === 'path') return;
    if (document.getElementById(object.id)) return;


    var imgTag = document.createElement('img');
    imgTag.className = `${styles.Img}`
    imgTag.crossOrigin = 'anonymous' //img속성1
    var src;
    // src = object.toDataURL()
    // console.log(object)
    try {
        src = object.toDataURL();
    } catch (e) {
        src = object.getSrc();
    }
    // img속성2
    imgTag.src = src;
    // imgTag.margin = 0;
    // imgTag.padding = 0;
    // imgTag.style.objectFit = 'contain';
    // imgTag.style.width = '80px';
    // imgTag.style.height = '50px'

    // imgTag.onclick = () => {
    //     console.log("ㅋㅋ")
    //     if(canvas.getActiveObject()===object) canvas.discardActiveObject(object);
    //     else canvas.setActiveObject(object);
    //     console.log(canvas.getActiveObjects())
    //     canvas.renderAll();
    // }
    const div = document.createElement('div');
    div.id = 'layer' + object.id;
    div.className = `${styles.Item} draggable`
    // div.className = "draggable"
    div.draggable = true;
    // div.style.textAlign = 'center'
    // div.style.height = '80px'
    // div.style.width = '110px';
    // div.style.backgroundColor = 'gray'

    // const el = document.getElementById('rightsidebar-item-scroll')
    const el = document.getElementById('layer-list')
    // el.className = `${styles.ItemContent}`
    // const objectBtn = document.createElement('button');
    // objectBtn.innerHTML = 'select'
    // objectBtn.className = `${styles.Item}`
    div.onclick = (e) => {
        if (flag) {
            flag = false;
            return;
        }
        if (canvas.getActiveObject() === object) {
            canvas.discardActiveObject(object);
        }
        else {
            canvas.setActiveObject(object);
        }
        canvas.renderAll();
    }
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'delete';
    deleteBtn.className = 'delete-btn';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'primary'
    closeBtn.className = `${styles.ItemButton}`
    closeBtn.innerHTML = "X"

    closeBtn.onclick = () => {
        flag = true;
        canvas.remove(object);
        document.getElementById('layer' + object.id).remove();
        updateStates(canvas);
    }

    //https://code-boxx.com/drag-drop-sortable-list-javascript/

    div.appendChild(imgTag)
    div.appendChild(closeBtn)
    el.insertBefore(div, el.firstChild);  //스택처럼 쌓이게 (최근 것이 위로)  
    div.addEventListener('dragstart', (e) => {
        div.classList.add(`${styles.Dragging}`)
        dragged = div;
    });
    div.addEventListener('dragend', (e) => {
        div.classList.remove(`${styles.Dragging}`)
    })

    div.addEventListener('dragover', function (e) {
        e.preventDefault();
    })

    div.addEventListener('drop', function (e) {
        e.preventDefault();
        if (dragged != e.target) {
            let all = document.getElementById("layer-list").childNodes,
                draggedpos = 0, droppedpos = 0;

            for (let it = 0; it < all.length; it++) {
                if (dragged == all[it]) draggedpos = it;
                if (e.target == all[it]) droppedpos = it;
            }

            // div.parentNode.insertBefore(dragged,div);
            var dragobject
            var dropobject;
            var droppedIndex;
            var id = e.target.id.substr(5)

            var objects = canvas.getObjects();
            objects.forEach((obj)=>{
                if(obj.id === parseInt(dragged.id.substr(5))) dragobject = obj;
                if(obj.id === parseInt(id)) dropobject =obj;
            })

            canvas.discardActiveObject()
            if (draggedpos < droppedpos) {
                div.parentNode.insertBefore(dragged, div.nextSibling);
                droppedIndex = dropobject.getZIndex();                
                canvas.moveTo(dragobject,droppedIndex)


            } else {
                div.parentNode.insertBefore(dragged, div)
                droppedIndex = dropobject.getZIndex();
                canvas.moveTo(dragobject,droppedIndex)
                
            }
            canvas.renderAll()

        }
    })

    return src;
}

// figure 관련 


const figureList = ['triangle', 'rect', 'circle', 'image'];
const lineList = ['path', 'line'];


export function mouseEventOff(canvas) {
    canvas.off('mouse:down');
    canvas.off('mouse:up');
    canvas.off('mouse:move');
    canvas.off('mouse:down:before')
    canvas.off('mouse:up:before')
}


export function inputFigureInfo(object) { // figure-width, figure-height id를 갖는 input 영역에 도형의 크기 정보 입력  
    if (!object) {
        document.getElementById('figure-width').value = '';
        document.getElementById('figure-height').value = '';
        // document.getElementById('color').?;
        // deactivateInput();
    }
    else {
        document.getElementById('figure-width').value = Math.round(object.getScaledWidth());
        document.getElementById('figure-height').value = Math.round(object.getScaledHeight());
        document.getElementById('color').value = object.fill;
    }
}


export function inputTextInfo(textbox) {

    document.getElementById('color').value = textbox.fill;
    if (textbox.fontWeight === 'bold') document.querySelector('[aria-label="bold"]').style.background = 'white'
    else document.querySelector('[aria-label="bold"]').style.background = '#161616'

    if (textbox.fontStyle === 'italic') document.querySelector('[aria-label="italic"]').style.background = 'white'
    else document.querySelector('[aria-label="italic"]').style.background = '#161616'

    if (textbox.underline === true) document.querySelector('[aria-label="underline"]').style.background = 'white'
    else document.querySelector('[aria-label="underline"]').style.background = '#161616'

    document.querySelector('[aria-label="align-left"]').style.background = '#161616'
    document.querySelector('[aria-label="align-center"]').style.background = '#161616'
    document.querySelector('[aria-label="align-right"]').style.background = '#161616'
    if (textbox.textAlign === 'left') document.querySelector('[aria-label="align-left"]').style.background = 'white'
    else if (textbox.textAlign === 'center') document.querySelector('[aria-label="align-center"]').style.background = 'white'
    else if (textbox.textAlign === 'right') document.querySelector('[aria-label="align-right"]').style.background = 'white'

}

export function inputObjectInfo(object) {
    if (figureList.includes(object.type)) inputFigureInfo(object);
    else if (lineList.includes(object.type)) { }
    else if (object.type === 'textbox') inputTextInfo(object);
}


export function setMenu(type, canvas, canvasEvent = false) {
    if (type === '') return;
    if (!canvasEvent) {
        mouseEventOff(canvas);
        canvas.isDrawingMode = false;
    }
    canvas.defaultCursor = 'default';

    var display = document.getElementById(type).style.display;

    if (display === 'block' && !canvasEvent) {
        document.getElementById(type).style.display = '';
        canvas.componentSize['leftbar'] = 48;
    }
    else {
        var nodes = document.getElementById('submenu').childNodes;
        nodes.forEach(node => node.style.display = '');
        document.getElementById(type).style.display = 'block'
        canvas.componentSize['leftbar'] = 248;

        if (getCanvasStyleWidth() > getInnerSize(canvas)['innerWidth']) fitToProportion(canvas);
    }
    setCanvasCenter(canvas);
}