import { FontSizeOutlinedIcon ,MenuOutlinedIcon,BorderOutlinedIcon 
    ,AreaChartOutlinedIcon , LineOutlinedIcon  } from "../icons/icons";

export default function LeftSidebarClosed({toggleMenu}){
    //버튼 함수들
    
    return(
        <div style={{display:"flex",flexDirection:"column"}} >
          <MenuOutlinedIcon onClick={()=>toggleMenu(0)}/>
          <BorderOutlinedIcon  onClick={()=>toggleMenu(0)}/>
          <FontSizeOutlinedIcon  onClick={()=>toggleMenu(0)}/>
          <LineOutlinedIcon   onClick={()=>toggleMenu(0)}/>
          <AreaChartOutlinedIcon   onClick={()=>toggleMenu(0)}/>
        </div>
    );
}