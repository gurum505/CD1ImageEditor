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
            {(buttonType === 'figure') && <FigureSubmenu canvasRef={props.canvasRef} stateRef={props.stateRef} objectNumRef={props.objectNumRef}/>}
            {(buttonType === 'image') && <ImageSubmenu canvasRef={props.canvasRef} stateRef={props.stateRef} objectNumRef={props.objectNumRef}/>}
            {(buttonType === 'line') && <LineSubmenu canvasRef={props.canvasRef} stateRef={props.stateRef} objectNumRef={props.objectNumRef}/>}
            {(buttonType === 'textbox') && <TextBoxSubmenu canvasRef={props.canvasRef} stateRef={props.stateRef} objectNumRef={props.objectNumRef}/>}
            {(buttonType === 'filter') && <FilterSubmenu canvasRef={props.canvasRef} stateRef={props.stateRef} objectNumRef={props.objectNumRef} />}
            {(buttonType === 'crop') && <CropSubmenu canvasRef={props.canvasRef} setButtonType={props.setButtonType} stateRef={props.stateRef} objectNumRef={props.objectNumRef}/>}
        </div>
    );
}
