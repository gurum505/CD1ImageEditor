import { FontSizeOutlinedIcon ,MenuOutlinedIcon,BorderOutlinedIcon 
    ,AreaChartOutlinedIcon , LineOutlinedIcon  } from "../icons/icons";

export default function LeftSidebarClosed({toggleMenu,SetCurrentRoute }){
    //버튼 함수들

    //TODO: 덕분에 쓸데없는 렌더링 생김
    const InitMenu=()=>{
        SetCurrentRoute("Menu");
    }
    return(
        <div style={{display:"flex",flexDirection:"column"}} >
            {InitMenu()}
          <MenuOutlinedIcon onClick={()=>toggleMenu()}/>
          <BorderOutlinedIcon  onClick={()=>{SetCurrentRoute("Rect"); toggleMenu();}} children={"도형 그리기"}/>
          <FontSizeOutlinedIcon  onClick={()=>{SetCurrentRoute("Text"); toggleMenu();}} children={"텍스트 추가"}/>
          <LineOutlinedIcon   onClick={()=>{SetCurrentRoute("Line"); toggleMenu();}} children={"선 그리기"}/>
          <AreaChartOutlinedIcon   onClick={()=>{SetCurrentRoute("Image"); toggleMenu();}} children={"이미지 추가"}/>
        </div>
    );
}