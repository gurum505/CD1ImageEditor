import { FontSizeOutlinedIcon ,MenuOutlinedIcon,BorderOutlinedIcon 
    ,AreaChartOutlinedIcon , LineOutlinedIcon  } from "../icons/icons";

export default function LeftSidebarClosed({toggleMenu}){
    //버튼 함수들
    
    return(
        <div style={{display:"flex",flexDirection:"column"}} >
          <MenuOutlinedIcon onClick={()=>toggleMenu()}/>
          <BorderOutlinedIcon  onClick={()=>toggleMenu()}/>
          <FontSizeOutlinedIcon  onClick={()=>toggleMenu()}/>
          <LineOutlinedIcon   onClick={()=>toggleMenu()}/>
          <AreaChartOutlinedIcon   onClick={()=>toggleMenu()}/>
        </div>
    );
}