import styles from './Footbar.module.css'
import * as common from '../component/submenu/common.js'
import {
    ZoomInOutlinedIcon, ZoomOutOutlinedIcon,
    ExpandOutlinedIcon, EyeOutlinedIcon
} from "../component/icons/icons"
import { useRef } from 'react'

const Footbar = (props) => {

    const canvas = props.canvas;
    

    function zoomIn() {
        common.zoom(canvas, 1.1);
        let num=Number(props.zoomInfo.current.value.slice(0,-1));
        props.zoomInfo.current.value=(num*1.1).toFixed(0).toString() + "%";
    }
    function zoomOut() {
        common.zoom(canvas, 0.9);
        let num=Number(props.zoomInfo.current.value.slice(0,-1));
        props.zoomInfo.current.value=(num*0.9).toFixed(0).toString() + "%";
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
        
        var headerEditorHeader = document.getElementById('header');
        var rightSidebarContainer = document.getElementById('rightsidebar');
        var leftSidebarContent = document.getElementById('leftbar-content');
        var leftbar = document.getElementById('leftbar');
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

            // canvas.componentSize['footbar'] += 120;

            if(canvas.width>common.getInnerSize(canvas)['innerWidth'] || canvas.height>common.getInnerSize(canvas)['innerHeight'])
                common.fitToProportion(canvas);


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
        <div id="footer" className={styles.footbar}>
            <div className={styles.contents}>
                <h2 className={styles.title}>
                </h2>

                <ExpandOutlinedIcon onClick={fitToProportion} children={"비율에 맞추기"} />
                <span></span>
                <ZoomOutOutlinedIcon onClick={zoomOut} children={"줌아웃"} />
                <input type="text" ref={props.zoomInfo} defaultValue={'100%'} className={styles.inputdesign} disabled/>
                <ZoomInOutlinedIcon onClick={zoomIn} children={"줌인"} />
                <span></span>
                <EyeOutlinedIcon onClick={preview} children={"미리보기"} />
            </div>
        </div>
    )
}

export default Footbar;
