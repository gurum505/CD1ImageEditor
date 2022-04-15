import {FontSizeOutlined,MenuOutlined,BorderOutlined,AreaChartOutlined, LineOutlined
,SettingOutlined,AlignLeftOutlined,AlignCenterOutlined,AlignRightOutlined,HighlightOutlined 
,BoldOutlined,ItalicOutlined,LineHeightOutlined,GithubOutlined,CloseOutlined,
    FolderOpenOutlined,CloudDownloadOutlined,UploadOutlined,UnderlineOutlined,
    FileImageOutlined,RedoOutlined,UndoOutlined,DownloadOutlined,
    EditOutlined,DragOutlined,ZoomInOutlined,ZoomOutOutlined,
    ExpandOutlined,EyeOutlined,CopyOutlined,DiffOutlined,PlusOutlined,SearchOutlined} from "@ant-design/icons"
import styles from "./icons.module.css"
import { ReactComponent as Triangle} from './TriangleIcon.svg';
import { ReactComponent as Circle} from './CircleIcon.svg';
import { ReactComponent as Rectangle} from './RectangleIcon.svg';
import { ReactComponent as Image} from './ImageIcon.svg';
import { ReactComponent as ImageFromInternet} from './ImageFromInternetIcon.svg';


//https://ant.design/components/icon/#components-icon-demo-custom
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
{/* <UnderlineOutlined />

export const UnderlineOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <UnderlineOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
} */}

export const CloseOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <CloseOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const SearchOutlinedIcon =({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <SearchOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}
export const UnderlineOutlinedIcon =({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <UnderlineOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}



export const PlusOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <PlusOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const DiffOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <DiffOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const CopyOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <CopyOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const ImageFromInternetIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <ImageFromInternet className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptextleft}>{children}</span>
            </label>
        </span>
    )
}

export const ImageIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <Image className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const EditOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <EditOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const DragOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <DragOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const ZoomInOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <ZoomInOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const ZoomOutOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <ZoomOutOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const ExpandOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <ExpandOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const EyeOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <EyeOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const DownloadOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <DownloadOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const FolderOpenOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <FolderOpenOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
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
export const FileImageOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <FileImageOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}
export const RedoOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <RedoOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}
export const UndoOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <UndoOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const GithubOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <GithubOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const LineHeightOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <LineHeightOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const RectangleIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <Rectangle className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const CircleIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <Circle className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const TriangleIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <Triangle className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const MenuOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <MenuOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const FontSizeOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <FontSizeOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const BorderOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <BorderOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const AreaChartOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <AreaChartOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const LineOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <LineOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const SettingOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <SettingOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const AlignLeftOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <AlignLeftOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const AlignCenterOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <AlignCenterOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const AlignRightOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <AlignRightOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const HighlightOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <HighlightOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptextleft}>{children}</span>
            </label>
        </span>
    )
}

export const BoldOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <BoldOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}

export const ItalicOutlinedIcon=({onClick, children, htmlFor})=>{
    return(
        <span className={styles.container}>
            <label htmlFor={htmlFor}>
            <ItalicOutlined className={styles.icon} onClick={onClick}/>
            <span className={styles.tooltiptext}>{children}</span>
            </label>
        </span>
    )
}


export * from "./icons";
