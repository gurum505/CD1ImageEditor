import * as common from './common'
export default function ColorPicker(props){
    const canvas = props.canvas;
    const color = props.color;
    const figure = ['rect','triangle','circle'];

   
    function selectColor(e) {
        const selectedColor = e.target.value;
        color.current = selectedColor;
        console.log(canvas.getObjects()[0].type)
        var objects = canvas.getActiveObjects();
        objects.forEach((object)=>{
            console.log(object)
            if (object.type === 'textbox' || figure.includes(object.type)) {
                object.set({ fill: `${selectedColor}` });
        }
     

        if(object){
            if(object.type==='line' ||object.type==='path'){
                object.set({stroke: `${selectedColor}`});
            }
        }

        if(canvas.isDrawingMode){
            canvas.freeDrawingBrush.color = color.current;
        }
        canvas.freeDrawingBrush.color = 'blue';

        common.modifyLayer(object)
        })
      
        canvas.renderAll();

    }
    return (
        <input id="color" type="color" onChange={selectColor}  />
    );
}