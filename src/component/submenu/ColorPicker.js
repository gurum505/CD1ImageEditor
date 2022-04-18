import * as common from './common'
export default function ColorPicker(props){
    const canvas = props.canvas;
    var colorRef = props.colorRef;
    const figure = ['rect','triangle','circle'];

    function selectColor(e) {
        const selectedColor = e.target.value;
        colorRef.current = selectedColor;

        var objects = canvas.getActiveObjects();
        objects.forEach((object)=>{
            if (object.type === 'textbox' || figure.includes(object.type)) {
                object.set({ fill: `${selectedColor}` });
        }
     
        if(object){
            if(object.type==='line' ||object.type==='path'){
                object.set({stroke: `${selectedColor}`});
            }
        }

        common.modifyLayer(object)
        })
      
        if(canvas.isDrawingMode){
            canvas.freeDrawingBrush.color = colorRef.current;
        }
        canvas.renderAll();
    }
    
    return (
        <input id="figure-color" type="color"  onChange={selectColor}  />
    );
}