import { fabric } from "fabric";
import React, { useState, useEffect, useRef } from "react";

//layout
import styles from './App.module.css';
import Title from './Layout/Title';
import Toolbar from './Layout/Toolbar';
import Center from './Layout/Center';
import Footbar from './Layout/Footbar';
import LeftSidebar from './Layout/LeftSidebar';
import RightSidebar from './Layout/RightSidebar';

//TODO: togglemenu, isOpen wid 깔끔히 정리 ex){l:50,r:50}
//FIXME: Sidebar:x축이 -200px으로 되어있다. 내용을 쓸때도 left 200px을해야한다.
//TODO: Sidebar-R: 버튼도 조정필요 향후에 따라 결정
//TODO: Left,Right내용 들어갈부분(왼,오른쪽 정렬 등)
//TODO: Canvas: Focus zoom in out 구현 
//TODO: 버튼기능구현 layout으로 분배
//FIXME: canvas크기구현할때 왼쪽 사이드바까지 고려해서 집어넣어야함
//FIXME: 사이드 메뉴바를 누르면 캔버스의 도형이 안보임(초기화는 아닌듯) 


//canvas
import Header from "./component/Header";
import EditorMenu from "./Editormenu";
import Layer from "./component/Layer";



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
                var objects = canvasRef.current.getActiveObjects();
                objects.forEach((object) => {
                    canvasRef.current.remove(object);
                })
                updateModifications(true);
            }

        }

        setCanvas(canvasRef);


    }, []);


    const [wid, setX] = useState([50, 50])
    const [isOpen, setOpen] = useState([false, false]);
    const toggleMenu = (direction) => {
        let newwid = [wid];
        let newisOpen = [isOpen];
        if (wid[direction] > 50) {
            newwid[direction] = 50;
            newisOpen[direction] = true;
            setX(newwid);
            setOpen(newisOpen);
        } else {
            newwid[direction] = 200;
            newisOpen[direction] = false;
            setX(newwid);
            setOpen(newisOpen);
        }
    };

    return (
        <div className={styles.layout}>
            <Title />
            <LeftSidebar wid={wid} toggleMenu={toggleMenu} isOpen={isOpen} className={styles.left} />

            <main className={styles.mainContainer}>
                <Toolbar />
                <Center>
                    <Header canvasRef={canvasRef} canvas={canvas} state={state} mods={mods} />
                    <div className="wrap"><canvas id="canvas" /></div>
                    <EditorMenu canvasRef={canvasRef} state={state} />
                    <Layer canvasRef={canvasRef}></Layer>
                    <div id="layer"></div>
                </Center>
                <Footbar />
            </main>

            <RightSidebar wid={wid} toggleMenu={toggleMenu} isOpen={isOpen} className={styles.right} />
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
