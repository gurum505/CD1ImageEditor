import {
    FontSizeOutlinedIcon, MenuOutlinedIcon, BorderOutlinedIcon
    , AreaChartOutlinedIcon, LineOutlinedIcon
} from "../icons/icons";
import { useEffect } from "react";

export default function LeftSidebarClosed({ toggleMenu, SetCurrentRoute }) {
    //버튼 함수들
    

    return (
        <div style={{ display: "flex", flexDirection: "column", outline: "none" }} >
            <MenuOutlinedIcon onClick={() => {SetCurrentRoute("Menu");toggleMenu();}} style={{ userSelect: "none" }}/>
            <BorderOutlinedIcon onClick={() => { SetCurrentRoute("Rect"); toggleMenu(); }} />
            <FontSizeOutlinedIcon onClick={() => { SetCurrentRoute("Text"); toggleMenu(); }} />
            <LineOutlinedIcon onClick={() => { SetCurrentRoute("Line"); toggleMenu(); }}/>
            <AreaChartOutlinedIcon onClick={() => { SetCurrentRoute("Image"); toggleMenu(); }}/>
        </div>
    );
}