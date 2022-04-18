import { fabric } from "fabric";
import React, { useState, useEffect, useRef } from "react";
import backgroundImage from './img/background.png'
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
//TODO: point색 사용해서 3색으로 정리

//Sidebar:type:radio
//TODO: canvas: CUSTOM CORNERS  https://objectcomputing.com/resources/publications/sett/june-2014-drawing-with-fabricjs
//TODO: sidebar: texticon 하나만 덩그라니 이상함
//TODO: 한글 영어 혼용, 대문자소문자 통일
//TODO: leftsidebarclose에 메뉴늘리고 바로 클릭할수 있도록
//FIXME: canvas가 열릴때 렉걸림

//canvas
import Header from "./component/Header";
// import Editormenu from "./Editormenu";
import Layer from "./component/Layer";
import * as common from "./component/submenu/common"
//TODO: Canvas:이미지 드래그앤 드롭으로 이미지 집어넣기, 복사 붙여넣기로 집어넣기
//TODO: Canvas:객체들고 옮길때 canvas에 중앙선or경계 표시


export default function App(props) {
    const [canvas, setCanvas] = useState(''); //useEffect()후 렌더링 하기 위한 state
    const[image,setImage] = useState(false); //이미지 불러왔을 때 전체 렌더링을 위한 state 
    const imageRef = useRef(false); // 이미지를 불러오면 header에서 setImage()를 통해 렌더링을 시키고, Editor.js에서 imageRef값이 변경 되면 submenu들을 렌더링 함 

    useEffect(() => {  //rendering 후 한 번 실행  
        setCanvas(initCanvas());
    }, []);

    const zoomInfo=useRef();
    useEffect(()=>{
        if (canvas) {
           
            canvas.componentSize = common.initialComponentSize();
            common.setCanvasCenter(canvas);

            fabric.Image.fromURL(backgroundImage,(img)=>{
                img.default = true;
                canvas.setBackgroundImage(img,canvas.renderAll.bind(canvas),{
                });
                canvas.renderAll();
                common.updateStates(canvas);

            })
            
            canvas.on({
                'mouse:down':()=>{
                    console.log("ㅎㅇ")
                    document.getElementById('figure-width').readOnly = true;
                },
                'mouse:wheel': (opt) => {
                     var delta = opt.e.deltaY;
                    if(delta<0){
                        common.zoom(canvas,1.1);
                        let num=Number(zoomInfo.current.value.slice(0,-1));
                        zoomInfo.current.value=(num*1.1).toFixed(0).toString() + "%";
                    }else{
                        common.zoom(canvas,0.9);
                        let num=Number(zoomInfo.current.value.slice(0,-1));
                        zoomInfo.current.value=(num*0.9).toFixed(0).toString() + "%";
                    }
                    common.setCanvasCenter(canvas);
                },
                'selection:updated':()=>{
                    console.log('selection:updated')
                    common.colorActiveLayer(canvas);
                },
                'object:removed': () => {
                    console.log('object:removed');
                },
                'selection:cleared': () => {
                    console.log('selection:cleared');
                    canvas.renderAll();
                    common.colorActiveLayer(canvas);
                    // document.getElementById('remove-object').disabled = true;
                    
                },
                'selection:created': () => {
                    console.log('selection:created');
                    common.colorActiveLayer(canvas);
                    var object = canvas.getActiveObject();
                    // if(object.main) canvas.discardActiveObject(object)
                    // document.getElementById('remove-object').disabled = false;
                },
                'object:added': () => {

                    console.log('object:added');
                    var objects = canvas.getObjects();
                    var object = objects[objects.length-1];
                    if(object.type!=='path'&& object.type!=='selection' && object.type!=='group' && object.cropRect!==true)
                    {
                    canvas.setActiveObject(object);
                    common.addLayer(canvas,object)
                    common.colorActiveLayer(canvas);
                    }

                    // if(object.main) canvas.discardActiveObject(object);
                    // document.getElementById('remove-object').disabled = false;

                },
                'object:modified': () => {
                    console.log('object:modified');
                    var objects  = canvas.getActiveObjects();
                   if (!canvas.getActiveObject().cropRect) {//crop을 위해 생성된 사각형은 modified되어도 undo stack에 쌓이면 안됨
                    common.updateStates(canvas);
                    objects.forEach((object)=>{
                        common.modifyLayer(object);
                    })
                   }
                    // document.getElementById('remove-object').disabled = false
                },
                'object:updated': () => {
                    console.log('object:updated');
                    // document.getElementById('remove-object').disabled = false
                },
                
            });
            
            var flag;
              window.addEventListener("resize", function(opt) { //브라우저 크기 resize에 따른 이벤트 
                common.setCanvasCenter(canvas)
                var innerWidth =common.getInnerSize(canvas)['innerWidth'];
                var innerHeight =common.getInnerSize(canvas)['innerHeight'];
                
                var currentWidth = common.getCanvasStyleWidth();
                var currentHeight = common.getCanvasStyleHeight();

                var ratio = canvas.width/canvas.height;

                if(innerWidth<currentWidth){
                    flag = 'width';
                    common.setCanvasStyleSize(innerWidth,innerWidth*(1/ratio))
                }
                else if(innerHeight<currentHeight){
                    flag  ='height'
                    common.setCanvasStyleSize(innerHeight*ratio,innerHeight)
                }else{
                    if(currentHeight<canvas.height &&flag ==='height' )
                    common.setCanvasStyleSize(innerHeight*ratio,innerHeight)
                    
                    if(currentWidth<canvas.width &&flag ==='width' )
                        common.setCanvasStyleSize(innerWidth,innerWidth*(1/ratio))
                }


        
            });
            
          
            window.onkeydown = function (e) { // delete, backspace 키로 삭제
                console.log("ㅋ")
            //    common.keyDownEvent(canvas,e);
            }
        }
    },[canvas])
   
    const initCanvas = () => {
        
        return (
        new fabric.Canvas('canvas', {
            width: 600,
            height: 400,
            initialWidth: 600,
            initialHeight:400, 
            objectNum : 0,
            undoStack :[],
            redoStack :[],
            // filterValues : '',
            // backgroundColor: 'white',
            componentSize:'',
        })
    )
    }

    //Rightsidebar
    const [Items,setItems]=useState([]);
    const nextId=useRef(1);
    // var nextId =useRef(canvas.objectNum);

    //TODO: 실제로 객체도 지워지도록
    function delItem(id){
        setItems(
        Items=>(Items.filter(Item=>Item.id !== id))
        )
    }

    //TODO: 객체도 되는지 <canvas를 집어넣네?>
    //TODO: 객체를 추가했을 때 레이어도 추가되도록, 선택시 레이어도선택되도록
    //TODO: 누르면 element생성하도록: popup창?
    //TODO: 효과집어넣기 원래layer빈칸 옮길때 layer색바꾸기 등
    //TODO: modal 애니메이션 효과추가

    function addLayerItem(canvas,select){
        //add items
        // console.log("addlayer");
        let newItems=[
        {name:"items"+(canvas.objectNum),//nextId.current
        id:(canvas.objectNum)},//nextId.current
        ...Items
        ];
        setItems(newItems);
        ++canvas.objectNum;//nextId.current+=1;
    }

    const moveItem =(contents, value, oriId)=>{
        const index= contents.findIndex(obj=>obj.id === Number(value));
        let newPos=contents.findIndex(obj=>obj.id === Number(oriId));
        const newContents=[...contents];
        if(newPos<=0){
          newPos = 0;
        }
        newContents.splice(index,1);
        newContents.splice(newPos,0,contents[index]);
        setItems(newContents);
      }

    return (
        <div className={styles.layout}>
            <Title />
            {canvas&& <LeftSidebar 
                        canvas={canvas} image={image} 
                        imageRef={imageRef} addLayerItem={addLayerItem}/>}
            <div  className={styles.center}>
                {canvas && <Header canvas={canvas} image={image} 
                        setImage={setImage} imageRef={imageRef}/>}

                {/* center로 통합 필요 */}
                <div className={styles.mainContainer}>
                    <canvas id="canvas" />
                    <Layer canvas={canvas}></Layer>
                    <div id="layer"></div>
                </div>
                <Footbar canvas={canvas} zoomInfo={zoomInfo}/>{/*투명하게(or 우선순위를 canvas보다 낮게), zoom component, 전체화면키 전환키 */}
            </div>
            <RightSidebar addLayerItem={addLayerItem} 
                    delItem={delItem} 
                    moveItem={moveItem}
                    Items={Items}
                    canvas={canvas}/>            
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
//https://moong-bee.com/posts/react-drag-and-drop-list-sortable