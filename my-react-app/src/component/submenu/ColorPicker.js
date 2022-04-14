export default function ColorPicker(props){
    const canvas = props.canvas;
    const color = props.color;
    const figure = ['rect','triangle','circle'];

    function close(){

        document.getElementById('color').click();
    }
    function selectColor(e) {
        const selectedColor = e.target.value;
        color.current = selectedColor;
        if (canvas.getActiveObject() && (canvas.getActiveObject().type === 'textbox' || figure.includes(canvas.getActiveObject().type) )) {
                const text = canvas.getActiveObject();
                text.set({ fill: `${selectedColor}` });
        }

        if(canvas.getActiveObject()){
            if(canvas.getActiveObject().type==='line' ||canvas.getActiveObject().type==='path'){
            const path = canvas.getActiveObject();
            path.set({stroke: `${selectedColor}`});
            }
        }

        if(canvas.isDrawingMode){
            canvas.freeDrawingBrush.color =`${selectedColor}`
        }
        canvas.renderAll();
    }
    return (
        <input id="color" type="color" onChange={selectColor} onDoubleClick={close} defaultValue='black'/>
    );
}