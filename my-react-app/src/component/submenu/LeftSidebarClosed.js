import {
    FontSizeOutlinedIcon, MenuOutlinedIcon, BorderOutlinedIcon
    , AreaChartOutlinedIcon, LineOutlinedIcon
} from "../icons/icons";

import * as common from './common'
import { useEffect } from "react";
export default function LeftSidebarClosed({ toggleMenu, SetCurrentRoute,canvas }) {
    //버튼 함수들

  
    // });

    return (
        <div style={{ display: "flex", flexDirection: "column", outline: "none"}} >
            <MenuOutlinedIcon onClick={() => {SetCurrentRoute("Menu");toggleMenu();}} style={{ userSelect: "none" }}/>
            <BorderOutlinedIcon onClick={() => { SetCurrentRoute("Object"); toggleMenu(); }} />
            <FontSizeOutlinedIcon onClick={() => { SetCurrentRoute("Text"); toggleMenu(); }} />
            <LineOutlinedIcon onClick={() => { SetCurrentRoute("Line"); toggleMenu(); }}/>
            <AreaChartOutlinedIcon onClick={() => { SetCurrentRoute("Image"); toggleMenu(); }}/>
            <button onClick={() => { SetCurrentRoute("Crop"); toggleMenu(); }}>자르기</button>
        </div>
    );
}