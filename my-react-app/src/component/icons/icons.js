import {FontSizeOutlined,MenuOutlined,BorderOutlined,AreaChartOutlined, LineOutlined
,SettingOutlined } from "@ant-design/icons"
import styles from "./icons.module.css"

//곡선(자유그리기)
//<HighlightOutlined /> <FallOutlined />
//정렬 좌
//<AlignLeftOutlined />
//정렬 중앙
//<AlignCenterOutlined />
//정렬 우측
//<AlignRightOutlined />
//색 적용
//<BgColorsOutlined />
//text font size
//<LineHeightOutlined />
//font color
//<FontColorsOutlined />
//width
//<ColumnWidthOutlined />
//height
//<ColumnHeightOutlined />
export const MenuOutlinedIcon=({onClick, children})=>{
    return(
        <>
            <MenuOutlined className={styles.icon} onClick={onClick}/>
            {children}
        </>
    )
}

export const FontSizeOutlinedIcon =({onClick})=>{
    return(
        <>
            <FontSizeOutlined className={styles.icon} onClick={onClick}/>
        </>
    )
}

export const BorderOutlinedIcon =({onClick})=>{
    return(
        <>
            <BorderOutlined className={styles.icon} onClick={onClick}/>
        </>
    )
}

export const AreaChartOutlinedIcon =({onClick})=>{
    return(
        <>
            <AreaChartOutlined className={styles.icon} onClick={onClick}/>
        </>
    )
}

export const LineOutlinedIcon =({onClick})=>{
    return(
        <>
            <LineOutlined className={styles.icon} onClick={onClick}/>
        </>
    )
}

export const SettingOutlinedIcon =({onClick})=>{
    return(
        <>
            <SettingOutlined className={styles.icon} onClick={onClick}/>
        </>
    )
}

export * from "./icons";
