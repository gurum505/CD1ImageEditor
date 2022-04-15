

//캔버스 관련

import { CommentOutlined } from "@ant-design/icons";
import { fabric } from "fabric";

export function initialComponentSize(){ //현재 페이지 구성요소들의 크기 

    var dict ={};
    dict['leftbar']= document.getElementsByClassName('leftbar')[0].offsetWidth;
    dict['rightbar'] = document.getElementsByClassName('RightSidebar_container__L2Lbe')[0].offsetWidth;
    dict['titleHeader']=document.getElementsByClassName('Title_contents__NSiUr')[0].offsetHeight;
    dict['editorHeader'] = document.getElementsByClassName('Header_editorHeader__6Q4uw')[0].offsetHeight;
    dict['footer']=document.getElementsByClassName('Footbar_contents__zIqCh')[0].offsetHeight;

    return dict;
}

export function getInnerSize(canvas){ //캔버스가 포함되는 영역의 크기(회색부분)
    var dict ={};

    var component = canvas.componentSize;
    dict['innerWidth'] = window.innerWidth - (component['leftbar']+component['rightbar']);
    dict['innerHeight'] = window.innerHeight - (component['titleHeader']+component['editorHeader']+component['footer']);
    return dict;
}   

export function setCanvasCenter(canvas) { //캔버스를 내 가운데에 위치 시키는 함수 
    if(canvas){
        var inner = getInnerSize(canvas);
        var innerWidth=  inner['innerWidth'];
        var innerHeight = inner['innerHeight'];

        var upperCanvas = document.getElementsByClassName('upper-canvas')[0];
        var lowerCanvas = document.getElementsByClassName('lower-canvas')[0];
        

        var styleWidth = upperCanvas.style.width.substr(0, upperCanvas.style.width.length-2)
        var styleHeight = upperCanvas.style.height.substr(0, upperCanvas.style.height.length-2)


        var left = (innerWidth-styleWidth)/2;
        var top = (innerHeight-styleHeight)/2
        ;

        // if(top<100) top =100;
        upperCanvas.style.left = left+'px';
        upperCanvas.style.top = top+'px';

        lowerCanvas.style.left = left+'px';
        lowerCanvas.style.top = top+'px';

    }
}

export function zoom(canvas,ratio){
    var canvasElem = document.getElementsByTagName('canvas');
    for (var i =0; i<canvasElem.length; i++){
        canvasElem[i].style.width = getCanvasStyleWidth() * ratio + 'px';
        canvasElem[i].style.height = getCanvasStyleHeight()* ratio+ 'px';
    }

    setCanvasCenter(canvas);
}

export function initalCanvas(canvas,loadPrevCanvas=false){
    canvas.set({
        backgroundImage:null,
        backgroundColor:'white',
        undoStack:[],
        redoStack:[],
        filterValues:'',
        initialWidth:600,
        initialHeight:400,
    });

    if(!loadPrevCanvas) canvas.objectNum =0;  
    canvas.setWidth(600);
    canvas.setHeight(400);
    setCanvasStyleSize(600,400);
    setCanvasCenter(canvas);
}

export function getCanvasStyleWidth(){
    var upperCanvas = document.getElementsByClassName('upper-canvas')[0];
    return upperCanvas.style.width.substr(0,upperCanvas.style.width.length-2);
}
export function getCanvasStyleHeight(){
    var upperCanvas = document.getElementsByClassName('upper-canvas')[0];
    return upperCanvas.style.height.substr(0,upperCanvas.style.height.length-2);
}
export function setCanvasStyleSize(width,height){
    var upperCanvas = document.getElementsByClassName('upper-canvas')[0];
    var lowerCanvas = document.getElementsByClassName('lower-canvas')[0];

    upperCanvas.style.width = width+'px';
    upperCanvas.style.height = height+'px';
    lowerCanvas.style.width = width+'px';
    lowerCanvas.style.height = height+'px';
}

export function fitToProportion(canvas){ // 사진이 다른 컴포넌트를 넘지 않는 선에서 최대한 꽉 차게 비율을 맞춤
    var innerWidth = getInnerSize(canvas)['innerWidth'];
    var innerHeight = getInnerSize(canvas)['innerHeight'];
    
    if(getCanvasStyleWidth()>innerWidth || getCanvasStyleHeight()>innerHeight){
        while(1){
            if(getCanvasStyleWidth()<getInnerSize(canvas)['innerWidth'] && getCanvasStyleHeight()<getInnerSize(canvas)['innerWidth']) break;
           zoom(canvas,0.9);
        }
        zoom(canvas,0.9);

    }
    
    if(getCanvasStyleWidth()<innerWidth || getCanvasStyleHeight()<innerHeight){
    while(1){
        if(getCanvasStyleWidth()*1.1<innerWidth && getCanvasStyleHeight()*1.1<innerHeight)
        zoom(canvas,1.1);
        else return ;
    }
    

}
}

export function updateStates(canvas){
    canvas.currentWidth = canvas.width;
    canvas.currentHeight = canvas.Height;
    var json = canvas.toDatalessJSON(['undoStack','redoStack','initialWidth', 'initialHeight', 'objectNum', 'id','filterValues','recentStyleSize']);
    canvas.undoStack.push(json);

}



//객체 관련 

//캔버스 위의 모든 객체, 레이어 제거 
export function removeAllObjects(canvas){
    var objects = canvas.getObjects();
    objects.forEach((object)=>{
        canvas.remove(object); // 캔버스 위의 객체 제거
        
        try{
        document.getElementById(object.id).remove(); // 레이어 제거
        }catch(e){
            console.log('path');
        } 
    })
}


//모든 레이어 제거 
export  function removeAllLayer(canvas) {
    var prevObjects = canvas.getObjects(); 
    prevObjects.forEach((object) => {
        try {
            document.getElementById(object.id).remove();
        } catch (e) {
        }
    })
}


// 활성화(선택) 되어 있는 layer 빨간색으로 표시 
export function colorActiveLayer(canvas) {   
    
    var layerElements = document.getElementById('layer');
    for (let i = 0; i < layerElements.children.length; i++) {
        layerElements.children[i].style.border = 'solid gray';
    }
    var objects = canvas.getActiveObjects();
    objects.forEach((object) => {
        if (document.getElementById(object.id))
            document.getElementById(object.id).style.border = 'solid blue'
    })

}


export function addLayer(canvas, object) {  //레이어에 객체 추가 
    const layerCanvas = new fabric.Canvas();
    layerCanvas.setWidth(canvas.width);
    layerCanvas.setHeight(canvas.height);
    layerCanvas.backgroundColor='red';
    console.log(layerCanvas)
    var circle = new fabric.Rect({
        width:50,
        height:50,
        fill:'blue'
    })

    var imgTag = document.createElement('img');
    imgTag.crossOrigin='anonymous';
    object.crossOrigin='Anonymous'
    var src;
    try{
    src = object.toDataURL();
    }catch(e){
        src= object.src;
    }
    imgTag.src = src;
    imgTag.margin = 0;
    imgTag.padding =0;
    imgTag.style.objectFit ='contain';
    imgTag.style.width = '80px';
    imgTag.style.height ='50px'
    // fabric.Image.fromURL(layerCanvas.toDataURL(), img => {
    //     canvas.add(img)
    //     img.scaleToWidth(50);
    //     img.scaleToHeight(50);
    //     var img_div =document.createElement('div');
    //     img_div.innerHTML='ddd'
    //     let url = img.toDataURL();
    //     img_div.style.backgroundImage = 'url(' + test+')';
    //     // var el= document.getElementsByClassName('RightSidebar_addItem__ltY2N')[0];
    //     var el = document.getElementById('layer')
    //     el.appendChild(img_div)
    // });
    const div = document.createElement('div');
    div.id = object.id;
    div.className='layer-list'
    div.style.textAlign='center'
    div.style.border = ' solid #0000FF';
    div.style.height = '80px'
    div.style.width = '110px';
    const el = document.getElementById('layer');

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => {
        canvas.remove(object);
        document.getElementById(object.id).remove();
        updateStates(canvas);
    }

    const objectBtn = document.createElement('button');
    objectBtn.innerHTML = 'select'
    objectBtn.className = "layer-object";
    objectBtn.onclick = () => {
        console.log(object)
        canvas.setActiveObject(object);
        canvas.renderAll();
    }
    
    div.appendChild(imgTag)
    div.appendChild(objectBtn);
    div.appendChild(deleteBtn);
    el.insertBefore(div, el.firstChild);  //스택처럼 쌓이게 (최근 것이 위로)   
}


