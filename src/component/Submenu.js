import FigureSubmenu from './submenu/FigureSubmenu';
import ImageSubmenu from './submenu/ImageSubmenu';
import LineSubmenu from './submenu/LineSubmenu';
import TextBoxSubmenu from './submenu/TextBoxSubmenu';
import FilterSubmenu from './submenu/FilterSubmenu';
import CropSubmenu from './submenu/CropSubmenu';

import styles from "./submenu/LeftSidebarOpened.module.css"

export default function Submenu(props) {
    const buttonType = props.buttonType;

    return (
        <div className="sub-menu">
            {(buttonType === 'figure') && <FigureSubmenu canvas={props.canvas} />}
            {(buttonType === 'image') && <ImageSubmenu canvas={props.canvas} />}
            {(buttonType === 'line') && <LineSubmenu canvas={props.canvas} />}
            {(buttonType === 'textbox') && <TextBoxSubmenu canvas={props.canvas}/>}
            {(buttonType === 'filter') && <FilterSubmenu canvas={props.canvas}  />}
            {(buttonType === 'crop') && <CropSubmenu canvas={props.canvas} />}
        </div>
    );
}