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
//FIXME: Sidebar:canvas크기구현할때 왼쪽 사이드바까지 고려해서 집어넣어야함
//TODO: 전체가 계속 다시 렌더링 됨으로써 remove함수나 여러 함수가 동시에 실행된다.막자
//TODO:ESLint사용해 정리해보자 https://velog.io/@velopert/eslint-and-prettier-in-react
//TODO: tooltip 예쁘게 https://css-tricks.com/exploring-what-the-details-and-summary-elements-can-do/

//TODO: Sidebar:스크롤바 안보이게 세로만
//Sidebar:type:radio
//TODO: Sidebar:colorpicker design
//TODO: SIdbar: input text를 다른 box로 고민해보기
//TODO: sidebar: input을change가 아니라 onKeyPress로?
//TODO: canvas: CUSTOM CORNERS  https://objectcomputing.com/resources/publications/sett/june-2014-drawing-with-fabricjs

//canvas
import Header from "./component/Header";
import Editormenu from "./Editormenu";
import Layer from "./component/Layer";

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

    }, []);

        const initCanvas = () => (
            new fabric.Canvas('canvas', {
                height: 400,
                width: 600,
                backgroundColor: 'white'
            })
        )

       
    return (
        <div className={styles.layout}>
            <Title />
            {canvas&& <LeftSidebar canvas={canvas} stateRef={stateRef} objectNumRef={objectNumRef} />}
            <div  className={styles.center}>
                {canvas && <Header canvas={canvas} imageRef={imageRef} image={image}setImage={setImage}stateRef={stateRef} modsRef={modsRef} objectNumRef={objectNumRef} />}

                {/* center로 통합 필요 */}
                <main className={styles.mainContainer}>
                    <canvas id="canvas" />
                    <Layer canvas={canvas}></Layer>
                    {canvas && <Editormenu canvas={canvas} imageRef={imageRef} stateRef={stateRef} objectNumRef={objectNumRef}/>}
                    <div id="layer"></div>
                </main>

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
