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
    var isLeftbarOpenend = '';

    if (canvas)
        var recentStyleSize;
    function preview() {
        
        var headerEditorHeader = document.getElementsByClassName('Header_editorHeader__6Q4uw')[0];
        var rightSidebarContainer = document.getElementsByClassName('RightSidebar_container__L2Lbe')[0];
        var leftSidebarContent = document.getElementsByClassName('LeftSidebar_content__G+DQS')[0];
        var leftbar = document.getElementsByClassName('leftbar')[0];
        var displayValue = '';
       
        if (!isPreviewOn) {
            if (canvas.componentSize['leftbar'] === 200) {
                isLeftbarOpenend = true;
            }else{
                isLeftbarOpenend=false;
            }
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
            canvas.componentSize['editorHeader'] = 60;
            headerEditorHeader.style.display = 'flex';
            rightSidebarContainer.style.display = 'block'
            leftSidebarContent.style.display = 'block'
            leftbar.style.display = 'block'
            common.setCanvasStyleSize(recentStyleSize['width'], recentStyleSize['height'])

        }
     
        common.setCanvasCenter(canvas)



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
