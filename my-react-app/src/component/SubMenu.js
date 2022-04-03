import FigureSubmenu from './submenu/FigureSubmenu';
import ImageSubmenu from './submenu/ImageSubmenu';
import LineSubmenu from './submenu/LineSubmenu';
import TextboxSubmenu from './submenu/TextBoxSubmenu';
import FilterSubmenu from './submenu/FilterSubmenu';
import CropSubmenu from './submenu/CropSubmenu';
import RotateSubmenu from './submenu/RotateSubmenu';
export default function Submenu(props) {
    const canvas = props.canvas;
    const buttonType = props.buttonType;

    return (
        <div className="sub-menu">
            {(buttonType === 'figure') && <FigureSubmenu canvas={canvas} state={props.state} />}
            {(buttonType === 'image') && <ImageSubmenu canvas={canvas} state={props.state} />}
            {(buttonType === 'line') && <LineSubmenu canvas={canvas} state={props.state} />}
            {(buttonType === 'textbox') && <TextboxSubmenu canvas={canvas} state={props.state}/>}
            {(buttonType === 'filter') && <FilterSubmenu canvas={canvas} state={props.state} />}
            {(buttonType === 'crop') && <CropSubmenu canvas={canvas} state={props.state} />}
            {(buttonType === 'rotate') && <RotateSubmenu canvas={canvas} state={props.state}/>}
        </div>
    );
}