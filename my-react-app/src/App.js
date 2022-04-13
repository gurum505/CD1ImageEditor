import { fabric } from "fabric";
import React, { useState, useEffect, useRef } from "react";

//layout
import styles from './App.module.css';
import Title from './Layout/Title';
import Footbar from './Layout/Footbar';
import LeftSidebar from './Layout/LeftSidebar';
import RightSidebar from './Layout/RightSidebar';

//TODO: 완료후) github: mainpage를 my react app으로 변경, RightSidebar같은 쓸데없는 것들, 주석 다지우기
//TODO: Canvas: 버튼기능구현 layout으로 분배
//TODO: ESLint사용해 정리해보자 https://velog.io/@velopert/eslint-and-prettier-in-react
//TODO: tooltip 예쁘게 https://css-tricks.com/exploring-what-the-details-and-summary-elements-can-do/

//Sidebar:type:radio
//TODO: canvas: CUSTOM CORNERS  https://objectcomputing.com/resources/publications/sett/june-2014-drawing-with-fabricjs
//TODO: sidebar: texticon 하나만 덩그라니 이상함
//TODO: 한글 영어 혼용, 대문자소문자 통일


//canvas
import Header from "./component/Header";
import Editormenu from "./Editormenu";
import Layer from "./component/Layer";
import * as common from "./component/submenu/common"
//TODO: Canvas:이미지 드래그앤 드롭으로 이미지 집어넣기, 복사 붙여넣기로 집어넣기
//TODO: Canvas:객체들고 옮길때 canvas에 중앙선or경계 표시

export default function App(props) {
    const [canvas, setCanvas] = useState(''); //useEffect()후 렌더링 하기 위한 state
    const[image,setImage] = useState(false); //이미지 불러왔을 때 전체 렌더링을 위한 state 
    const imageRef = useRef(false); // 이미지를 불러오면 header에서 setImage()를 통해 렌더링을 시키고, Editor.js에서 imageRef값이 변경 되면 submenu들을 렌더링 함 

    const stateRef = useRef([]); // undo/redo 를 위해 특정 canvas 상태를 저장하는 배열 
    const modsRef = useRef(0); // undo 시작 위치를 결정
    const objectNumRef = useRef(0); // object 에 id값을 주어서 객체 단위로 처리가 가능 
      //렌더링 되어도 동일 참조값을 유지, 값이 바뀌어도 렌더링하지 않음 

  
    useEffect(() => {  //rendering 후 한 번 실행  
        setCanvas(initCanvas());

        // let scale = 1; //canvas를 포함하는 wrap element를 마우스 휠로 zoom in/out 
        // const el = document.querySelector('.wrap');
        // el.addEventListener('wheel', (event)=>{
        //     event.preventDefault();
        //     scale += event.deltaY * -0.001;
        //     // Restrict scale
        //     scale = Math.min(Math.max(.125, scale), 4);
        //     // Apply scale transform
        //     el.style.transform = `scale(${scale})`;

        // });
    
    }, []);

    // let zoom =1;
    const ZOOM_SPEED =0.07 ;


    useEffect(()=>{
        if (canvas) {
            console.log(canvas.width);
            common.updateStates(canvas);
            common.setCanvasCenter(canvas)
            
            canvas.on({
                'mouse:wheel': (opt) => {
                     var delta = opt.e.deltaY;
                    if(delta<0){
                        canvas.zoom+=ZOOM_SPEED;
                    }else{
                        canvas.zoom-=ZOOM_SPEED
                    }

                    console.log(canvas.zoom)
    
                    var canvasElem = document.getElementsByTagName('canvas');
                    for (var i =0; i<canvasElem.length; i++){
                        console.log(canvas.initialWidth);
                        canvasElem[i].style.width = canvas.initialWidth * canvas.zoom + 'px';
                        canvasElem[i].style.height = canvas.initialHeight*canvas.zoom + 'px';
                        
                    }
                    common.setCanvasCenter(canvas);
                
                },
                'object:removed': () => {
                    console.log('object:removed');
                },
                'selection:cleared': () => {
                    console.log('selection:cleared');
                    common.colorActiveLayer(canvas);
                    document.getElementById('remove-object').disabled = true;
                    
                },
                'selection:created': () => {
                    console.log('selection:created');
                    common.colorActiveLayer(canvas);
                    document.getElementById('remove-object').disabled = false;
                },
                'object:added': () => {

                    console.log('object:added');
                    var objects = canvas.getObjects();
                    var object = objects[objects.length-1];
                    if(object.type!=='path'&& object.type!=='selection')
                    canvas.setActiveObject(object);
                    common.colorActiveLayer(canvas);

                    document.getElementById('remove-object').disabled = false;

                },
                'object:modified': () => {
                    console.log('object:modified');
                    common.updateStates(canvas);
                    // document.getElementById('remove-object').disabled = false
                },
                'object:updated': () => {
                    console.log('object:updated');
                    document.getElementById('remove-object').disabled = false
                },
                
            });
           
              window.addEventListener("resize", function(opt) { //브라우저 크기 resize에 따른 이벤트 
                // zoom =1;
            
                var innerWidth= common.getInnerSize()['innerWidth'];
                var innerHeight =common.getInnerSize()['innerHeight']
                var ratio = canvas.width/canvas.height;

                const lowerCanvas = document.getElementsByClassName('lower-canvas')[0];
                const upperCanvas = document.getElementsByClassName('upper-canvas')[0];

                var styleWidth = lowerCanvas.style.width.substr(0, lowerCanvas.style.width.length-2);
                var styleHeight = lowerCanvas.style.height.substr(0, lowerCanvas.style.height.length-2);
                
                if(innerWidth<styleWidth){
                    lowerCanvas.style.width = innerWidth+'px';
                    lowerCanvas.style.height = innerWidth * (1/ratio) + 'px';

                    upperCanvas.style.width = innerWidth+'px';
                    
                    upperCanvas.style.height = innerWidth * (1/ratio) + 'px';
                }else if (innerHeight<styleHeight){
                    console.log(innerHeight)
                    console.log(upperCanvas.style.height)
                    lowerCanvas.style.height = innerHeight+'px';
                    lowerCanvas.style.width = (innerHeight)*ratio+'px';

                    upperCanvas.style.height =  innerHeight+'px';
                    upperCanvas.style.width =  (innerHeight)*ratio+'px';
                }else{
                    if(innerWidth<canvas.width && styleWidth < innerWidth){
                    lowerCanvas.style.width = innerWidth+'px';
                    lowerCanvas.style.height = innerWidth * (1/ratio) + 'px';

                    upperCanvas.style.width = innerWidth+'px';
                    upperCanvas.style.height = innerWidth * (1/ratio) + 'px';
                    }else if (innerHeight<styleHeight && styleHeight<innerHeight){
                        lowerCanvas.style.height = innerHeight;
                        lowerCanvas.style.width = innerHeight*ratio+'px';
    
                        upperCanvas.style.height = innerHeight; 
                        upperCanvas.style.width = innerHeight*ratio+'px';
                    }
                }               

                common.setCanvasCenter(canvas);

        
            });
    
            window.onkeydown = function (e) { // delete, backspace 키로 삭제
                if(!canvas.getActiveObject()) return //선택된 객체가 없으면 종료 
    
                if (e.key === 'Delete' || e.key ==='Backspace') {   // 텍스트 입력 중 backspace눌러도 객체 삭제 되지 않도록 
                    if(canvas.getActiveObject().type==='textbox'&& canvas.getActiveObject().isEditing ){ 
                        console.log(canvas.getActiveObject().editable);
                        return;}
                    var o = canvas.getActiveObjects();
                    o.forEach((object) => {
                        canvas.remove(object);
                        document.getElementById(object.id).remove();
                    });
    
                    canvas.discardActiveObject(); // 그룹 삭제 시 빈 sizebox 남아있는 거 제거 
                    common.updateStates(canvas);
    
                }
            }
        }
    },[canvas])
   

    const initCanvas = () => {
        // var windowWidth= window.innerWidth-50;
        // var windowHeight = window.innerHeight-240;
        // var width, height; 
        // if(windowWidth>windowHeight){
        //         height = windowHeight*0.9;
        //         width =windowWidth*0.8;
        // }else{
        //     width = windowWidth*0.9;
        //     height = height*0.8
        // }
        return (
        new fabric.Canvas('canvas', {
            height: 400,
            width: 600,
            initialWidth: 600,
            initialHeight:400, 
            objectNum : 0,
            undoStack :[],
            redoStack :[],
            filterValues : '',
            backgroundColor: 'white',
            zoom :1
           
        })
    )
    }
       
    return (
        <div className={styles.layout}>
            <Title />
            {canvas&& <LeftSidebar canvas={canvas} stateRef={stateRef} objectNumRef={objectNumRef} />}
            <div  className={styles.center}>
                {canvas && <Header canvas={canvas} imageRef={imageRef} image={image}setImage={setImage}stateRef={stateRef} modsRef={modsRef} objectNumRef={objectNumRef} />}

                {/* center로 통합 필요 */}
                <div className={styles.mainContainer}>
                    <canvas id="canvas" />
                    <Layer canvas={canvas}></Layer>
                    {canvas && <Editormenu canvas={canvas} imageRef={imageRef} />}
                    <div id="layer"></div>
                </div>

                <Footbar />{/*투명하게(or 우선순위를 canvas보다 낮게), zoom component, 전체화면키 전환키 */}
            </div>
            <RightSidebar/>
        </div>
    );
}


//출처
//sidebar
//https://ji-u.tistory.com/22
//https://blogpack.tistory.com/1018
//https://blog.naver.com/maestrois/222188488158
//https://dev.to/franciscomendes10866/how-to-create-a-sidebar-in-react-3dh6
//using only html css 
//https://www.w3schools.com/howto/howto_js_collapse_sidebar.asp
//https://stackoverflow.com/questions/30574902/collapsible-flexible-width-sidebar-using-only-css
//layer
//https://d2.naver.com/helloworld/8540176
//https://cocook.tistory.com/137 -이미지 중앙
//https://parra.tistory.com/entry/CSS-transform%EC%9C%BC%EB%A1%9C-zoom-%ED%9A%A8%EA%B3%BC-%EB%82%B4%EA%B8%B0
//https://codesandbox.io/s/wonderful-cerf-69doe?file=/src/App.js:563-672
//rightsidebar
//https://velog.io/@fltxld3/React-%EB%B0%B0%EC%97%B4-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-List-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%A1%B0%ED%9A%8C
//
