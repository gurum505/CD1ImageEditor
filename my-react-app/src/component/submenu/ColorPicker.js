import * as common from './common'
export default function ColorPicker(props){
    const canvas = props.canvas;
    const color = props.color;
    const figure = ['rect','triangle','circle'];

   
    function selectColor(e) {

        const selectedColor = e.target.value;
        color.current = selectedColor;

        var objects = canvas.getActiveObjects();
        objects.forEach((object)=>{
            console.log(object)
            if (object.type === 'textbox' || figure.includes(object.type)) {
                console.log("바꿨어 ")
                object.set({ fill: `${selectedColor}` });
        }
        // if(figure.includes(object.type)){
        //     object.set({fill:`${selectedColor}`})
        // }

        if(object){
            if(object==='line' ||object.type==='path'){
                object.set({stroke: `${selectedColor}`});
            }
        }

        if(canvas.isDrawingMode){
            canvas.freeDrawingBrush.color =`${selectedColor}`
        }
        common.modifyLayer(object)
        })
      
        canvas.renderAll();

    }
    return (
        <input id="color" type="color" onChange={selectColor}  />
    );
}