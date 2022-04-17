import FigureSubmenu from './submenu/FigureSubmenu';
import ImageSubmenu from './submenu/ImageSubmenu';
import LineSubmenu from './submenu/LineSubmenu';
import TextBoxSubmenu from './submenu/TextBoxSubmenu';
import FilterSubmenu from './submenu/FilterSubmenu';
import CropSubmenu from './submenu/CropSubmenu';

export default function Submenu(props) {
    const buttonType = props.buttonType;

    return (
        <div className="sub-menu">
            {(buttonType === 'figure') && <FigureSubmenu canvas={props.canvas} stateRef={props.stateRef} objectNumRef={props.objectNumRef}/>}
            {(buttonType === 'image') && <ImageSubmenu canvas={props.canvas} stateRef={props.stateRef} objectNumRef={props.objectNumRef}/>}
            {(buttonType === 'line') && <LineSubmenu canvas={props.canvas} stateRef={props.stateRef} objectNumRef={props.objectNumRef}/>}
            {(buttonType === 'textbox') && <TextBoxSubmenu canvas={props.canvas} stateRef={props.stateRef} objectNumRef={props.objectNumRef}/>}
            {(buttonType === 'filter') && <FilterSubmenu canvas={props.canvas} setCanvas={props.setCanvas} stateRef={props.stateRef} objectNumRef={props.objectNumRef} />}
            {(buttonType === 'crop') && <CropSubmenu canvas={props.canvas} setButtonType={props.setButtonType} stateRef={props.stateRef} objectNumRef={props.objectNumRef}/>}
        </div>
    );
}