import * as common from './common';
export default function ColorPicker(props){
    const canvas = props.canvas;
<<<<<<< HEAD
    var colorRef = props.colorRef;
=======
    const color=props.color;
>>>>>>> dd3791231c766f1d460c18b49841b2a538664f74
    const figure = ['rect','triangle','circle'];

    function selectColor(e) {
        const selectedColor = e.target.value;
<<<<<<< HEAD
        colorRef.current = selectedColor;
=======
        console.log("selectedColor:",selectedColor);
        color.current = selectedColor;
        console.log("color.current:",color.current);
>>>>>>> dd3791231c766f1d460c18b49841b2a538664f74

        var objects = canvas.getActiveObjects();
        objects.forEach((object)=>{
            if (object.type === 'textbox' || figure.includes(object.type)) {
                object.set({ fill: `${selectedColor}` });
        }
<<<<<<< HEAD
     
=======
>>>>>>> dd3791231c766f1d460c18b49841b2a538664f74
        if(object){
            if(object.type==='line' ||object.type==='path'){
                object.set({stroke: `${selectedColor}`});
            }
        }
<<<<<<< HEAD

=======
>>>>>>> dd3791231c766f1d460c18b49841b2a538664f74
        common.modifyLayer(object)
        })

        if(canvas.isDrawingMode){
            canvas.freeDrawingBrush.color = colorRef.current;
        }
        canvas.renderAll();
    }
<<<<<<< HEAD
    
    return (
        <input id="figure-color" type="color"  onChange={selectColor}  />
=======


    return (
        <input id="color" type="color" defaultValue="#ffffff" onChange={e=>selectColor(e)}  />
>>>>>>> dd3791231c766f1d460c18b49841b2a538664f74
    );
}