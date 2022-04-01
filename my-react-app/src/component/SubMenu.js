import FigureSubmenu from './submenu/FigureSubmenu';
import ImageSubmenu from './submenu/ImageSubmenu';
import LineSubmenu from './submenu/LineSubmenu';
import TextboxSubmenu from './submenu/TextBoxSubmenu';
import FilterSubmenu from './submenu/FilterSubmenu';
import CropSubmenu from './submenu/CropSubmenu';

export default function Submenu(props) {
    console.log('submenu렌더링');

    const canvas = props.canvas;
    const buttonType = props.buttonType;


    return (
        <div className="sub-menu">
            {(buttonType === 'figure') && <FigureSubmenu canvas={canvas} state={props.state} mods={props.mods}/>}
            {(buttonType === 'image') && <ImageSubmenu canvas={canvas} state={props.state} mods={props.mods}/>}
            {(buttonType === 'line') && <LineSubmenu canvas={canvas} state={props.state} mods={props.mods}/>}
            {(buttonType === 'textbox') && <TextboxSubmenu canvas={canvas} state={props.state} mods={props.mods}/>}
            {(buttonType === 'filter') && <FilterSubmenu canvas={canvas} state={props.state} mods={props.mods}/>}
            {(buttonType === 'crop') && <CropSubmenu canvas={canvas} state={props.state} mods={props.mods}/>}
        </div>
    );
}