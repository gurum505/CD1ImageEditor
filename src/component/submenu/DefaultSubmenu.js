export default function DefaultMenu(props) {
    
    const canvas = props.canvas;
    
    function resizeCanvasWidth(e){
        canvas.setWidth(e.target.value);
        console.log(e.target.value);
    }
    function resizeCanvasHeight(e){
        canvas.setHeight(e.target.value);
        console.log(e.target.value);
    }
    return (<>
        <div>
            <label>canvas width: </label>
            <input type="text"  onChange = {resizeCanvasWidth} placeholder="600" />
            <br />
            <label>canvas height: </label>
            <input type="text"  onChange={resizeCanvasHeight} placeholder="400" />
        </div>
    </>)
}