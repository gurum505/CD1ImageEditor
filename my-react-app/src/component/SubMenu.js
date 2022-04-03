import FigureSubmenu from './submenu/FigureSubmenu';
import ImageSubmenu from './submenu/ImageSubmenu';
import LineSubmenu from './submenu/LineSubmenu';
import TextboxSubmenu from './submenu/TextboxSubmenu';
import FilterSubmenu from './submenu/FilterSubmenu';
import CropSubmenu from './submenu/CropSubmenu';
import { useRef } from 'react';
export default function Submenu(props) {
    const canvas = props.canvas;
    const buttonType = props.buttonType;
    const id = useRef(0);  
    return (
        <div className="sub-menu">
            {(buttonType === 'figure') && <FigureSubmenu canvas={canvas} state={props.state} id={id}/>}
            {(buttonType === 'image') && <ImageSubmenu canvas={canvas} state={props.state} id={id}/>}
            {(buttonType === 'line') && <LineSubmenu canvas={canvas} state={props.state} id={id}/>}
            {(buttonType === 'textbox') && <TextboxSubmenu canvas={canvas} state={props.state} id={id}/>}
            {(buttonType === 'filter') && <FilterSubmenu canvas={canvas} state={props.state} id={id} />}
            {(buttonType === 'crop') && <CropSubmenu canvas={canvas} state={props.state} id={id}/>}
        </div>
    );
}