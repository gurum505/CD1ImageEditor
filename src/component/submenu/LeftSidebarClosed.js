import {
    FontSizeOutlinedIcon, MenuOutlinedIcon,AppstoreOutlinedIcon
    , AreaChartOutlinedIcon, LineOutlinedIcon,ScissorOutlinedIcon
} from "../icons/icons";

export default function LeftSidebarClosed(props) {
    const { toggleMenu, SetCurrentRoute,canvas}=props;
    //버튼 함수들

  
    // });

    return (
        <div style={{ display: "flex", flexDirection: "column", outline: "none"}} >
            <MenuOutlinedIcon onClick={() => {SetCurrentRoute("Menu");toggleMenu();}} style={{ userSelect: "none" }}/>
            <AppstoreOutlinedIcon onClick={() => { SetCurrentRoute("Object"); toggleMenu(); }} />
            <FontSizeOutlinedIcon onClick={() => { SetCurrentRoute("Text"); toggleMenu(); }} />
            <LineOutlinedIcon onClick={() => { SetCurrentRoute("Line"); toggleMenu(); }}/>
            <AreaChartOutlinedIcon onClick={() => { SetCurrentRoute("Image"); toggleMenu(); }}/>
            <ScissorOutlinedIcon onClick={() => { SetCurrentRoute("Crop"); toggleMenu(); }}/>
        </div>
    );
}