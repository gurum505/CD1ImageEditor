import { fabric } from "fabric";
import React, { useState, useEffect, useRef } from "react";

//layout
import styles from './App.module.css';
import Title from './Layout/Title';
import Toolbar from './Layout/Toolbar';
import Center from './Layout/Center';
import Footbar from './Layout/Footbar';
import LeftSidebar from './Layout/LeftSidebar';
//import RightSidebar from './Layout/RightSidebar';

//TODO: togglemenu, isOpen wid 깔끔히 정리 ex){l:50,r:50}
//FIXME: Sidebar:x축이 -200px으로 되어있다. 내용을 쓸때도 left 200px을해야한다.
//TODO: Left내용
//TODO: Canvas: 버튼기능구현 layout으로 분배
//FIXME: Sidebar:canvas크기구현할때 왼쪽 사이드바까지 고려해서 집어넣어야함
//FIXME: Sidebar:사이드 메뉴바를 누르면 캔버스의 도형이 안보임(초기화는 아닌듯)
//FIXME: Sidebar:사이드 메뉴바 최소 최대 크기 설정 가운데 canvas와 오른쪽200px이 확보되어야
//TODO: Sidebar: onClick따로 묶을 수 없나
/*FIXME:Sidebar:칸이 먼저 생기는것 방지=>줄을 안보이게?(tmp), box-border 지금 2개 겹쳐있음*/
/*              박스가 먼저생기는 이유는 밀리는게 아니라 고정된 상태라서? 고정된 상태라서 오른쪽처럼 안말리는건가*/
//TODO: 전체가 계속 다시 렌더링 됨으로써 remove함수나 여러 함수가 동시에 실행된다.막자
//TODO:ESLint사용해 정리해보자 https://velog.io/@velopert/eslint-and-prettier-in-react

//canvas
import Header from "./component/Header";
import Editormenu from "./Editormenu";
import Layer from "./component/Layer";

//FIXME: Canvas: 도형과 텍스트 묶어서 객체 삭제가 안됌 => 곡선안지워지던데 
//TODO: Canvas:이미지 드래그앤 드롭으로 이미지 집어넣기, 복사 붙여넣기로 집어넣기
//TODO: Canvas:객체들고 옮길때 canvas에 중앙선or경계 표시

export default function App(props) {
    function updateModifications(savehistory) {
        if (savehistory === true) {
            var myjson = canvasRef.current.toJSON();
            state.current.push(myjson);
        }
    }

    const [canvas, setCanvas] = useState(""); //useEffect()후 렌더링 하기 위한 state
    const canvasRef = useRef(new fabric.Canvas("canvas", {
        backgroundColor: "white",
        height: 400,
        width: 700,

    }));  //렌더링 되어도 동일 참조값을 유지, 값이 바뀌어도 렌더링하지 않음 

    const state = useRef([]);
    const mods = useRef(0);

    useEffect(() => {  //rendering 후 한 번 실행 
        canvasRef.current = (new fabric.Canvas("canvas", {
            backgroundColor: "white",
            height: 400,
            width: 700,
        }));

        function zoom(event) {
            event.preventDefault();
            scale += event.deltaY * -0.001;
            // Restrict scale
            scale = Math.min(Math.max(.125, scale), 4);
            // Apply scale transform
            el.style.transform = `scale(${scale})`;
        }

        let scale = 1;
        const el = document.querySelector('.wrap');
        el.addEventListener('wheel', zoom);

        document.onkeydown = function (e) { // delete, backspace 키로 삭제
            if (e.key === "Delete") {
                var o = canvasRef.current.getActiveObjects();
                o.forEach((object) => {
                    canvasRef.current.remove(object);
                    document.getElementById(object).remove();
                });
                canvasRef.current.discardActiveObject();
                updateModifications(true);
            }
        }
        setCanvas(canvasRef);
    }, []);


    

    return (
        <div className={styles.layout}>
            <Title />
            <LeftSidebar className={styles.left} canvasRef={canvasRef}/>

            <main className={styles.mainContainer}>
                <Toolbar>
                    <Header canvasRef={canvasRef} canvas={canvas} state={state} mods={mods} />
                </Toolbar>
                <Center>
                    <div className="wrap"><canvas id="canvas" /></div>
                    <Layer canvasRef={canvasRef}></Layer>
                    {/* <Editormenu canvasRef={canvasRef} state={state} /> */}
                    <div id="layer"></div>
                </Center>
                <Footbar>
                    {/*투명하게(or 우선순위를 canvas보다 낮게), zoom component, 전체화면키 전환키 */}
                </Footbar>
            </main>

            {/* <RightSidebar className={styles.right} toggleMenu={toggleMenu} wid={widRight} isOpen={isOpenRight} canvasRef={canvasRef} state={state} canvas={canvas} /> */}
        </div>
    );
}


//출처
//sidebar
//https://ji-u.tistory.com/22
//https://blogpack.tistory.com/1018
//https://blog.naver.com/maestrois/222188488158
//https://dev.to/franciscomendes10866/how-to-create-a-sidebar-in-react-3dh6
//https://velog.io/@pear/CSS-position-property-%EC%A0%95%EB%A6%AC
//layer
//https://d2.naver.com/helloworld/8540176
//https://cocook.tistory.com/137 -이미지 중앙
//https://parra.tistory.com/entry/CSS-transform%EC%9C%BC%EB%A1%9C-zoom-%ED%9A%A8%EA%B3%BC-%EB%82%B4%EA%B8%B0
//https://codesandbox.io/s/wonderful-cerf-69doe?file=/src/App.js:563-672
//icon
//https://ant.design/components/icon/#components-icon-demo-custom