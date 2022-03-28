import FigureSubmenu from './submenu/FigureSubmenu';
import ImageSubmenu from './submenu/ImageSubmenu';
import LineSubmenu from './submenu/LineSubmenu';
import TextboxSubmenu from './submenu/TextboxSubmenu';

export default function Submenu(props) {
    console.log('submenu렌더링');

    const canvas = props.canvas;
    const objectType = props.objectType;
    const isAddingTextbox = props.isAddingTextbox;

    

    return (
        <div className="sub-menu">
            {(objectType === 'figure') && <FigureSubmenu canvas={canvas} />}
            {(objectType === 'image') && <ImageSubmenu canvas={canvas} />}
            {(objectType === 'line') && <LineSubmenu canvas={canvas} />}
            {(objectType === 'textbox') && <TextboxSubmenu canvas={canvas} />}
        </div>
    );
}