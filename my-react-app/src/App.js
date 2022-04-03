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
//TODO: Canvas: 버튼기능구현 layout으로 분배
//FIXME: Sidebar:canvas크기구현할때 왼쪽 사이드바까지 고려해서 집어넣어야함
//FIXME: Sidebar:사이드 메뉴바를 누르면 캔버스의 도형이 안보임(초기화는 아닌듯) 
//FIXME: Sidebar:사이드 메뉴바 최소 최대 크기 설정 가운데 canvas와 오른쪽200px이 확보되어야
//TODO: Sidebar:Right사이드바 page를 따로 따로 만들어 분배, Left또한 component를 분리 
//TODO: Sidebar: Open시와 close시 분리
//TODO: Sidebar: onClick따로 묶을 수 없나
/*FIXME:Sidebar:칸이 먼저 생기는것 방지=>줄을 안보이게?(tmp), box-border 지금 2개 겹쳐있음*/
/*              박스가 먼저생기는 이유는 밀리는게 아니라 고정된 상태라서? 고정된 상태라서 오른쪽처럼 안말리는건가*/

//canvas
import Header from "./component/Header";
import EditorMenu from "./EditorMenu";

//FIXME: Canvas: 도형과 텍스트 묶어서 객체 삭제가 안됌 => activeobjects로 받아서 for문remove돌리면 됌
//FIXME: Canvas: redo undo 이미지가져오기(header)에 적용안됌
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
                var objects = canvasRef.current.getActiveObjects();
                objects.forEach((object) => {
                    canvasRef.current.remove(object);
                })
                updateModifications(true);
            }
        }
        setCanvas(canvasRef);
    }, []);


    const [wid, setX] = useState({0:50,1:50})
    const [isOpen, setOpen] = useState({0:false,1:false});
    const toggleMenu = (direction) => {
        if (wid[direction] > 50) {
            setX({
            ...wid,
            [direction]:50
            });
            setOpen({
            ...isOpen,
            [direction]:false
            });
        } else {
            setX({
                ...wid,
                [direction]:200
            });
            setOpen({
                ...isOpen,
                [direction]:true
            });
        }
    }

    return (
        <div className={styles.layout}>
            <Title />
            <LeftSidebar wid={wid} toggleMenu={toggleMenu} isOpen={isOpen} className={styles.left} />

            <main className={styles.mainContainer}>
                <Toolbar>
                    <Header canvasRef={canvasRef} canvas={canvas} state={state} mods={mods} />
                </Toolbar>
                <Center>
                    
                    <div className="wrap"><canvas id="canvas" /></div>
                    <EditorMenu canvasRef={canvasRef} state={state} />
                </Center>
                <Footbar>
                    {/*투명하게(or 우선순위를 canvas보다 낮게), zoom component, 전체화면키 전환키 */}
                </Footbar>
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
//icon
//https://ant.design/components/icon/#components-icon-demo-custom
        
