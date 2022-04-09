import {FontSizeOutlined,MenuOutlined,BorderOutlined,AreaChartOutlined, LineOutlined
,SettingOutlined,AlignLeftOutlined,AlignCenterOutlined,AlignRightOutlined,HighlightOutlined 
,BoldOutlined,ItalicOutlined,LineHeightOutlined,GithubOutlined,
    FolderOpenOutlined,CloudDownloadOutlined,UploadOutlined,
    FileImageOutlined,RedoOutlined,UndoOutlined,DownloadOutlined,
    EditOutlined,DragOutlined,ZoomInOutlined,ZoomOutOutlined,
    ExpandOutlined,EyeOutlined,CopyOutlined,DiffOutlined} from "@ant-design/icons"
import styles from "./icons.module.css"
import { ReactComponent as Triangle} from './TriangleIcon.svg';
import { ReactComponent as Circle} from './CircleIcon.svg';
import { ReactComponent as Rectangle} from './RectangleIcon.svg';
import { ReactComponent as Cursor} from './CursorIcon.svg';
import { ReactComponent as Grab} from './GrabIcon.svg';
import { ReactComponent as Image} from './ImageIcon.svg';
import { ReactComponent as ImageFromInternet} from './ImageFromInternetIcon.svg';



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

export const DiffOutlinedIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <DiffOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const CopyOutlinedIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <CopyOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const ImageFromInternetIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <ImageFromInternet className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const ImageIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <Image className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const GrabIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <Grab className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const CursorIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <Cursor className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const EditOutlinedIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <EditOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const DragOutlinedIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <DragOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const ZoomInOutlinedIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <ZoomInOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const ZoomOutOutlinedIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <ZoomOutOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const ExpandOutlinedIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <ExpandOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const EyeOutlinedIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <EyeOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const DownloadOutlinedIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <DownloadOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const FolderOpenOutlinedIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <FolderOpenOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}
export const CloudDownloadOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <CloudDownloadOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}
export const UploadOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <UploadOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}
export const FileImageOutlinedIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <FileImageOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}
export const RedoOutlinedIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <RedoOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}
export const UndoOutlinedIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <UndoOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const GithubOutlinedIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <GithubOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const LineHeightOutlinedIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <LineHeightOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const RectangleIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <Rectangle className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const CircleIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <Circle className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
    )
}

export const TriangleIcon=({onClick, children})=>{
    return(
        <span className={styles.container}>
            <Triangle className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
        </span>
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
