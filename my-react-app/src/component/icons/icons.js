import {FontSizeOutlined,MenuOutlined,BorderOutlined,AreaChartOutlined, LineOutlined
,SettingOutlined,AlignLeftOutlined,AlignCenterOutlined,AlignRightOutlined,HighlightOutlined 
,BoldOutlined,ItalicOutlined,LineHeightOutlined,GithubOutlined,
    FolderOpenOutlined,CloudDownloadOutlined,UploadOutlined,
    FileImageOutlined,RedoOutlined,UndoOutlined,DownloadOutlined,
    EditOutlined,DragOutlined,ZoomInOutlined,ZoomOutOutlined,
    ExpandOutlined,EyeOutlined} from "@ant-design/icons"
import styles from "./icons.module.css"
import { ReactComponent as Triangle} from './TriangleIcon.svg';
import { ReactComponent as Circle} from './CircleIcon.svg';
import { ReactComponent as Rectangle} from './RectangleIcon.svg';
import { ReactComponent as Cursor} from './CursorIcon.svg';
import { ReactComponent as Grab} from './GrabIcon.svg';


//https://icon-icons.com/ko/

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

export const GrabIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <Grab className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}

export const CursorIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <Cursor className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}

export const EditOutlinedIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <EditOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}

export const DragOutlinedIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <DragOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}

export const ZoomInOutlinedIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <ZoomInOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}

export const ZoomOutOutlinedIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <ZoomOutOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}

export const ExpandOutlinedIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <ExpandOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}

export const EyeOutlinedIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <EyeOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}

export const DownloadOutlinedIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <DownloadOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}

export const FolderOpenOutlinedIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <FolderOpenOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}
export const CloudDownloadOutlinedIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <CloudDownloadOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}
export const UploadOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <div className={styles.container}>
            <UploadOutlined className={styles.icon} onClick={onClick} htmlFor={htmlFor}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}
export const FileImageOutlinedIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <FileImageOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}
export const RedoOutlinedIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <RedoOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}
export const UndoOutlinedIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <UndoOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}

export const GithubOutlinedIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <GithubOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}

export const LineHeightOutlinedIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <LineHeightOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}

export const RectangleIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <Rectangle className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}

export const CircleIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <Circle className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}

export const TriangleIcon=({onClick, children})=>{
    return(
        <div className={styles.container}>
            <Triangle className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </div>
    )
}

export const MenuOutlinedIcon=({onClick, children})=>{
    return(
        <>
            <MenuOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
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

export const AlignLeftOutlinedIcon =({onClick})=>{
    return(
        <>
            <AlignLeftOutlined className={styles.icon} onClick={onClick}/>
        </>
    )
}

export const AlignCenterOutlinedIcon =({onClick})=>{
    return(
        <>
            <AlignCenterOutlined className={styles.icon} onClick={onClick}/>
        </>
    )
}

export const AlignRightOutlinedIcon =({onClick})=>{
    return(
        <>
            <AlignRightOutlined className={styles.icon} onClick={onClick}/>
        </>
    )
}

export const HighlightOutlinedIcon =({onClick})=>{
    return(
        <>
            <HighlightOutlined  className={styles.icon} onClick={onClick}/>
        </>
    )
}

export const BoldOutlinedIcon =({onClick})=>{
    return(
        <>
            <BoldOutlined  className={styles.icon} onClick={onClick}/>
        </>
    )
}
export const ItalicOutlinedIcon =({onClick})=>{
    return(
        <>
            <ItalicOutlined className={styles.icon} onClick={onClick}/>
        </>
    )
}

export * from "./icons";
