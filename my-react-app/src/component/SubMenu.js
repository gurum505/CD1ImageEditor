import FigureSubmenu from './submenu/FigureSubmenu';
import ImageSubmenu from './submenu/ImageSubmenu';
import LineSubmenu from './submenu/LineSubmenu';
import TextboxSubmenu from './submenu/TextboxSubmenu';
import FilterSubmenu from './submenu/FilterSubmenu';
export default function Submenu(props) {
    console.log('submenu렌더링');

    const canvas = props.canvas;
    const buttonType = props.buttonType;
    const isAddingTextbox = props.isAddingTextbox;

    

    return (
        <div className="sub-menu">
            {(buttonType === 'figure') && <FigureSubmenu canvas={canvas} />}
            {(buttonType === 'image') && <ImageSubmenu canvas={canvas} />}
            {(buttonType === 'line') && <LineSubmenu canvas={canvas} />}
            {(buttonType === 'textbox') && <TextboxSubmenu canvas={canvas} />}
            {(buttonType === 'filter') && <FilterSubmenu canvas={canvas} />}
        </div>
    );
}