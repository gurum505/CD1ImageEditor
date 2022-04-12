

//캔버스 관련


export function getInnerSize(){
    var dict= {}
    dict['innerWidth'] = window.innerWidth-180;
    dict['innerHeight'] = window.innerHeight-180;

    return dict; 
}   
export function initalCanvas(canvas){
    canvas.set({
        backgroundColor:'white',
        states:[],
        undoStack:[],
        redoStack:[],
        mods:0,
        filterValues:'',
        objectNum:0,
    });
    canvas.setZoom(1);
}

export function setCanvasCenter(canvas) { //캔버스를 내 가운데에 위치 시키는 함수 
    if(canvas){

        var innerWidth= getInnerSize()['innerWidth'];
        var innerHeight =getInnerSize()['innerHeight']

        var upperCanvas = document.getElementsByClassName('upper-canvas')[0];
        var lowerCanvas = document.getElementsByClassName('lower-canvas')[0];
        

        var styleWidth = upperCanvas.style.width.substr(0, upperCanvas.style.width.length-2)
        var styleHeight = upperCanvas.style.height.substr(0, upperCanvas.style.height.length-2)

        var left = (innerWidth-styleWidth)/2;
        var top = (innerHeight-styleHeight)/2+60;

        if(top<100) top=100;
        upperCanvas.style.left = left+'px';
        upperCanvas.style.top = top+'px';

        lowerCanvas.style.left = left+'px';
        lowerCanvas.style.top = top+'px';

    }
}

export function updateStates(canvas){
    canvas.currentWidth = canvas.width;
    canvas.currentHeight = canvas.Height;
    var json = canvas.toDatalessJSON(['undoStack','redoStack','initialWidth', 'initialHeight', 'objectNum', 'id','filterValues']);
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
        layerElements.children[i].style.border = 'solid blue';
    }
    var objects = canvas.getActiveObjects();
    objects.forEach((object) => {
        if (document.getElementById(object.id))
            document.getElementById(object.id).style.border = 'solid red'
    })

}


// 객체 생성될 때 레이어 추가 
export function addLayer(canvas, object) {  //레이어에 객체 추가 
    console.log(object.type)
      
    const div = document.createElement('div');
    div.id = object.id;
    div.style.border = ' solid #0000FF';
    div.style.width = '130px';
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
    objectBtn.innerHTML = object.type;
    objectBtn.className = "layer-object";
    objectBtn.onclick = () => {
        canvas.setActiveObject(object);
        canvas.renderAll();
    }

    div.appendChild(objectBtn);
    div.appendChild(deleteBtn);
    el.insertBefore(div, el.firstChild);  //스택처럼 쌓이게 (최근 것이 위로)   
}


