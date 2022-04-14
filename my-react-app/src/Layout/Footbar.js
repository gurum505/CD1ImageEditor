import styles from './Footbar.module.css'
import * as common from '../component/submenu/common.js'
import {
    ZoomInOutlinedIcon, ZoomOutOutlinedIcon,
    ExpandOutlinedIcon, EyeOutlinedIcon
} from "../component/icons/icons"

const Footbar = (props) => {

    const canvas = props.canvas;

    function zoomIn() {
        common.zoom(canvas, 1.1);
    }
    function zoomOut() {
        common.zoom(canvas, 0.9);
    }

    function fitToProportion() {
        common.fitToProportion(canvas);
        common.setCanvasCenter(canvas);
    }

    var isPreviewOn = false;
    var isLeftbarOpenend = false;
    if (canvas)
        var recentStyleSize;
    function preview() {
        if (canvas.componentSize['leftbar'] === 200) {
            isLeftbarOpenend = true;
        }
        console.log(isPreviewOn)
        var headerEditorHeader = document.getElementsByClassName('Header_editorHeader__6Q4uw')[0];
        var rightSidebarContainer = document.getElementsByClassName('RightSidebar_container__L2Lbe')[0];
        var leftSidebarContent = document.getElementsByClassName('LeftSidebar_content__G+DQS')[0];
        var leftbar = document.getElementsByClassName('leftbar')[0];
        var displayValue = '';
        if (!isPreviewOn) {
            displayValue = 'none';
            canvas.noHeaderEditor = true;
            isPreviewOn = true;
            canvas.componentSize['leftbar'] = 0;
            canvas.componentSize['rightbar'] = 0;
            canvas.componentSize['editorHeader'] = 0;
            headerEditorHeader.style.display = 'none';
            rightSidebarContainer.style.display = 'none'
            leftSidebarContent.style.display = 'none'
            leftbar.style.display = 'none'
            recentStyleSize = { 'width': common.getCanvasStyleWidth(), 'height': common.getCanvasStyleHeight() }
            common.setCanvasStyleSize(canvas.width, canvas.height)


        } else {
            displayValue = 'flex'
            canvas.noHeaderEditor = false;
            isPreviewOn = false;
            canvas.componentSize['leftbar'] = isLeftbarOpenend ? 200 : 50;
            canvas.componentSize['rightbar'] = 120;
            canvas.componentSize['editorHeader'] = 100;
            headerEditorHeader.style.display = 'flex';
            rightSidebarContainer.style.display = 'block'
            leftSidebarContent.style.display = 'block'
            leftbar.style.display = 'block'
            console.log(recentStyleSize)
            common.setCanvasStyleSize(recentStyleSize['width'], recentStyleSize['height'])

        }

        // headerEditorHeader.style.display =displayValue;
        // rightSidebarContainer.style.display =displayValue;
        // leftSidebarContent.style.display =displayValue;
        // leftbar.style.display =displayValue;


        console.log(common.getInnerSize(canvas)['innerWidth'])
        console.log(common.getInnerSize(canvas)['innerHeight'])
        console.log(window.innerHeight)
        console.log(window.innerWidth)
        common.setCanvasCenter(canvas)

        // var upperCanvas = document.getElementsByClassName('upper-canvas')[0];
        // var lowerCanvas = document.getElementsByClassName('lower-canvas')[0];
        // var innerHeight = window.innerHeight -80;
        // var innerWidth = window.innerWidth;

        // var styleWidth = upperCanvas.style.width.substr(0, upperCanvas.style.width.length-2)
        // var styleHeight = upperCanvas.style.height.substr(0, upperCanvas.style.height.length-2)

        // var left = (innerWidth-styleWidth)/2;
        // var top = (innerHeight-styleHeight)/2-40;

        // // if(top<100) top =100;
        // upperCanvas.style.left = left+'px';
        // upperCanvas.style.top = top+'px';

        // lowerCanvas.style.left = left+'px';
        // lowerCanvas.style.top = top+'px';
        // canvas.setWidth(window.innerWidth);


    }
    return (
        <div className={styles.footbar}>
            <div className={styles.contents}>
                <h2 className={styles.title}>
                </h2>

                <ZoomOutOutlinedIcon onClick={zoomOut} children={"줌아웃"} />
                {/* <input type="text" id='zoom-level' defaultValue={'100%'} style={{width:'50px'}} /> */}
                <ZoomInOutlinedIcon onClick={zoomIn} children={"줌인"} />
                <ExpandOutlinedIcon onClick={fitToProportion} children={"비율에 맞추기"} />
                <EyeOutlinedIcon onClick={preview} children={"미리보기"} />
            </div>
        </div>
    )
}

export default Footbar;
